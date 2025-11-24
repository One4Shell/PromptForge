import React from 'react';
import { Hammer, ShieldCheck, Zap, Globe, ChevronDown, ChevronRight, Terminal, Sparkles } from 'lucide-react';
import { UI_TRANSLATIONS } from '../lib/constants';
import { Language } from '../types';

interface LandingPageProps {
  language: Language;
  onStart: () => void;
  onChangeLanguage: (lang: Language) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ language, onStart, onChangeLanguage }) => {
  const t = UI_TRANSLATIONS[language].landing;

  const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="flex flex-col items-start p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
      <div className="p-3 bg-indigo-50 rounded-lg mb-4 dark:bg-indigo-900/30">
        <Icon size={24} className="text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed dark:text-slate-400">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 mb-8 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400">
            <Sparkles size={12} className="text-indigo-500" />
            <span>PromptForge v1.2</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 dark:text-white leading-[1.1]">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-2 dark:shadow-none dark:hover:bg-indigo-500"
            >
              <Hammer size={20} />
              {t.cta}
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold text-lg border border-slate-200 hover:bg-slate-50 transition-all w-full sm:w-auto dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {UI_TRANSLATIONS[language].landing.howTitle}
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.featuresTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Terminal} 
              title={t.features[0].title} 
              desc={t.features[0].desc} 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title={t.features[1].title} 
              desc={t.features[1].desc} 
            />
            <FeatureCard 
              icon={Globe} 
              title={t.features[2].title} 
              desc={t.features[2].desc} 
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 relative border-t border-slate-100 dark:border-slate-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16 dark:text-white">{t.howTitle}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10 dark:bg-slate-800" />
            
            {t.steps.map((step: any, idx: number) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl mb-6 shadow-sm z-10 dark:bg-slate-900 dark:border-slate-800 dark:text-indigo-400">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION - SEO OPTIMIZED */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 dark:text-white">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faq.map((item: any, idx: number) => (
              <details key={idx} className="group bg-white rounded-xl border border-slate-200 shadow-sm open:ring-2 open:ring-indigo-500/10 dark:bg-slate-900 dark:border-slate-800">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-slate-900 hover:text-indigo-600 transition-colors list-none outline-none dark:text-slate-100 dark:hover:text-indigo-400">
                  {item.q}
                  <ChevronDown className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 bg-white text-center dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Hammer className="text-indigo-600 dark:text-indigo-400" size={24} />
          <span className="font-bold text-lg dark:text-white">PromptForge</span>
        </div>
        <p className="text-slate-500 text-sm mb-6 dark:text-slate-500">
          © 2024 PromptForge. Open Source AI Engineering Tool.
        </p>
        <div className="flex justify-center gap-4">
          {['en', 'it', 'fr', 'de'].map((lang) => (
            <button 
              key={lang}
              onClick={() => onChangeLanguage(lang as Language)}
              className={`text-xs font-bold uppercase ${language === lang ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
