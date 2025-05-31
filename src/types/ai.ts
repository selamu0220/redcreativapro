export type AIProvider = 'gemini' | 'openai' | 'anthropic';
export type GeminiModel = 'gemini-2.0-flash' | 'gemini-pro';

export interface AISettings {
  provider: AIProvider;
  model?: GeminiModel;
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
}