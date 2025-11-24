
import {
  ModelId,
  UseCaseId,
  FormValues,
  Language,
  ModelStrategyJSON,
  PromptTranslationSet,
  PromptForgeData
} from '../types';

// Import unified JSON configuration
import promptForgeData from '../data/promptforge-data.json';

// Type assertion for unified data
const DATA = promptForgeData as PromptForgeData;

/**
 * Get translations for a specific language
 */
const getTranslations = (lang: Language): PromptTranslationSet => {
  return DATA.translations[lang];
};

/**
 * Get a shared phrase in a specific language
 */
const getPhrase = (phraseKey: string, lang: Language): string => {
  const phrase = DATA.phrases[phraseKey];
  return phrase ? phrase[lang] : '';
};

/**
 * Check if a strategy is XML format
 */
const isXMLStrategy = (strategy: ModelStrategyJSON): strategy is { format: 'xml'; template: string } => {
  return 'format' in strategy && strategy.format === 'xml';
};

/**
 * Replace placeholders in a string with actual values
 */
const replacePlaceholders = (text: string, lang: Language, t: PromptTranslationSet): string => {
  return text
    .replace(/\{\{core\}\}/g, t.core)
    .replace(/\{\{context\}\}/g, t.context)
    .replace(/\{\{task\}\}/g, t.task)
    .replace(/\{\{user\}\}/g, t.user)
    .replace(/\{\{gen\}\}/g, t.gen)
    .replace(/\{\{identity\}\}/g, getPhrase('identity', lang))
    .replace(/\{\{logic\}\}/g, getPhrase('logic', lang))
    .replace(/\{\{noApology\}\}/g, getPhrase('noApology', lang));
};

/**
 * Build model instructions from JSON strategy
 */
const buildModelInstructions = (modelId: ModelId, lang: Language, t: PromptTranslationSet): string => {
  const strategy = DATA.modelStrategies[modelId];

  if (!strategy) {
    return '';
  }

  // Handle XML template format
  if (isXMLStrategy(strategy)) {
    return strategy.template;
  }

  // Handle structured format
  const parts: string[] = [];

  if (strategy.header) {
    parts.push(replacePlaceholders(strategy.header, lang, t));
  }

  if (strategy.intro) {
    parts.push(strategy.intro);
  }

  if (strategy.lines && strategy.lines.length > 0) {
    const processedLines = strategy.lines.map(line => {
      const replaced = replacePlaceholders(line, lang, t);
      return `- ${replaced}`;
    });
    parts.push(processedLines.join('\n'));
  }

  return parts.join('\n');
};

/**
 * Assembles the user inputs into a structured scenario description in the target language.
 */
const assembleContext = (useCase: UseCaseId, values: FormValues, lang: Language): string => {
  const l = DATA.contextLabels[lang];
  const requirements = DATA.useCaseRequirements[useCase]?.[lang] || [];
  const reqList = requirements.map(r => `- ${r}`).join('\n');

  switch (useCase) {
    case 'coding':
      return `
${l.task}: Software Engineering
${l.lang}: ${values.language || 'N/A'}
${l.frame}: ${values.framework || 'N/A'}
${l.exp}: ${values.level || 'Senior'}
${l.prob}: ${values.problem || 'N/A'}
${l.req}:
${reqList}
`;
    case 'writing':
      return `
${l.task}: Content Creation
${l.topic}: ${values.topic || 'General'}
${l.aud}: ${values.audience || 'General'}
${l.tone}: ${values.tone || 'Neutral'}
${l.req}:
${reqList}
`;
    case 'analysis':
      return `
${l.task}: Data Analysis
Data Context: ${values.dataDescription || 'General'}
Objective: ${values.objective || 'Insight'}
${l.req}:
${reqList}
`;
    case 'roleplay':
      return `
${l.task}: Roleplay
Character: ${values.character || 'Assistant'}
Scenario: ${values.scenario || 'Conversation'}
${l.req}:
${reqList}
`;
    default:
      return '';
  }
};

/**
 * Returns few-shot examples loaded from JSON data
 */
const getFewShotExamples = (useCase: UseCaseId, lang: Language): string => {
  const t = getTranslations(lang);

  // Get examples for this use case and language
  const useCaseExamples = DATA.examples[useCase];
  if (!useCaseExamples) return '';

  const examples = useCaseExamples[lang] || useCaseExamples['en'];
  if (!examples || examples.length === 0) return '';

  // Format all examples
  const formattedExamples = examples.map((example) => {
    const isCode = example.response.includes('```');
    const responseFormat = isCode ? example.response : `"${example.response}"`;

    return `**${t.userRequest}**
"${example.request}"

**${t.idealResponse}**
${responseFormat}`;
  }).join('\n\n');

  return `
### ${t.fewShotHeader}

${formattedExamples}
`;
};

/**
 * Main Generator Function
 */
export const generatePrompt = (
  modelId: ModelId,
  useCase: UseCaseId,
  values: FormValues,
  lang: Language
): string => {
  const t = getTranslations(lang);

  // Build model-specific instructions from JSON strategy
  const modelInstructions = buildModelInstructions(modelId, lang, t);

  const context = assembleContext(useCase, values, lang);
  const fewShot = getFewShotExamples(useCase, lang);

  const instructionFooter = DATA.instructionFooter[lang];

  return `${modelInstructions}

${t.divider}

### ${t.task}
${context}
${fewShot ? `\n${t.divider}\n${fewShot}` : ''}

${t.divider}

### ${t.user}
${values.extraInstructions ? `${t.extra} ${values.extraInstructions}` : t.awaiting}

${t.divider}

### ${t.gen}
${instructionFooter}
`;
};

/**
 * Export configuration for external access/modification
 */
export const getPromptConfig = () => ({
  translations: DATA.translations,
  instructionFooter: DATA.instructionFooter,
  contextLabels: DATA.contextLabels,
  useCaseRequirements: DATA.useCaseRequirements
});
export const getSharedPhrases = () => ({ phrases: DATA.phrases });
export const getModelStrategies = () => ({ strategies: DATA.modelStrategies });

/**
 * Export unified data for external access
 */
export const getPromptForgeData = () => DATA;
