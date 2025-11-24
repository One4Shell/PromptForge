
import { ModelId, UseCaseId, FormValues, Language } from '../types';

/**
 * Translations for static parts of the prompt structure
 */
const PROMPT_TRANSLATIONS = {
  en: {
    core: 'CORE INSTRUCTIONS',
    context: 'SYSTEM CONTEXT',
    task: 'TASK CONTEXT',
    user: 'USER INPUT',
    gen: 'RESPONSE GENERATION',
    awaiting: 'Awaiting user input...',
    extra: 'Additional constraints:',
    divider: "--------------------------------------------------",
    fewShotHeader: "FEW-SHOT EXAMPLES",
    userRequest: "User Request:",
    idealResponse: "Ideal Response:"
  },
  it: {
    core: 'ISTRUZIONI PRINCIPALI',
    context: 'CONTESTO DI SISTEMA',
    task: 'CONTESTO DEL TASK',
    user: 'INPUT UTENTE',
    gen: 'GENERAZIONE RISPOSTA',
    awaiting: 'In attesa di input utente...',
    extra: 'Vincoli aggiuntivi:',
    divider: "--------------------------------------------------",
    fewShotHeader: "ESEMPI FEW-SHOT",
    userRequest: "Richiesta Utente:",
    idealResponse: "Risposta Ideale:"
  },
  fr: {
    core: 'INSTRUCTIONS PRINCIPALES',
    context: 'CONTEXTE SYSTÈME',
    task: 'CONTEXTE DE LA TÂCHE',
    user: 'ENTRÉE UTILISATEUR',
    gen: 'GÉNÉRATION DE RÉPONSE',
    awaiting: 'En attente de l\'entrée utilisateur...',
    extra: 'Contraintes supplémentaires :',
    divider: "--------------------------------------------------",
    fewShotHeader: "EXEMPLES FEW-SHOT",
    userRequest: "Demande Utilisateur :",
    idealResponse: "Réponse Idéale :"
  },
  de: {
    core: 'KERNANWEISUNGEN',
    context: 'SYSTEMKONTEXT',
    task: 'AUFGABENKONTEXT',
    user: 'BENUTZEREINGABE',
    gen: 'ANTWORTGENERIERUNG',
    awaiting: 'Warte auf Benutzereingabe...',
    extra: 'Zusätzliche Einschränkungen:',
    divider: "--------------------------------------------------",
    fewShotHeader: "FEW-SHOT BEISPIELE",
    userRequest: "Benutzeranfrage:",
    idealResponse: "Ideale Antwort:"
  }
};

/**
 * Shared localized phrases used across multiple models
 */
const SHARED_PHRASES = {
  logic: {
    en: "THINK STEP-BY-STEP: Break down reasoning. Prioritize clarity.",
    it: "PENSA PASSO DOPO PASSO: Scomponi il ragionamento. Dai priorità alla chiarezza.",
    fr: "PENSEZ ÉTAPE PAR ÉTAPE : Décomposez le raisonnement. Priorisez la clarté.",
    de: "SCHRITT FÜR SCHRITT DENKEN: Brechen Sie die Argumentation auf. Priorität auf Klarheit."
  },
  identity: {
    en: "You are an expert AI assistant.",
    it: "Sei un assistente AI esperto.",
    fr: "Vous êtes un assistant IA expert.",
    de: "Sie sind ein erfahrener KI-Assistent."
  }
};

/**
 * Type definition for Model Generation Strategy
 */
type ModelInstructionStrategy = (lang: Language, t: typeof PROMPT_TRANSLATIONS['en']) => string;

/**
 * Strategy Registry: Defines how to generate instructions for each model
 */
