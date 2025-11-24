
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

// JSON Data Types for external configuration

/** Localized string - either a plain string or an object with language keys */
export type LocalizedString = string | Record<Language, string>;

/** Template translation for name and description */
export interface TemplateTranslation {
  name: string;
  description: string;
}

/** Template definition in JSON format */
export interface TemplateJSON {
  id: string;
  useCaseId: UseCaseId;
  modelId?: ModelId;
  values: Record<string, LocalizedString>;
  translations: Record<Language, TemplateTranslation>;
}

/** Templates JSON file structure */
export interface TemplatesData {
  templates: TemplateJSON[];
}

/** Single example with request and response */
export interface ExampleItem {
  request: string;
  response: string;
}

/** Examples organized by use case and language */
export type ExamplesData = {
  examples: Record<UseCaseId, Record<Language, ExampleItem[]>>;
};

// Model JSON Types

/** Localized string array */
export type LocalizedStringArray = string[] | Record<Language, string[]>;

/** Model definition in JSON format */
export interface ModelJSON {
  id: string;
  name: string;
  provider: ModelProvider;
  description: LocalizedString;
  strengths: LocalizedStringArray;
}

/** Models JSON file structure */
export interface ModelsData {
  models: ModelJSON[];
}

// Use Case JSON Types

/** Field translation */
export interface FieldTranslation {
  label: string;
}

/** Use case name translation */
export interface UseCaseTranslation {
  name: string;
}

/** Field definition in JSON format */
export interface FieldJSON {
  key: string;
  type: 'text' | 'textarea' | 'select';
  placeholder: string;
  options?: string[];
  hint?: string;
  translations: Record<Language, FieldTranslation>;
}

/** Use case definition in JSON format */
export interface UseCaseJSON {
  id: string;
  icon: string;
  translations: Record<Language, UseCaseTranslation>;
  fields: FieldJSON[];
}

/** Use cases JSON file structure */
export interface UseCasesData {
  useCases: UseCaseJSON[];
}

// Prompt Engine JSON Types

/** Single translation set for prompt structure */
export interface PromptTranslationSet {
  core: string;
  context: string;
  task: string;
  user: string;
  gen: string;
  awaiting: string;
  extra: string;
  divider: string;
  fewShotHeader: string;
  userRequest: string;
  idealResponse: string;
}

/** Context labels for use case assembly */
export interface ContextLabels {
  task: string;
  lang: string;
  frame: string;
  exp: string;
  prob: string;
  topic: string;
  aud: string;
  tone: string;
  req: string;
}

/** Prompt translations JSON file structure */
export interface PromptTranslationsData {
  translations: Record<Language, PromptTranslationSet>;
  instructionFooter: Record<Language, string>;
  contextLabels: Record<Language, ContextLabels>;
  useCaseRequirements: Record<UseCaseId, Record<Language, string[]>>;
}

/** Shared phrases JSON file structure */
export interface SharedPhrasesData {
  phrases: Record<string, Record<Language, string>>;
}

/** Model strategy definition (structured format) */
export interface ModelStrategyStructured {
  header?: string;
  intro?: string;
  lines?: string[];
}

/** Model strategy definition (XML template format) */
export interface ModelStrategyXML {
  format: 'xml';
  template: string;
}

/** Union type for model strategy */
export type ModelStrategyJSON = ModelStrategyStructured | ModelStrategyXML;

/** Model strategies JSON file structure */
export interface ModelStrategiesData {
  strategies: Record<string, ModelStrategyJSON>;
}

/** Unified PromptForge data structure - contains all configuration in a single file */
export interface PromptForgeData {
  models: ModelJSON[];
  useCases: UseCaseJSON[];
  templates: TemplateJSON[];
  phrases: Record<string, Record<Language, string>>;
  modelStrategies: Record<string, ModelStrategyJSON>;
  translations: Record<Language, PromptTranslationSet>;
  instructionFooter: Record<Language, string>;
  contextLabels: Record<Language, ContextLabels>;
  useCaseRequirements: Record<UseCaseId, Record<Language, string[]>>;
  examples: Record<UseCaseId, Record<Language, ExampleItem[]>>;
}