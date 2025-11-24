
import { ModelConfig, UseCaseConfig, Language, PromptTemplate } from '../types';

export const LANGUAGES: { id: Language; name: string; flag: string }[] = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'it', name: 'Italiano', flag: '🇮🇹' },
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
  { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export const UI_TRANSLATIONS: Record<Language, any> = {
  en: {
    subtitle: 'Engineer optimized system prompts for your LLMs',
    localGen: 'Prompt Forge',
    scenario: 'Scenario',
    targetModel: 'Target Model',
    generateBtn: 'Generate Prompt',
    generating: 'Forging...',
    result: 'Result',
    copy: 'Copy',
    copied: 'Copied',
    placeholderTitle: 'Ready to Forge',
    placeholderDesc: 'Configure the settings and generate your optimized prompt.',
    optimizedFor: 'Optimized for',
    targeting: 'Targeting',
    current: 'Current',
    professionalTool: 'PROFESSIONAL TOOL',
    nav: { home: 'Home', app: 'App' },
    templates: 'Templates',
    selectTemplate: 'Select a Template',
    close: 'Close',
    landing: {
      heroTitle: 'Forge the Perfect AI Prompt',
      heroSub: 'Stop struggling with generic outputs. Create highly engineered, model-specific system prompts for GPT-4, Gemini, and Claude in seconds.',
      cta: 'Start Forging Free',
      featuresTitle: 'Why PromptForge?',
      features: [
        { title: 'Model Specific', desc: 'Optimized syntax for the specific cognitive architecture of each major LLM.' },
        { title: 'Privacy First', desc: '100% Client-side. Your data and prompts never leave your browser.' },
        { title: 'Multi-Language', desc: 'Generate prompts in English, Italian, French, and German native formats.' }
      ],
      howTitle: 'How It Works',
      steps: [
        { title: 'Select Scenario', desc: 'Choose from Coding, Writing, Analysis, or Roleplay templates.' },
        { title: 'Choose Model', desc: 'Target specific models like GPT-4o or Gemini 1.5 Pro for maximum adherence.' },
        { title: 'Input Details', desc: 'Fill in our structured fields designed to extract the necessary context.' },
        { title: 'Generate', desc: 'Instantly receive a professional System Prompt ready for copy-pasting.' }
      ],
      faqTitle: 'Frequently Asked Questions',
      faq: [
        { q: 'Is PromptForge free?', a: 'Yes, PromptForge is a completely free, open-source tool running locally in your browser.' },
        { q: 'Do you save my data?', a: 'No. All generation happens via JavaScript on your device. We have no backend server.' },
        { q: 'Why do I need a system prompt?', a: 'System prompts set the behavior, tone, and constraints of an LLM before the conversation begins, ensuring far higher quality outputs.' }
      ]
    }
  },
  it: {
    subtitle: 'Crea prompt di sistema ottimizzati per i tuoi LLM',
    localGen: 'Generazione Locale',
    scenario: 'Scenario',
    targetModel: 'Modello Target',
    generateBtn: 'Genera Prompt',
    generating: 'Forgiatura...',
    result: 'Risultato',
    copy: 'Copia',
    copied: 'Copiato',
    placeholderTitle: 'Pronto a Forgiare',
    placeholderDesc: 'Configura le impostazioni e genera il tuo prompt ottimizzato.',
    optimizedFor: 'Ottimizzato per',
    targeting: 'Target:',
    current: 'Attuale',
    professionalTool: 'STRUMENTO PRO',
    nav: { home: 'Home', app: 'App' },
    templates: 'Template',
    selectTemplate: 'Seleziona un Template',
    close: 'Chiudi',
    landing: {
      heroTitle: 'Forgia il Prompt AI Perfetto',
      heroSub: 'Smetti di lottare con risposte generiche. Crea prompt di sistema ingegnerizzati per GPT-4, Gemini e Claude in pochi secondi.',
      cta: 'Inizia a Forgiare Gratis',
      featuresTitle: 'Perché PromptForge?',
      features: [
        { title: 'Modello Specifico', desc: 'Sintassi ottimizzata per l\'architettura cognitiva specifica di ogni LLM principale.' },
        { title: 'Privacy Prima di Tutto', desc: '100% Lato Client. I tuoi dati e prompt non lasciano mai il tuo browser.' },
        { title: 'Multi-Lingua', desc: 'Genera prompt in formato nativo Inglese, Italiano, Francese e Tedesco.' }
      ],
      howTitle: 'Come Funziona',
      steps: [
        { title: 'Seleziona Scenario', desc: 'Scegli tra template di Coding, Scrittura, Analisi o Roleplay.' },
        { title: 'Scegli Modello', desc: 'Targetizza modelli specifici come GPT-4o o Gemini 1.5 Pro per la massima aderenza.' },
        { title: 'Inserisci Dettagli', desc: 'Compila i nostri campi strutturati progettati per estrarre il contesto necessario.' },
        { title: 'Genera', desc: 'Ricevi istantaneamente un Prompt di Sistema professionale pronto per il copia-incolla.' }
      ],
      faqTitle: 'Domande Frequenti (FAQ)',
      faq: [
        { q: 'PromptForge è gratuito?', a: 'Sì, PromptForge è uno strumento open-source completamente gratuito che gira localmente nel tuo browser.' },
        { q: 'Salvate i miei dati?', a: 'No. Tutta la generazione avviene via JavaScript sul tuo dispositivo. Non abbiamo server backend.' },
        { q: 'Perché serve un system prompt?', a: 'I prompt di sistema impostano il comportamento, il tono e i vincoli di un LLM prima che inizi la conversazione, garantendo output di qualità molto superiore.' }
      ]
    }
  },
  fr: {
    subtitle: 'Ingénierie de prompts optimisés pour vos LLM',
    localGen: 'Génération Locale',
    scenario: 'Scénario',
    targetModel: 'Modèle Cible',
    generateBtn: 'Générer le Prompt',
    generating: 'Forgeage...',
    result: 'Résultat',
    copy: 'Copier',
    copied: 'Copié',
    placeholderTitle: 'Prêt à Forger',
    placeholderDesc: 'Configurez les paramètres et générez votre prompt optimisé.',
    optimizedFor: 'Optimisé pour',
    targeting: 'Cible :',
    current: 'Actuel',
    professionalTool: 'OUTIL PRO',
    nav: { home: 'Accueil', app: 'Outil' },
    templates: 'Modèles',
    selectTemplate: 'Sélectionner un Modèle',
    close: 'Fermer',
    landing: {
      heroTitle: 'Forgez le Prompt IA Parfait',
      heroSub: 'Arrêtez de lutter avec des réponses génériques. Créez des prompts système optimisés pour GPT-4, Gemini et Claude en quelques secondes.',
      cta: 'Commencer Gratuitement',
      featuresTitle: 'Pourquoi PromptForge ?',
      features: [
        { title: 'Spécifique au Modèle', desc: 'Syntaxe optimisée pour l\'architecture cognitive de chaque grand LLM.' },
        { title: 'Confidentialité', desc: '100% Client. Vos données ne quittent jamais votre navigateur.' },
        { title: 'Multi-Langue', desc: 'Générez des prompts en formats natifs Anglais, Italien, Français et Allemand.' }
      ],
      howTitle: 'Comment ça Marche',
      steps: [
        { title: 'Sélectionner le Scénario', desc: 'Choisissez parmi Codage, Rédaction, Analyse ou Jeu de Rôle.' },
        { title: 'Choisir le Modèle', desc: 'Ciblez des modèles comme GPT-4o ou Gemini 1.5 Pro.' },
        { title: 'Saisir les Détails', desc: 'Remplissez nos champs structurés pour extraire le contexte nécessaire.' },
        { title: 'Générer', desc: 'Recevez instantanément un Prompt Système professionnel.' }
      ],
      faqTitle: 'Foire Aux Questions',
      faq: [
        { q: 'PromptForge est-il gratuit ?', a: 'Oui, PromptForge est un outil open-source entièrement gratuit fonctionnant localement.' },
        { q: 'Sauvegardez-vous mes données ?', a: 'Non. Toute la génération se fait via JavaScript sur votre appareil.' },
        { q: 'Pourquoi un prompt système ?', a: 'Les prompts système définissent le comportement et les contraintes d\'un LLM, garantissant une qualité supérieure.' }
      ]
    }
  },
  de: {
    subtitle: 'Erstellen Sie optimierte System-Prompts für Ihre LLMs',
    localGen: 'Lokale Generierung',
    scenario: 'Szenario',
    targetModel: 'Zielmodell',
    generateBtn: 'Prompt Erstellen',
    generating: 'Schmieden...',
    result: 'Ergebnis',
    copy: 'Kopieren',
    copied: 'Kopiert',
    placeholderTitle: 'Bereit zum Schmieden',
    placeholderDesc: 'Konfigurieren Sie die Einstellungen und erstellen Sie Ihren Prompt.',
    optimizedFor: 'Optimiert für',
    targeting: 'Ziel:',
    current: 'Aktuell',
    professionalTool: 'PROFI-TOOL',
    nav: { home: 'Startseite', app: 'App' },
    templates: 'Vorlagen',
    selectTemplate: 'Vorlage Auswählen',
    close: 'Schließen',
    landing: {
      heroTitle: 'Schmieden Sie den perfekten KI-Prompt',
      heroSub: 'Schluss mit generischen Antworten. Erstellen Sie in Sekunden optimierte System-Prompts für GPT-4, Gemini und Claude.',
      cta: 'Kostenlos Starten',
      featuresTitle: 'Warum PromptForge?',
      features: [
        { title: 'Modellspezifisch', desc: 'Optimierte Syntax für die kognitive Architektur jedes großen LLM.' },
        { title: 'Datenschutz', desc: '100% Client-seitig. Ihre Daten verlassen niemals Ihren Browser.' },
        { title: 'Mehrsprachig', desc: 'Generieren Sie Prompts in nativen Formaten für EN, IT, FR und DE.' }
      ],
      howTitle: 'Wie es funktioniert',
      steps: [
        { title: 'Szenario wählen', desc: 'Wählen Sie aus Coding, Schreiben, Analyse oder Rollenspiel.' },
        { title: 'Modell wählen', desc: 'Zielen Sie auf Modelle wie GPT-4o oder Gemini 1.5 Pro.' },
        { title: 'Details eingeben', desc: 'Füllen Sie unsere strukturierten Felder aus.' },
        { title: 'Generieren', desc: 'Erhalten Sie sofort einen professionellen System-Prompt.' }
      ],
      faqTitle: 'Häufig gestellte Fragen',
      faq: [
        { q: 'Ist PromptForge kostenlos?', a: 'Ja, PromptForge ist ein kostenloses Open-Source-Tool, das lokal läuft.' },
        { q: 'Speichern Sie meine Daten?', a: 'Nein. Die Generierung erfolgt vollständig über JavaScript auf Ihrem Gerät.' },
        { q: 'Warum ein System-Prompt?', a: 'System-Prompts legen das Verhalten und die Einschränkungen eines LLM fest und sorgen für höhere Qualität.' }
      ]
    }
  },
};

export const getLocalizedTemplates = (lang: Language): PromptTemplate[] => {
  const templates: Record<Language, PromptTemplate[]> = {
    en: [
      {
        id: 'react-component',
        name: 'React Component',
        description: 'Generates a clean, functional React component with TypeScript props.',
        useCaseId: 'coding',
        modelId: 'claude-3-opus',
        values: {
          language: 'TypeScript',
          framework: 'React',
          level: 'Senior',
          problem: 'Create a reusable Card component that accepts title, image, description, and an optional call-to-action button.',
          extraInstructions: 'Use Tailwind CSS for styling. Ensure accessibility (ARIA).'
        }
      },
      {
        id: 'python-api',
        name: 'Python API Client',
        description: 'Boilerplate for a robust Python API client using requests or httpx.',
        useCaseId: 'coding',
        modelId: 'gpt-4o',
        values: {
          language: 'Python',
          framework: 'Requests',
          level: 'Senior',
          problem: 'Create a base API client class with error handling, retries, and authentication handling.',
          extraInstructions: 'Include type hints and docstrings.'
        }
      },
      {
        id: 'cold-email',
        name: 'Cold Outreach Email',
        description: 'Professional sales email optimized for conversion.',
        useCaseId: 'writing',
        modelId: 'gpt-4o',
        values: {
          topic: 'SaaS Productivity Tool',
          tone: 'Professional but conversational',
          audience: 'CTOs of Mid-sized Tech Companies',
          format: 'Email',
          goal: 'Schedule a 15-minute demo call.',
          extraInstructions: 'Focus on pain points regarding team alignment. Keep it under 150 words.'
        }
      },
      {
        id: 'tech-blog',
        name: 'Technical Blog Post',
        description: 'Deep dive technical article explaining complex concepts.',
        useCaseId: 'writing',
        modelId: 'claude-3-opus',
        values: {
          topic: 'Introduction to Vector Databases',
          tone: 'Educational and Authoritative',
          audience: 'Backend Developers',
          format: 'Blog Post',
          goal: 'Explain how vector embeddings work and their use in AI.',
          extraInstructions: 'Use analogies to explain high-dimensional space.'
        }
      },
      {
        id: 'swot-analysis',
        name: 'SWOT Analysis',
        description: 'Structured analysis of Strengths, Weaknesses, Opportunities, and Threats.',
        useCaseId: 'analysis',
        modelId: 'gemini-1.5-pro',
        values: {
          dataDescription: '[Insert Company Report or Market Data Here]',
          objective: 'Conduct a comprehensive SWOT analysis.',
          format: 'Detailed Report',
          extraInstructions: 'Prioritize actionable insights over generic observations.'
        }
      },
      {
        id: 'interviewer',
        name: 'Tech Interviewer',
        description: 'Simulates a senior engineer conducting a system design interview.',
        useCaseId: 'roleplay',
        modelId: 'gpt-4o',
        values: {
          character: 'Senior Staff Engineer at Google',
          traits: 'Rigorous, fair, focused on scalability and trade-offs',
          setting: 'System Design Interview',
          scenario: 'Design a URL Shortener like bit.ly',
          extraInstructions: 'Ask probing questions about database choice (SQL vs NoSQL) and handling concurrent writes.'
        }
      }
    ],
    it: [
      {
        id: 'react-component',
        name: 'Componente React',
        description: 'Genera un componente React funzionale e pulito con props TypeScript.',
        useCaseId: 'coding',
        modelId: 'claude-3-opus',
        values: {
          language: 'TypeScript',
          framework: 'React',
          level: 'Senior',
          problem: 'Crea un componente Card riutilizzabile che accetta titolo, immagine, descrizione e un pulsante opzionale.',
          extraInstructions: 'Usa Tailwind CSS per lo stile. Assicura accessibilità (ARIA).'
        }
      },
      {
        id: 'cold-email',
        name: 'Email a Freddo',
        description: 'Email di vendita professionale ottimizzata per la conversione.',
        useCaseId: 'writing',
        modelId: 'gpt-4o',
        values: {
          topic: 'Strumento di Produttività SaaS',
          tone: 'Professionale ma colloquiale',
          audience: 'CTO di aziende Tech medie',
          format: 'Email',
          goal: 'Fissare una demo di 15 minuti.',
          extraInstructions: 'Focalizzati sui problemi di allineamento del team. Mantienila sotto le 150 parole.'
        }
      },
      {
        id: 'tech-blog',
        name: 'Articolo Tecnico',
        description: 'Articolo tecnico approfondito per spiegare concetti complessi.',
        useCaseId: 'writing',
        modelId: 'claude-3-opus',
        values: {
          topic: 'Introduzione ai Vector Database',
          tone: 'Educativo e Autorevole',
          audience: 'Sviluppatori Backend',
          format: 'Articolo Blog',
          goal: 'Spiegare come funzionano gli embedding vettoriali e il loro uso nell\'IA.',
          extraInstructions: 'Usa analogie per spiegare lo spazio ad alta dimensionalità.'
        }
      },
      {
        id: 'interviewer',
        name: 'Intervistatore Tech',
        description: 'Simula un ingegnere senior che conduce un colloquio di system design.',
        useCaseId: 'roleplay',
        modelId: 'gpt-4o',
        values: {
          character: 'Senior Staff Engineer presso Google',
          traits: 'Rigoroso, giusto, focalizzato su scalabilità e trade-off',
          setting: 'Colloquio di System Design',
          scenario: 'Progetta uno URL Shortener come bit.ly',
          extraInstructions: 'Fai domande approfondite sulla scelta del database (SQL vs NoSQL) e sulla gestione delle scritture concorrenti.'
        }
      }
    ],
    fr: [
      {
        id: 'react-component',
        name: 'Composant React',
        description: 'Génère un composant React propre et fonctionnel.',
        useCaseId: 'coding',
        modelId: 'claude-3-opus',
        values: {
          language: 'TypeScript',
          framework: 'React',
          level: 'Senior',
          problem: 'Créez un composant Carte réutilisable avec titre, image et description.',
          extraInstructions: 'Utilisez Tailwind CSS.'
        }
      },
      {
        id: 'cold-email',
        name: 'Email de Prospection',
        description: 'Email de vente professionnel optimisé.',
        useCaseId: 'writing',
        modelId: 'gpt-4o',
        values: {
          topic: 'Outil SaaS',
          tone: 'Professionnel',
          audience: 'Décideurs Tech',
          format: 'Email',
          goal: 'Planifier une démo.',
          extraInstructions: 'Court et concis.'
        }
      }
    ],
    de: [
      {
        id: 'react-component',
        name: 'React Komponente',
        description: 'Erstellt eine saubere React-Komponente.',
        useCaseId: 'coding',
        modelId: 'claude-3-opus',
        values: {
          language: 'TypeScript',
          framework: 'React',
          level: 'Senior',
          problem: 'Erstelle eine wiederverwendbare Kartenkomponente.',
          extraInstructions: 'Verwende Tailwind CSS.'
        }
      },
      {
        id: 'cold-email',
        name: 'Kaltakquise E-Mail',
        description: 'Professionelle Verkaufs-E-Mail.',
        useCaseId: 'writing',
        modelId: 'gpt-4o',
        values: {
          topic: 'SaaS Tool',
          tone: 'Professionell',
          audience: 'Geschäftsführer',
          format: 'E-Mail',
          goal: 'Terminvereinbarung.',
          extraInstructions: 'Kurz und prägnant.'
        }
      }
    ]
  };

  return templates[lang] || templates['en'];
};

export const getLocalizedModels = (lang: Language): ModelConfig[] => {
  const common = {
     en: { agi: 'AGI-class Reasoning', code: 'Coding', fast: 'Speed' },
     it: { agi: 'Ragionamento AGI', code: 'Coding', fast: 'Velocità' },
     fr: { agi: 'Raisonnement AGI', code: 'Codage', fast: 'Vitesse' },
     de: { agi: 'AGI-Denken', code: 'Coding', fast: 'Geschwindigkeit' }
  }[lang];

  return [
    // OpenAI
    { id: 'openai-o3', name: 'OpenAI o3', provider: 'OpenAI', description: 'Advanced Chain-of-Thought reasoning model.', strengths: ['Deep Reasoning', 'Math', 'Science'] },
    { id: 'openai-o3-mini', name: 'OpenAI o3-mini', provider: 'OpenAI', description: 'Efficient reasoning model for speed.', strengths: ['Fast CoT', 'Logic', 'Cost-Effective'] },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', description: 'Flagship multimodal model.', strengths: ['Multimodal', 'Balanced', 'Reliable'] },
    { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'OpenAI', description: 'Iterative improvement on GPT-4 architecture.', strengths: ['Adherence', 'Robustness', 'Logic'] },
    { id: 'gpt-4.5-orion', name: 'GPT-4.5 (Orion)', provider: 'OpenAI', description: 'Massive scale world-knowledge model.', strengths: ['Knowledge', 'Nuance', 'Scale'] },
    { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', description: 'Next-gen AGI frontier model.', strengths: [common.agi, 'Zero-Shot', 'Agents'] },
    { id: 'gpt-5.1', name: 'GPT-5.1', provider: 'OpenAI', description: 'Optimized GPT-5 iteration.', strengths: ['Creativity', common.fast, 'Fluidity'] },
    
    // Anthropic
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Exceptional coding and reasoning balance.', strengths: [common.code, 'Reasoning', 'Vision'] },
    { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', provider: 'Anthropic', description: 'Next-gen balanced model.', strengths: ['Efficiency', 'Intelligence', 'Agents'] },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', description: 'Deep nuance and creative writing.', strengths: ['Writing', 'Nuance', 'Context'] },
    { id: 'claude-4-opus', name: 'Claude 4 Opus', provider: 'Anthropic', description: 'Peak performance Anthropic model.', strengths: ['Empathy', 'Complex Tasks', 'Safety'] },

    // Google
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', description: '2M+ context window champion.', strengths: ['Long Context', 'Retrieval', 'Multimodal'] },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', description: 'Enhanced multimodal reasoning.', strengths: ['Native Audio/Video', 'Fluidity', 'Reasoning'] },
    { id: 'gemini-3-pro', name: 'Gemini 3 Pro', provider: 'Google', description: 'Cognitive architecture breakthrough.', strengths: ['Recursive Thinking', 'Memory', 'Planning'] },
    { id: 'gemma-3-27b', name: 'Gemma 3 27b', provider: 'Google', description: 'High-performance open weights.', strengths: ['Efficient', 'Local-Ready', 'Text'] },

    // Meta
    { id: 'llama-3-70b', name: 'Llama 3 70B', provider: 'Meta', description: 'The open-source standard.', strengths: ['Open Source', 'Chat', 'Generalist'] },
    { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta', description: 'Refined post-training.', strengths: ['Math', 'Hard Prompts', 'Instruction'] },
    { id: 'llama-4-scout', name: 'Llama 4 Scout', provider: 'Meta', description: 'Agentic workflow specialist.', strengths: ['Agents', 'Tool Use', 'Speed'] },
    { id: 'llama-4-behemoth', name: 'Llama 4 Behemoth', provider: 'Meta', description: 'Massive dense model.', strengths: ['Knowledge', 'Complexity', 'Exhaustive'] },

    // xAI
    { id: 'grok-3', name: 'Grok 3', provider: 'xAI', description: 'Real-time, witty, unfiltered.', strengths: ['Real-time Data', 'Wit', 'Uncensored'] },
    { id: 'grok-4', name: 'Grok 4', provider: 'xAI', description: 'Compute-heavy super-intelligence.', strengths: ['Raw Power', 'Compute', 'Physics'] },

    // Others
    { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', description: 'Open reasoning model (CoT).', strengths: ['Chain of Thought', 'Math', 'Open'] },
    { id: 'qwen-3-thinking', name: 'Qwen 3 (Thinking)', provider: 'Alibaba', description: '32k Thinking process model.', strengths: ['STEM', 'Hard Logic', 'CoT'] },
    { id: 'qwen-2.5-72b', name: 'Qwen 2.5 72B', provider: 'Alibaba', description: 'Strong generalist.', strengths: ['Math', 'Code', 'Balanced'] },
    { id: 'mistral-medium-3', name: 'Mistral Medium 3', provider: 'Mistral', description: 'European precision & efficiency.', strengths: ['Concise', 'Multi-lingual', 'Smart'] },
    { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', description: 'Top-tier European model.', strengths: ['Reasoning', 'Multi-lingual', 'Code'] },
    { id: 'kimi-k2', name: 'Kimi K2', provider: 'Moonshot', description: 'Long-context reasoning.', strengths: ['Context', 'Planning', 'Chinese/English'] },
    { id: 'nova-pro', name: 'Nova Pro', provider: 'Other', description: 'Reliable generalist.', strengths: ['Balanced', 'Enterprise', 'Safety'] },
    { id: 'grok-1.5', name: 'Grok 1.5', provider: 'xAI', description: 'Capable wity model.', strengths: ['Humor', 'Context', 'Speed'] },
    { id: 'deepseek-3.1', name: 'DeepSeek 3.1', provider: 'DeepSeek', description: 'Strong open model.', strengths: ['Code', 'Math', 'Open'] }
  ];
};

export const getLocalizedUseCases = (lang: Language): UseCaseConfig[] => {
  const t = {
    en: {
      coding: 'Coding Assistant',
      writing: 'Content Writing',
      analysis: 'Data Analysis',
      roleplay: 'Persona / Roleplay',
      fields: {
        lang: 'Programming Language',
        frame: 'Framework / Library',
        level: 'Expertise Level',
        prob: 'Problem Description',
        extra: 'Extra Constraints',
        topic: 'Topic / Subject',
        tone: 'Tone of Voice',
        aud: 'Target Audience',
        fmt: 'Output Format',
        goal: 'Primary Goal',
        data: 'Data Description',
        obj: 'Analysis Objective',
        char: 'Character Name',
        traits: 'Personality Traits',
        set: 'Setting / Context',
        scen: 'Scenario Description'
      }
    },
    it: {
      coding: 'Assistente Coding',
      writing: 'Scrittura Contenuti',
      analysis: 'Analisi Dati',
      roleplay: 'Persona / Roleplay',
      fields: {
        lang: 'Linguaggio di Programmazione',
        frame: 'Framework / Libreria',
        level: 'Livello Esperienza',
        prob: 'Descrizione Problema',
        extra: 'Vincoli Extra',
        topic: 'Argomento',
        tone: 'Tono di Voce',
        aud: 'Pubblico Target',
        fmt: 'Formato Output',
        goal: 'Obiettivo Primario',
        data: 'Descrizione Dati',
        obj: 'Obiettivo Analisi',
        char: 'Nome Personaggio',
        traits: 'Tratti Personalità',
        set: 'Ambientazione / Contesto',
        scen: 'Descrizione Scenario'
      }
    },
    fr: {
      coding: 'Assistant Code',
      writing: 'Rédaction de Contenu',
      analysis: 'Analyse de Données',
      roleplay: 'Jeu de Rôle',
      fields: {
        lang: 'Langage de Programmation',
        frame: 'Framework / Bibliothèque',
        level: 'Niveau d\'Expertise',
        prob: 'Description du Problème',
        extra: 'Contraintes Supplémentaires',
        topic: 'Sujet',
        tone: 'Ton de Voix',
        aud: 'Public Cible',
        fmt: 'Format de Sortie',
        goal: 'Objectif Principal',
        data: 'Description des Données',
        obj: 'Objectif d\'Analyse',
        char: 'Nom du Personnage',
        traits: 'Traits de Personnalité',
        set: 'Cadre / Contexte',
        scen: 'Description du Scénario'
      }
    },
    de: {
      coding: 'Coding-Assistent',
      writing: 'Content-Erstellung',
      analysis: 'Datenanalyse',
      roleplay: 'Rollenspiel',
      fields: {
        lang: 'Programmiersprache',
        frame: 'Framework / Bibliothek',
        level: 'Erfahrungsstufe',
        prob: 'Problembeschreibung',
        extra: 'Zusätzliche Einschränkungen',
        topic: 'Thema',
        tone: 'Tonfall',
        aud: 'Zielgruppe',
        fmt: 'Ausgabeformat',
        goal: 'Hauptziel',
        data: 'Datenbeschreibung',
        obj: 'Analyseziel',
        char: 'Charaktername',
        traits: 'Persönlichkeitsmerkmale',
        set: 'Einstellung / Kontext',
        scen: 'Szenariobeschreibung'
      }
    }
  };

  const selected = t[lang];

  return [
    {
      id: 'coding',
      name: selected.coding,
      icon: 'Terminal',
      fields: [
        { key: 'language', label: selected.fields.lang, placeholder: 'Python, TypeScript...', type: 'text' },
        { key: 'framework', label: selected.fields.frame, placeholder: 'React, Django...', type: 'text' },
        { key: 'level', label: selected.fields.level, placeholder: 'Select...', type: 'select', options: ['Junior', 'Senior', 'Staff', 'Principal'] },
        { key: 'problem', label: selected.fields.prob, placeholder: '...', type: 'textarea' },
        { key: 'extraInstructions', label: selected.fields.extra, placeholder: '...', type: 'textarea', hint: 'Optional' }
      ]
    },
    {
      id: 'writing',
      name: selected.writing,
      icon: 'PenTool',
      fields: [
        { key: 'topic', label: selected.fields.topic, placeholder: '...', type: 'text' },
        { key: 'tone', label: selected.fields.tone, placeholder: 'Professional, Witty...', type: 'text' },
        { key: 'audience', label: selected.fields.aud, placeholder: '...', type: 'text' },
        { key: 'format', label: selected.fields.fmt, placeholder: 'Blog, Tweet...', type: 'text' },
        { key: 'goal', label: selected.fields.goal, placeholder: '...', type: 'text' },
        { key: 'extraInstructions', label: selected.fields.extra, placeholder: '...', type: 'textarea' }
      ]
    },
    {
      id: 'analysis',
      name: selected.analysis,
      icon: 'BarChart',
      fields: [
        { key: 'dataDescription', label: selected.fields.data, placeholder: 'CSV snippet, JSON structure...', type: 'textarea' },
        { key: 'objective', label: selected.fields.obj, placeholder: '...', type: 'text' },
        { key: 'format', label: selected.fields.fmt, placeholder: 'Select...', type: 'select', options: ['Bullet Points', 'Summary', 'Detailed Report', 'SQL'] },
        { key: 'extraInstructions', label: selected.fields.extra, placeholder: '...', type: 'textarea' }
      ]
    },
    {
      id: 'roleplay',
      name: selected.roleplay,
      icon: 'Drama',
      fields: [
        { key: 'character', label: selected.fields.char, placeholder: '...', type: 'text' },
        { key: 'traits', label: selected.fields.traits, placeholder: '...', type: 'text' },
        { key: 'setting', label: selected.fields.set, placeholder: '...', type: 'text' },
        { key: 'scenario', label: selected.fields.scen, placeholder: '...', type: 'textarea' },
        { key: 'extraInstructions', label: selected.fields.extra, placeholder: '...', type: 'textarea' }
      ]
    }
  ];
};