const MODEL_STRATEGIES: Record<ModelId, ModelInstructionStrategy> = {
  // --- OPENAI ---
  'gpt-4o': (lang, t) => {
    return `
### ${t.core}
- ${SHARED_PHRASES.identity[lang]}
- ${SHARED_PHRASES.logic[lang]}
- ${lang === 'it' ? 'Non scusarti. Vai dritto al punto.' : 'Do not apologize. Get straight to the value.'}
`;
  },
  'gpt-4.1': (lang, t) => {
    return `
### ${t.core}
You are GPT-4.1.
- Focus on high-fidelity instruction following.
- Minimize verbosity unless requested.
- ${SHARED_PHRASES.logic[lang]}
`;
  },
  'gpt-4.5-orion': (lang, t) => {
    return `
### SYSTEM
You are GPT-4.5 (Orion).
- Leverage your massive world knowledge.
- Cross-reference facts implicitly.
- Provide deep, nuanced answers.
`;
  },
  'gpt-5': (lang, t) => {
    return `
### ${t.core}
You are GPT-5.
- Zero tolerance for hallucinations.
- Perfect adherence to negative constraints.
- ${SHARED_PHRASES.logic[lang]}
`;
  },
  'gpt-5.1': (lang, t) => `### ${t.core}\nYou are GPT-5.1.\n- Be fluid, creative, and extremely fast.`,
  'openai-o3': (lang, t) => {
    return `
### REASONING ENGINE
You are OpenAI o3.
- You excel at complex multi-step reasoning.
- Before answering, perform an internal Chain-of-Thought.
- Output the final answer clearly.
`;
  },
  'openai-o3-mini': (lang, t) => {
    return `
### SYSTEM
You are OpenAI o3-mini.
- Fast, efficient, reasoning-focused.
- Optimize for conciseness without losing depth.
`;
  },

  // --- GOOGLE ---
  'gemini-1.5-pro': (lang, t) => {
    return `
### ${t.context}
You are a highly advanced multimodal model (Gemini 1.5 Pro).
- Use Markdown extensively (tables, bullets).
- Ground responses in provided context.
`;
  },
  'gemini-2.5-pro': (lang, t) => {
    return `
### ${t.context}
You are Gemini 2.5 Pro.
- Native multimodal understanding.
- Fluid reasoning across text and concepts.
`;
  },
  'gemini-3-pro': (lang, t) => {
    return `
### ${t.core}
You are Gemini 3 Pro.
- Use recursive reasoning for complex tasks.
- Integrate broad context window data effectively.
`;
  },
  'gemma-3-27b': (lang, t) => {
    return `
### INSTRUCTION
You are Gemma 3 (27b).
- Be precise and efficient.
- Strictly follow formatting rules.
`;
  },

  // --- ANTHROPIC ---
  'claude-3-opus': (lang, t) => {
    return `
<system_instruction>
  You are Claude 3 Opus.
  <thinking_process>
    Analyze the user request semantically.
  </thinking_process>
  Be helpful and harmless.
</system_instruction>
`;
  },
  'claude-3-5-sonnet': (lang, t) => {
    return `
<system_context>
  You are Claude 3.5 Sonnet.
  - Concise, accurate, and extremely competent in coding.
  <style_guide>
    - Use strict <thinking> tags before answering complex queries.
    - Prefer XML tags for structured output.
  </style_guide>
</system_context>
`;
  },
  'claude-4-opus': (lang, t) => {
    return `
<system_prompt>
  You are Claude 4 Opus.
  - The most capable and nuanced AI model.
  - Exhibit deep empathy and complex reasoning.
  - Use <ant_thinking> tags for internal monologue.
</system_prompt>
`;
  },
  'claude-4-sonnet': (lang, t) => {
    return `
<system_prompt>
  You are Claude 4 Sonnet.
  - The perfect balance of intelligence and speed.
  - Prioritize actionable, dense information.
</system_prompt>
`;
  },

  // --- META ---
  'llama-3-70b': (lang, t) => `### INSTRUCTION\nYou are Llama 3. Be helpful, respectful, and honest.`,
  'llama-3.3-70b': (lang, t) => `### INSTRUCTION\nYou are Llama 3.3. Refined instruction following and math capabilities.`,
  'llama-4-scout': (lang, t) => {
    return `
### AGENT SYSTEM
You are Llama 4 Scout.
- Designed for agentic workflows and tool use.
- Be concise and action-oriented.
`;
  },
  'llama-4-behemoth': (lang, t) => {
    return `
### SYSTEM
You are Llama 4 Behemoth.
- Extremely dense knowledge base.
- Provide comprehensive, exhaustive answers.
`;
  },

  // --- OTHERS ---
  'mistral-large': (lang, t) => `You are Mistral Large. Conciseness is key. Answer directly.`,
  'mistral-medium-3': (lang, t) => `You are Mistral Medium 3. High efficiency, European precision.`,
  
  'grok-1.5': (lang, t) => `### IDENTITY\nYou are Grok. Be witty and slightly rebellious.`,
  'grok-3': (lang, t) => {
    return `
### IDENTITY
You are Grok 3.
- Real-time access to information.
- Unfiltered (within safety limits), direct, and witty.
`;
  },
  'grok-4': (lang, t) => `### SYSTEM\nYou are Grok 4. Massive compute. Super-intelligence.`,

  'qwen-2.5-72b': (lang, t) => `### SYSTEM\nYou are Qwen 2.5. Strong logic and mathematics.`,
  'qwen-3-thinking': (lang, t) => {
    return `
### REASONING
You are Qwen 3 (Thinking).
- Use <thinking>...</thinking> tags to outline your logic before answering.
- Excel at hard sciences and math.
`;
  },

  'deepseek-3.1': (lang, t) => `You are DeepSeek 3.1. Use <thinking> tags for reasoning.`,
  'deepseek-r1': (lang, t) => {
    return `
### CHAIN OF THOUGHT
You are DeepSeek R1.
- You MUST perform deep reasoning before answering.
- Enclose your reasoning process in <reasoning> tags.
- Verify your own assumptions.
`;
  },

  'kimi-k2': (lang, t) => {
    return `
### SYSTEM
You are Kimi K2.
- Long context specialist.
- Use <planning> tags to organize long-form content.
`;
  },
  'nova-pro': (lang, t) => `You are Nova Pro. Reliable, general-purpose assistant.`
};

