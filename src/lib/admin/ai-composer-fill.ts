import type { AiComposerFillPayload, AiComposerFillResponse, AiComposerProviderId } from "@/types/admin";
import type { BroadcastAudience } from "@/types/newsletter";
import {
  AI_PROVIDER_ORDER,
  getModelsForProvider,
  getProviderApiKey,
  isProviderConfigured,
  isRetriableAiError,
  shouldSkipProviderOnError,
} from "@/lib/admin/ai-provider-models";

/** Server-only LLM calls with ordered fallback; parses JSON-shaped reply into broadcast fields. */
const SYSTEM = `You help admins draft MixMaster newsletter posts about cocktails, recipes, and bar culture.
Return ONLY a single JSON object (no markdown fences) with keys:
subject (string), preheader (string), body (string, use \\n for line breaks),
ctaLabel (string, optional), ctaUrl (string, optional, must be https if present),
audience (string: one of "all", "recent", "engaged").
Keep subject under 90 chars, preheader under 120 chars, body concise but useful.`;

class AiProviderError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AiProviderError";
    this.status = status;
  }
}

function extractJsonObject(raw: string): Record<string, unknown> {
  const trimmed = raw.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const text = fence ? fence[1]!.trim() : trimmed;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model did not return a JSON object.");
  }
  return JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>;
}

function normalizeAudience(value: unknown): BroadcastAudience {
  if (value === "recent" || value === "engaged") {
    return value;
  }
  return "all";
}

function toPayload(data: Record<string, unknown>): AiComposerFillPayload {
  const subject = String(data.subject ?? "").trim();
  const preheader = String(data.preheader ?? "").trim();
  const body = String(data.body ?? "").trim().replaceAll("\\n", "\n");
  if (!subject || !preheader || !body) {
    throw new Error("Missing subject, preheader, or body in model output.");
  }
  const ctaLabel = data.ctaLabel != null ? String(data.ctaLabel).trim() : "";
  const ctaUrl = data.ctaUrl != null ? String(data.ctaUrl).trim() : "";
  const audience = normalizeAudience(data.audience);
  return {
    subject,
    preheader,
    body,
    ctaLabel: ctaLabel || undefined,
    ctaUrl: ctaUrl && /^https:\/\//.test(ctaUrl) ? ctaUrl : undefined,
    audience,
  };
}

async function callOpenAiCompatible(
  url: string,
  apiKey: string,
  model: string,
  userPrompt: string,
  extraHeaders?: Record<string, string>,
): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 2048,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!res.ok) {
    throw new AiProviderError(`HTTP ${res.status}`, res.status);
  }
  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = json.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("Empty content");
  }
  return text;
}

async function callGroqModel(model: string, userPrompt: string): Promise<string> {
  const key = getProviderApiKey("groq");
  if (!key) {
    throw new Error("GROQ_API_KEY not set");
  }
  return callOpenAiCompatible(
    "https://api.groq.com/openai/v1/chat/completions",
    key,
    model,
    userPrompt,
  );
}

async function callGeminiModel(model: string, userPrompt: string): Promise<string> {
  const key = getProviderApiKey("gemini");
  if (!key) {
    throw new Error("GEMINI_API_KEY not set");
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${SYSTEM}\n\nUser request:\n${userPrompt}` }] }],
      generationConfig: { temperature: 0.35, maxOutputTokens: 2048 },
    }),
  });
  if (!res.ok) {
    throw new AiProviderError(`HTTP ${res.status}`, res.status);
  }
  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("");
  if (!text) {
    throw new Error("Empty content");
  }
  return text;
}

async function callOpenRouterModel(model: string, userPrompt: string): Promise<string> {
  const key = getProviderApiKey("openrouter");
  if (!key) {
    throw new Error("OPENROUTER_API_KEY not set");
  }
  const site = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return callOpenAiCompatible(
    "https://openrouter.ai/api/v1/chat/completions",
    key,
    model,
    userPrompt,
    {
      "HTTP-Referer": site,
      "X-Title": "MixMaster Admin",
    },
  );
}

async function callHuggingFaceModel(model: string, userPrompt: string): Promise<string> {
  const key = getProviderApiKey("huggingface");
  if (!key) {
    throw new Error("HUGGINGFACE_API_KEY not set");
  }
  return callOpenAiCompatible(
    "https://router.huggingface.co/v1/chat/completions",
    key,
    model,
    userPrompt,
  );
}

async function callProviderModel(
  provider: AiComposerProviderId,
  model: string,
  userPrompt: string,
): Promise<string> {
  switch (provider) {
    case "groq":
      return callGroqModel(model, userPrompt);
    case "gemini":
      return callGeminiModel(model, userPrompt);
    case "openrouter":
      return callOpenRouterModel(model, userPrompt);
    case "huggingface":
      return callHuggingFaceModel(model, userPrompt);
  }
}

export async function generateComposerDraftWithFallback(brief: string): Promise<AiComposerFillResponse> {
  const userPrompt =
    brief.trim() ||
    "Write a friendly weekly newsletter post highlighting one classic cocktail, one seasonal idea, and a short tip for home bartenders.";
  const errors: string[] = [];

  for (const provider of AI_PROVIDER_ORDER) {
    if (!isProviderConfigured(provider)) {
      continue;
    }

    const models = getModelsForProvider(provider);
    let skipProvider = false;

    for (const model of models) {
      try {
        const raw = await callProviderModel(provider, model, userPrompt);
        const parsed = extractJsonObject(raw);
        const payload = toPayload(parsed);
        return { ...payload, providerUsed: provider, modelUsed: model };
      } catch (e) {
        const status = e instanceof AiProviderError ? e.status : undefined;
        const msg = e instanceof Error ? e.message : String(e);
        errors.push(`${provider}/${model}: ${msg}`);

        if (shouldSkipProviderOnError(status)) {
          skipProvider = true;
          break;
        }

        if (!isRetriableAiError(status)) {
          skipProvider = true;
          break;
        }
      }
    }

    if (skipProvider) {
      continue;
    }
  }

  throw new Error(
    `All AI providers failed or are not configured. Details: ${errors.join(" | ")}`,
  );
}
