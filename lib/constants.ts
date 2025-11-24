
import {
  ModelConfig,
  UseCaseConfig,
  Language,
  PromptTemplate,
  LocalizedString,
  LocalizedStringArray,
  InputField,
  PromptForgeData
} from '../types';
import promptForgeData from '../data/promptforge-data.json';

// Type assertion for unified data
const DATA = promptForgeData as PromptForgeData;

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

/**
 * Helper to resolve localized strings from JSON data
 */
const resolveLocalizedValue = (value: LocalizedString, lang: Language): string => {
  if (typeof value === 'string') {
    return value;
  }
  return value[lang] || value['en'] || '';
};

/**
 * Loads and transforms templates from JSON data for a specific language
 */
export const getLocalizedTemplates = (lang: Language): PromptTemplate[] => {
  return DATA.templates.map((template): PromptTemplate => {
    const translation = template.translations[lang] || template.translations['en'];

    // Resolve all localized values
    const resolvedValues: Record<string, string> = {};
    for (const [key, value] of Object.entries(template.values)) {
      resolvedValues[key] = resolveLocalizedValue(value as LocalizedString, lang);
    }

    return {
      id: template.id,
      name: translation.name,
      description: translation.description,
      useCaseId: template.useCaseId,
      modelId: template.modelId,
      values: resolvedValues
    };
  });
};

/**
 * Helper to resolve localized string array from JSON data
 */
const resolveLocalizedArray = (value: LocalizedStringArray, lang: Language): string[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return value[lang] || value['en'] || [];
};

/**
 * Loads and transforms models from JSON data for a specific language
 */
export const getLocalizedModels = (lang: Language): ModelConfig[] => {
  return DATA.models.map((model): ModelConfig => ({
    id: model.id as ModelConfig['id'],
    name: model.name,
    provider: model.provider as ModelConfig['provider'],
    description: resolveLocalizedValue(model.description, lang),
    strengths: resolveLocalizedArray(model.strengths, lang)
  }));
};

/**
 * Loads and transforms use cases from JSON data for a specific language
 */
export const getLocalizedUseCases = (lang: Language): UseCaseConfig[] => {
  return DATA.useCases.map((useCase): UseCaseConfig => {
    const translation = useCase.translations[lang] || useCase.translations['en'];

    const fields: InputField[] = useCase.fields.map((field) => {
      const fieldTranslation = field.translations[lang] || field.translations['en'];
      return {
        key: field.key,
        label: fieldTranslation.label,
        placeholder: field.placeholder,
        type: field.type,
        ...(field.options && { options: field.options }),
        ...(field.hint && { hint: field.hint })
      };
    });

    return {
      id: useCase.id as UseCaseConfig['id'],
      name: translation.name,
      icon: useCase.icon,
      fields
    };
  });
};