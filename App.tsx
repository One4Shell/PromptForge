
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Icon from './components/Icon';
import LandingPage from './components/LandingPage';
import { LANGUAGES, UI_TRANSLATIONS, getLocalizedModels, getLocalizedUseCases, getLocalizedTemplates } from './lib/constants';
import { generatePrompt } from './lib/promptEngine';
import { ModelId, UseCaseId, FormValues, Language, PromptTemplate, ModelProvider, ModelConfig } from './types';
import { Copy, Check, Sparkles, Hammer, Settings2, ChevronRight, Globe, SlidersHorizontal, PenSquare, Terminal, Menu, Sun, Moon, LayoutTemplate, X, BookOpen, ChevronDown } from 'lucide-react';

type MobileTab = 'config' | 'forge' | 'result';
type Theme = 'light' | 'dark';
type ViewState = 'landing' | 'app';

const App: React.FC = () => {
  // --- STATE INITIALIZATION WITH LOCAL STORAGE ---

  const [currentView, setCurrentView] = useState<ViewState>(() => {
    // Default to landing on first visit per session, or check local storage if you wanted persistence
    return 'landing';
  });

  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem('pf_language') as Language) || 'en'
  );
  
  const [selectedModel, setSelectedModel] = useState<ModelId>(() => 
    (localStorage.getItem('pf_model') as ModelId) || 'gpt-4o'
  );
  
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseId>(() => 
    (localStorage.getItem('pf_useCase') as UseCaseId) || 'coding'
  );
  
  const [formValues, setFormValues] = useState<FormValues>(() => {
    try {
      const saved = localStorage.getItem('pf_formValues');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Theme State with LocalStorage and System Preference fallback
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('pf_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // Mobile specific state
  const [mobileTab, setMobileTab] = useState<MobileTab>('forge');

  // Track first render to avoid clearing form on reload when useCase is set from storage
  const isFirstRender = useRef(true);

  // --- PERSISTENCE EFFECTS ---

  useEffect(() => {
    localStorage.setItem('pf_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('pf_model', selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    localStorage.setItem('pf_useCase', selectedUseCase);
  }, [selectedUseCase]);

  useEffect(() => {
    localStorage.setItem('pf_formValues', JSON.stringify(formValues));
  }, [formValues]);

  // Apply theme class to document and save
  useEffect(() => {
    localStorage.setItem('pf_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Reset form values when use case or language changes, but NOT on initial load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, [language]);

  const handleUseCaseChange = (id: UseCaseId) => {
    setSelectedUseCase(id);
    setFormValues({});
    setGeneratedOutput('');
  }

  // Auto-switch to result tab on mobile when generation finishes
  useEffect(() => {
    if (generatedOutput && !isGenerating) {
      setMobileTab('result');
    }
  }, [generatedOutput, isGenerating]);


  // --- HANDLERS ---

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const prompt = generatePrompt(selectedModel, selectedUseCase, formValues, language);
      setGeneratedOutput(prompt);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = async () => {
    if (!generatedOutput) return;
    try {
      await navigator.clipboard.writeText(generatedOutput);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const applyTemplate = (template: PromptTemplate) => {
    setSelectedUseCase(template.useCaseId);
    setFormValues(template.values);
    if (template.modelId) {
      setSelectedModel(template.modelId);
    }
    setIsTemplateModalOpen(false);
  };

  // --- DERIVED DATA ---
  
  const MODELS = getLocalizedModels(language);
  const USE_CASES = getLocalizedUseCases(language);
  const TEMPLATES = getLocalizedTemplates(language);
  const TEXT = UI_TRANSLATIONS[language];
  const activeUseCaseConfig = USE_CASES.find(u => u.id === selectedUseCase);

  // --- RENDER HELPERS ---

  const renderLanguageSelector = (compact = false) => (
    <div className={`grid ${compact ? 'grid-cols-4' : 'grid-cols-4'} gap-2`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => { setLanguage(lang.id); setFormValues({}); }}
          className={`flex flex-col items-center justify-center rounded-lg border p-2 transition-all ${
            language === lang.id 
            ? 'bg-indigo-50 border-indigo-600 shadow-sm text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-indigo-300' 
            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
          }`}
          title={lang.name}
        >
          <span className="text-xl mb-1">{lang.flag}</span>
          {!compact && <span className="text-[10px] font-bold uppercase">{lang.id}</span>}
        </button>
      ))}
    </div>
  );

  const renderModelList = () => {
    // Group models by provider
    const groupedModels: Record<string, ModelConfig[]> = MODELS.reduce((acc, model) => {
      const p = model.provider || 'Other';
      if (!acc[p]) acc[p] = [];
      acc[p].push(model);
      return acc;
    }, {} as Record<string, ModelConfig[]>);

    return (
      <div className="space-y-4">
        {Object.entries(groupedModels).map(([provider, models]) => {
          // Check if any model in this group is currently selected
          const isGroupActive = models.some(m => m.id === selectedModel);

          return (
            <details key={provider} className="group" open={isGroupActive}>
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 p-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors mb-2 select-none">
                <span className="flex items-center gap-2">
                  {provider}
                  <span className="bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full text-[10px] dark:bg-slate-700 dark:text-slate-400">{models.length}</span>
                </span>
                <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-3 pl-1 pt-1 pb-2">
                {models.map((model) => (
                  <label 
                    key={model.id}
                    className={`relative flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all ${
                      selectedModel === model.id 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-500 dark:ring-indigo-500' 
                        : 'border-slate-200 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-750'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="model" 
                      value={model.id} 
                      checked={selectedModel === model.id} 
                      onChange={() => setSelectedModel(model.id)}
                      className="mt-1 h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-600 shrink-0 dark:border-slate-600 dark:bg-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold ${selectedModel === model.id ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-800 dark:text-slate-200'}`}>
                          {model.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mb-2">{model.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {model.strengths.slice(0, 3).map((strength) => (
                          <span key={strength} className="px-1.5 py-0.5 rounded-[4px] bg-white text-indigo-600 text-[9px] font-bold border border-indigo-100 uppercase tracking-wide dark:bg-slate-900 dark:text-indigo-300 dark:border-slate-700">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    );
  };

  const renderFormFields = (isMobile = false) => (
    <div className={isMobile ? "grid grid-cols-1 gap-5" : "grid grid-cols-1 md:grid-cols-12 gap-6"}>
      {activeUseCaseConfig?.fields.map((field, index) => {
        // Aesthetic Layout Logic:
        // Textareas take full width (12 cols)
        // Inputs take half width (6 cols) unless they are the last odd item in a list of inputs
        const isWide = field.type === 'textarea';
        const colSpan = isWide ? 'md:col-span-12' : 'md:col-span-6';

        return (
          <div key={field.key} className={`group ${colSpan}`}>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex justify-between">
              {field.label}
              {field.hint && <span className="text-[10px] text-slate-300 dark:text-slate-600 font-normal normal-case">{field.hint}</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                rows={isWide && field.key === 'extraInstructions' ? 2 : 4}
                className="block w-full rounded-lg border-slate-200 bg-slate-50 shadow-inner focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all p-4 resize-y dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-600 dark:focus:ring-indigo-500/20"
                placeholder={field.placeholder}
                value={formValues[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <div className="relative">
                <select
                  className="appearance-none block w-full rounded-lg border-slate-200 bg-slate-50 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm p-3 pr-8 transition-all dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:focus:ring-indigo-500/20"
                  value={formValues[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                >
                  <option value="" disabled>Select...</option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            ) : (
              <input
                type="text"
                className="block w-full rounded-lg border-slate-200 bg-slate-50 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all p-3 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-600 dark:focus:ring-indigo-500/20"
                placeholder={field.placeholder}
                value={formValues[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const TemplateModal = () => {
    if (!isTemplateModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-bottom-4 zoom-in-95 duration-200">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="text-indigo-600 dark:text-indigo-400" />
              {TEXT.selectTemplate}
            </h2>
            <button 
              onClick={() => setIsTemplateModalOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEMPLATES.map((template) => {
                const uc = USE_CASES.find(u => u.id === template.useCaseId);
                return (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className="group flex flex-col items-start gap-3 p-5 rounded-xl bg-white border border-slate-200 hover:border-indigo-600 hover:ring-1 hover:ring-indigo-600 shadow-sm hover:shadow-md transition-all text-left dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-500"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon name={uc?.icon || 'LayoutTemplate'} size={20} />
                      </div>
                      {template.modelId && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 uppercase dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                          {template.modelId}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end dark:bg-slate-900 dark:border-slate-800">
             <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
             >
               {TEXT.close}
             </button>
          </div>
        </div>
      </div>
    );
  };

  // --- CONDITIONAL VIEW RENDERING ---

  if (currentView === 'landing') {
    return (
      <div className="flex flex-col min-h-screen">
         <div className="fixed top-0 right-0 p-4 z-50 flex gap-2">
           <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:text-indigo-600 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-300"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={() => setCurrentView('app')}
              className="px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow-sm text-sm font-bold text-indigo-600 hover:bg-slate-50 dark:bg-slate-900/80 dark:border-slate-800 dark:text-indigo-400"
            >
              Open App
            </button>
         </div>
         <LandingPage 
            language={language} 
            onStart={() => setCurrentView('app')}
            onChangeLanguage={setLanguage}
         />
      </div>
    );
  }

  // --- APP VIEW (Desktop + Mobile) ---

  return (
    <>
      <TemplateModal />

      {/* =====================================================================================
          DESKTOP LAYOUT (Hidden on Mobile)
          ===================================================================================== */}
      <div className="hidden md:flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden dark:bg-slate-950 dark:text-slate-100">
        
        {/* SIDEBAR - EXPANDED */}
        <aside className="w-80 flex flex-col border-r border-slate-200 bg-white shadow-lg z-10 dark:bg-slate-900 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/30 dark:border-slate-800 dark:bg-slate-800/50">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentView('landing')}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none">
                <Hammer size={18} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none dark:text-white">PromptForge</h1>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{TEXT.professionalTool}</p>
              </div>
            </div>
            
            {/* Desktop Theme Switcher */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-colors dark:hover:bg-slate-700 dark:hover:text-indigo-400"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-7">
            <section>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Globe size={12} className="text-slate-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Language</h2>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => { setLanguage(lang.id); setFormValues({}); }}
                    className={`flex items-center justify-center rounded-lg p-2 text-xl transition-all border ${
                      language === lang.id 
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm dark:bg-indigo-900/30 dark:border-indigo-500/50' 
                      : 'bg-white border-transparent hover:bg-slate-50 text-slate-500 grayscale hover:grayscale-0 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                    }`}
                    title={lang.name}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Settings2 size={12} />
                {TEXT.scenario}
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {USE_CASES.map((uc) => (
                  <button
                    key={uc.id}
                    onClick={() => handleUseCaseChange(uc.id)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 text-center transition-all ${
                      selectedUseCase === uc.id
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 ring-1 ring-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-500'
                        : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon name={uc.icon} size={20} className={selectedUseCase === uc.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
                    <span className="text-xs font-medium truncate w-full">{uc.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">{TEXT.targetModel}</h2>
              {renderModelList()}
            </section>

            <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-300 dark:text-slate-600 text-center">v1.2 &bull; {TEXT.localGen}</p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA (Desktop) */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50/50 dark:bg-slate-950 transition-colors">
          <Header 
             currentView={currentView} 
             onNavigate={setCurrentView} 
             language={language}
          />

          <div className="flex-1 overflow-y-auto p-10 scroll-smooth custom-scrollbar">
            <div className="mx-auto max-w-6xl space-y-6">
              
              <div className="flex flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                      <Icon name={activeUseCaseConfig?.icon || 'Sparkles'} size={24} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    {activeUseCaseConfig?.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 ml-1">
                    {TEXT.targeting} <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full text-xs border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">{MODELS.find(m => m.id === selectedModel)?.name}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                  >
                    <LayoutTemplate size={16} />
                    {TEXT.templates}
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-500">
                    <Globe size={12} />
                    <span>{LANGUAGES.find(l => l.id === language)?.name}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
                {renderFormFields(false)}

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 dark:shadow-none dark:hover:bg-indigo-500"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {TEXT.generating}
                      </span>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        {TEXT.generateBtn}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {generatedOutput && (
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">
                  <div className="rounded-xl border border-indigo-100 bg-white shadow-xl shadow-slate-200/50 overflow-hidden dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
                    <div className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 px-6 py-4 flex items-center justify-between dark:bg-slate-800/50 dark:border-slate-700">
                      <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wide dark:text-slate-200">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        {TEXT.result}
                      </h3>
                      <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                          isCopied 
                            ? 'bg-green-600 text-white shadow-lg shadow-green-200 ring-0 dark:shadow-none' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white'
                        }`}
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        {isCopied ? TEXT.copied : TEXT.copy}
                      </button>
                    </div>

                    <div className="bg-[#1e1e1e] p-0 overflow-x-auto">
                      <pre className="p-6 font-mono text-sm leading-relaxed text-indigo-50 whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto custom-scrollbar selection:bg-indigo-500/30">
                        {generatedOutput}
                      </pre>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================================================
          MOBILE LAYOUT (Native Android Style)
          ===================================================================================== */}
      <div className="md:hidden h-screen bg-slate-100 font-sans text-slate-900 flex flex-col dark:bg-slate-950 dark:text-slate-100 transition-colors">
        
        {/* Sticky Android Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:bg-slate-900/95 dark:border-slate-800">
          <div className="flex items-center gap-2" onClick={() => setCurrentView('landing')}>
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <Hammer size={18} />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight dark:text-white">PromptForge</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile Theme Switcher */}
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
             <div className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                {language.toUpperCase()}
             </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-100 pb-24 scroll-smooth dark:bg-slate-950">
          
          {/* TAB 1: CONFIG */}
          {mobileTab === 'config' && (
            <div className="p-4 space-y-6 animate-in slide-in-from-right-4 duration-300">
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 ml-1 dark:text-slate-400">Language</h2>
                {renderLanguageSelector()}
              </section>

              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 ml-1 dark:text-slate-400">{TEXT.scenario}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {USE_CASES.map((uc) => (
                    <button
                      key={uc.id}
                      onClick={() => handleUseCaseChange(uc.id)}
                      className={`flex flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center transition-all ${
                        selectedUseCase === uc.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-500'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon name={uc.icon} size={32} className={selectedUseCase === uc.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
                      <span className="text-xs font-bold">{uc.name}</span>
                    </button>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 ml-1 dark:text-slate-400">Target Model</h2>
                {renderModelList()}
              </section>

              <div className="p-4 rounded-xl bg-slate-200/50 text-center text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-500">
                PromptForge v1.2 Mobile
              </div>
            </div>
          )}

          {/* TAB 2: FORGE (Main Input) */}
          {mobileTab === 'forge' && (
            <div className="animate-in slide-in-from-left-4 duration-300 pt-4">
              
              {/* Use case selection moved to config tab */}

              <div className="px-4 pb-4 space-y-4">
                
                <button
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                  >
                  <LayoutTemplate size={18} />
                  {TEXT.templates}
                </button>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5 dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2 dark:border-slate-800">
                     <h3 className="font-bold text-slate-800 flex items-center gap-2 dark:text-white">
                       <Icon name={activeUseCaseConfig?.icon || 'Sparkles'} size={18} className="text-indigo-600 dark:text-indigo-400" />
                       {activeUseCaseConfig?.name}
                     </h3>
                     <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
                        {MODELS.find(m => m.id === selectedModel)?.name}
                     </span>
                  </div>
                  {renderFormFields(true)}
                </div>

                {/* Main Action Button (Like a FAB but wide) */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed dark:shadow-none dark:hover:bg-indigo-500"
                >
                   {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Forging...
                      </span>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        GENERATE
                      </>
                    )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: RESULT */}
          {mobileTab === 'result' && (
            <div className="p-4 h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
              {generatedOutput ? (
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col dark:bg-slate-900 dark:border-slate-800">
                  <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between dark:bg-slate-800 dark:border-slate-700">
                     <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Output</span>
                     <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all ${
                          isCopied 
                            ? 'bg-green-600 text-white' 
                            : 'bg-white text-indigo-600 border border-indigo-200 dark:bg-slate-700 dark:text-indigo-300 dark:border-indigo-900'
                        }`}
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        {isCopied ? 'Copied' : 'Copy'}
                      </button>
                  </div>
                  <pre className="flex-1 p-4 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap break-words overflow-y-auto bg-slate-50/50 inner-shadow dark:bg-[#1e1e1e] dark:text-slate-300">
                    {generatedOutput}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-600">
                  <Terminal size={48} className="mb-4 opacity-20" />
                  <p>No output generated yet.</p>
                  <button onClick={() => setMobileTab('forge')} className="mt-4 text-indigo-600 font-bold text-sm dark:text-indigo-400">
                    Go to Forge
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Fixed Bottom Navigation (Material Style) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around pb-safe pt-2 h-[72px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
          <button 
            onClick={() => setMobileTab('config')}
            className={`flex flex-col items-center gap-1 w-full h-full justify-center transition-colors ${mobileTab === 'config' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
          >
            <div className={`px-5 py-1 rounded-full transition-all ${mobileTab === 'config' ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>
              <SlidersHorizontal size={20} strokeWidth={mobileTab === 'config' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">Config</span>
          </button>
          
          <button 
            onClick={() => setMobileTab('forge')}
            className={`flex flex-col items-center gap-1 w-full h-full justify-center transition-colors ${mobileTab === 'forge' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
          >
             <div className={`px-5 py-1 rounded-full transition-all ${mobileTab === 'forge' ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>
               <PenSquare size={20} strokeWidth={mobileTab === 'forge' ? 2.5 : 2} />
             </div>
            <span className="text-[10px] font-medium">Forge</span>
          </button>
          
          <button 
            onClick={() => setMobileTab('result')}
            className={`flex flex-col items-center gap-1 w-full h-full justify-center transition-colors ${mobileTab === 'result' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
          >
             <div className={`px-5 py-1 rounded-full transition-all ${mobileTab === 'result' ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>
               <Terminal size={20} strokeWidth={mobileTab === 'result' ? 2.5 : 2} />
             </div>
            <span className="text-[10px] font-medium">Result</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default App;