import type { AiComposerProviderId } from "@/types/admin";

/** Ordered provider fallback chain for admin composer assist. */
export const AI_PROVIDER_ORDER: AiComposerProviderId[] = [
  "groq",
  "gemini",
  "openrouter",
  "huggingface",
];

/** Default model chains — see docs/LLM_MODEL_SELECTION.md (verified 2026-08-24). */
export const GROQ_MODEL_CHAIN = [
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
  "qwen/qwen3.6-27b",
] as const;

export const GEMINI_MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
] as const;

export const OPENROUTER_MODEL_CHAIN = [
  "openai/gpt-oss-20b:free",
  "deepseek/deepseek-chat-v3-0324:free",
  "meta-llama/llama-3.3-70b-instruct:free",
] as const;

export const HUGGINGFACE_MODEL_CHAIN = [
  "openai/gpt-oss-20b:fastest",
  "openai/gpt-oss-120b:fastest",
  "Qwen/Qwen2.5-7B-Instruct:fastest",
] as const;

const MODEL_CHAINS: Record<AiComposerProviderId, readonly string[]> = {
  groq: GROQ_MODEL_CHAIN,
  gemini: GEMINI_MODEL_CHAIN,
  openrouter: OPENROUTER_MODEL_CHAIN,
  huggingface: HUGGINGFACE_MODEL_CHAIN,
};

const ENV_MODEL_KEYS: Record<AiComposerProviderId, string> = {
  groq: "GROQ_MODEL",
  gemini: "GEMINI_MODEL",
  openrouter: "OPENROUTER_MODEL",
  huggingface: "HUGGINGFACE_MODEL",
};

const API_KEY_ENV: Record<AiComposerProviderId, string[]> = {
  groq: ["GROQ_API_KEY"],
  gemini: ["GEMINI_API_KEY", "GOOGLE_AI_API_KEY"],
  openrouter: ["OPENROUTER_API_KEY"],
  huggingface: ["HUGGINGFACE_API_KEY"],
};

export function getProviderApiKey(provider: AiComposerProviderId): string | undefined {
  for (const key of API_KEY_ENV[provider]) {
    const value = process.env[key]?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

export function isProviderConfigured(provider: AiComposerProviderId): boolean {
  return Boolean(getProviderApiKey(provider));
}

/** When env override is set, use only that model; otherwise use the default chain. */
export function getModelsForProvider(provider: AiComposerProviderId): string[] {
  const override = process.env[ENV_MODEL_KEYS[provider]]?.trim();
  if (override) {
    return [override];
  }
  return [...MODEL_CHAINS[provider]];
}

/** HTTP statuses that warrant trying the next model or provider. */
export function isRetriableAiError(status?: number): boolean {
  if (status == null) {
    return true;
  }
  if (status === 408 || status === 429) {
    return true;
  }
  return status >= 500 && status <= 504;
}

/** Rate limits usually apply to the whole provider key — skip remaining models. */
export function shouldSkipProviderOnError(status?: number): boolean {
  return status === 429;
}
