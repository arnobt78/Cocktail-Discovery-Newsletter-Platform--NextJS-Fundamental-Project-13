import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AI_PROVIDER_ORDER,
  GEMINI_MODEL_CHAIN,
  GROQ_MODEL_CHAIN,
  HUGGINGFACE_MODEL_CHAIN,
  OPENROUTER_MODEL_CHAIN,
  getModelsForProvider,
  isRetriableAiError,
  shouldSkipProviderOnError,
} from "@/lib/admin/ai-provider-models";

describe("ai-provider-models", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("isRetriableAiError", () => {
    it("treats 408, 429, and 5xx as retriable", () => {
      expect(isRetriableAiError(408)).toBe(true);
      expect(isRetriableAiError(429)).toBe(true);
      expect(isRetriableAiError(500)).toBe(true);
      expect(isRetriableAiError(502)).toBe(true);
      expect(isRetriableAiError(504)).toBe(true);
    });

    it("treats 401 and 400 as non-retriable", () => {
      expect(isRetriableAiError(401)).toBe(false);
      expect(isRetriableAiError(400)).toBe(false);
    });

    it("treats missing status as retriable (network/parse errors)", () => {
      expect(isRetriableAiError(undefined)).toBe(true);
    });
  });

  describe("shouldSkipProviderOnError", () => {
    it("skips remaining models on 429 only", () => {
      expect(shouldSkipProviderOnError(429)).toBe(true);
      expect(shouldSkipProviderOnError(500)).toBe(false);
      expect(shouldSkipProviderOnError(401)).toBe(false);
    });
  });

  describe("model chains", () => {
    it("orders providers Groq → Gemini → OpenRouter → Hugging Face", () => {
      expect(AI_PROVIDER_ORDER).toEqual([
        "groq",
        "gemini",
        "openrouter",
        "huggingface",
      ]);
    });

    it("uses current Groq defaults per LLM_MODEL_SELECTION.md", () => {
      expect(GROQ_MODEL_CHAIN).toEqual([
        "openai/gpt-oss-20b",
        "openai/gpt-oss-120b",
        "qwen/qwen3.6-27b",
      ]);
    });

    it("uses Gemini 2.5 flash family", () => {
      expect(GEMINI_MODEL_CHAIN).toEqual([
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
      ]);
    });

    it("uses OpenRouter :free suffix models", () => {
      expect(OPENROUTER_MODEL_CHAIN.every((m) => m.endsWith(":free"))).toBe(true);
      expect(OPENROUTER_MODEL_CHAIN[0]).toBe("openai/gpt-oss-20b:free");
    });

    it("uses Hugging Face :fastest policy suffix", () => {
      expect(HUGGINGFACE_MODEL_CHAIN.every((m) => m.endsWith(":fastest"))).toBe(
        true,
      );
    });
  });

  describe("getModelsForProvider", () => {
    it("returns default chain when env override is unset", () => {
      expect(getModelsForProvider("groq")).toEqual([...GROQ_MODEL_CHAIN]);
    });

    it("returns single model when GROQ_MODEL is set", () => {
      vi.stubEnv("GROQ_MODEL", "openai/gpt-oss-120b");
      expect(getModelsForProvider("groq")).toEqual(["openai/gpt-oss-120b"]);
    });

    it("returns single model when OPENROUTER_MODEL is set", () => {
      vi.stubEnv("OPENROUTER_MODEL", "deepseek/deepseek-chat-v3-0324:free");
      expect(getModelsForProvider("openrouter")).toEqual([
        "deepseek/deepseek-chat-v3-0324:free",
      ]);
    });
  });
});
