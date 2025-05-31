export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'cohere' | 'mistral';

export type GeminiModel = 'gemini-2.0-flash' | 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-pro';
export type OpenAIModel = 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo' | 'gpt-4o' | 'gpt-4o-mini';
export type AnthropicModel = 'claude-3-opus' | 'claude-3-sonnet' | 'claude-3-haiku' | 'claude-3-5-sonnet';
export type CohereModel = 'command-r' | 'command-r-plus' | 'command-light';
export type MistralModel = 'mistral-large' | 'mistral-medium' | 'mistral-small' | 'codestral';

export type AIModel = GeminiModel | OpenAIModel | AnthropicModel | CohereModel | MistralModel;

export interface AISettings {
  provider: AIProvider;
  model?: AIModel;
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  baseUrl?: string; // Para proveedores personalizados
}