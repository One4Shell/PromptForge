
export type ModelId = 
  // OpenAI
  | 'gpt-4o' 
  | 'gpt-4.1'
  | 'gpt-4.5-orion'
  | 'gpt-5' 
  | 'gpt-5.1' 
  | 'openai-o3'
  | 'openai-o3-mini'
  // Google
  | 'gemini-1.5-pro' 
  | 'gemini-2.5-pro'
  | 'gemini-3-pro' 
  | 'gemma-3-27b'
  // Anthropic
  | 'claude-3-opus' 
  | 'claude-3-5-sonnet'
  | 'claude-4-opus'
  | 'claude-4-sonnet'
  // Meta
  | 'llama-3-70b'
  | 'llama-3.3-70b'
  | 'llama-4-scout'
  | 'llama-4-behemoth'
  // Mistral
  | 'mistral-large'
  | 'mistral-medium-3'
  // xAI
  | 'grok-1.5'
  | 'grok-3'
  | 'grok-4'
  // Alibaba / Qwen
  | 'qwen-2.5-72b'
  | 'qwen-3-thinking'
  // DeepSeek
  | 'deepseek-3.1'
  | 'deepseek-r1'
  // Others
  | 'kimi-k2'
  | 'nova-pro';

export type ModelProvider = 'OpenAI' | 'Google' | 'Anthropic' | 'Meta' | 'xAI' | 'Mistral' | 'DeepSeek' | 'Alibaba' | 'Moonshot' | 'Other';

export type UseCaseId = 'coding' | 'writing' | 'analysis' | 'roleplay';
export type Language = 'en' | 'it' | 'fr' | 'de';

export interface ModelConfig {
  id: ModelId;
  name: string;
  provider: ModelProvider;
  description: string;
  strengths: string[];
}

export interface InputField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[]; // For select inputs
  hint?: string;
}

export interface UseCaseConfig {
  id: UseCaseId;
  name: string;
  icon: string;
  fields: InputField[];
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  useCaseId: UseCaseId;
  modelId?: ModelId;
  values: FormValues;
}

export type FormValues = Record<string, string>;