/**
 * Assembles the user inputs into a structured scenario description in the target language.
 */
const assembleContext = (useCase: UseCaseId, values: FormValues, lang: Language): string => {
  // Mapping labels for the output context
  const labels = {
    en: { task: "Task", lang: "Language", frame: "Framework", exp: "Experience", prob: "Problem", topic: "Topic", aud: "Audience", tone: "Tone", req: "Requirements" },
    it: { task: "Compito", lang: "Linguaggio", frame: "Framework", exp: "Esperienza", prob: "Problema", topic: "Argomento", aud: "Pubblico", tone: "Tono", req: "Requisiti" },
    fr: { task: "Tâche", lang: "Langage", frame: "Framework", exp: "Expérience", prob: "Problème", topic: "Sujet", aud: "Public", tone: "Ton", req: "Exigences" },
    de: { task: "Aufgabe", lang: "Sprache", frame: "Framework", exp: "Erfahrung", prob: "Problem", topic: "Thema", aud: "Publikum", tone: "Ton", req: "Anforderungen" }
  };
  
  const l = labels[lang];

  switch (useCase) {
    case 'coding':
      return `
${l.task}: Software Engineering
${l.lang}: ${values.language || 'N/A'}
${l.frame}: ${values.framework || 'N/A'}
${l.exp}: ${values.level || 'Senior'}
${l.prob}: ${values.problem || 'N/A'}
${l.req}:
- ${lang === 'it' ? 'Scrivi codice pulito e mantenibile.' : 'Write clean, maintainable code.'}
- ${lang === 'it' ? 'Includi commenti per la logica complessa.' : 'Include comments for complex logic.'}
`;
    case 'writing':
      return `
${l.task}: Content Creation
${l.topic}: ${values.topic || 'General'}
${l.aud}: ${values.audience || 'General'}
${l.tone}: ${values.tone || 'Neutral'}
${l.req}:
- ${lang === 'it' ? 'Coinvolgi subito il lettore.' : 'Engage the reader immediately.'}
- ${lang === 'it' ? 'Usa la voce attiva.' : 'Use active voice.'}
`;
    case 'analysis':
      return `
${l.task}: Data Analysis
Data Context: ${values.dataDescription || 'General'}
Objective: ${values.objective || 'Insight'}
${l.req}:
- ${lang === 'it' ? 'Identifica pattern e trend.' : 'Identify patterns and trends.'}
`;
    case 'roleplay':
      return `
${l.task}: Roleplay
Character: ${values.character || 'Assistant'}
Scenario: ${values.scenario || 'Conversation'}
${l.req}:
- ${lang === 'it' ? 'Rimani nel personaggio.' : 'Stay in character.'}
`;
    default:
      return '';
  }
};

/**
 * Returns pre-defined few-shot examples
 */
const getFewShotExamples = (useCase: UseCaseId, lang: Language): string => {
  const t = PROMPT_TRANSLATIONS[lang];
  
  if (useCase === 'coding') {
    return `
### ${t.fewShotHeader}

**${t.userRequest}**
"${lang === 'it' ? 'Crea un hook React per il local storage.' : 'Create a React hook to handle local storage updates.'}"

**${t.idealResponse}**
\`\`\`typescript
import { useState, useEffect } from 'react';
// ... implementation
export default useLocalStorage;
\`\`\`
`;
  }
  
  if (useCase === 'writing') {
     const ex = lang === 'it' 
       ? { req: "Scrivi un tweet sul lancio della nuova tazza eco.", resp: "☕️🌍 L'ATTESA È FINITA! Scopri GreenSip 3000..." }
       : { req: "Write a tweet about the new eco cup.", resp: "☕️🌍 THE WAIT IS OVER! Meet GreenSip 3000..." };

    return `
### ${t.fewShotHeader}

**${t.userRequest}**
"${ex.req}"

**${t.idealResponse}**
"${ex.resp}"
`;
  }

  return '';
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
  const t = PROMPT_TRANSLATIONS[lang];
  
  // Strategy Pattern: Retrieve the specific instruction generator for the selected model
  const strategy = MODEL_STRATEGIES[modelId];
  const modelInstructions = strategy ? strategy(lang, t) : '';

  const context = assembleContext(useCase, values, lang);
  const fewShot = (useCase === 'coding' || useCase === 'writing') ? getFewShotExamples(useCase, lang) : '';

  const instructionFooter = {
    en: 'Please generate the response now, adhering to instructions above.',
    it: 'Genera la risposta seguendo le istruzioni sopra.',
    fr: 'Veuillez générer la réponse maintenant, en respectant les instructions ci-dessus.',
    de: 'Bitte generieren Sie jetzt die Antwort und halten Sie sich an die obigen Anweisungen.'
  };

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
${instructionFooter[lang]}
`;
};
