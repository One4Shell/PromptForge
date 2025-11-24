import React from 'react';
import { Hammer } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../lib/constants';

interface HeaderProps {
  currentView?: 'landing' | 'app';
  onNavigate?: (view: 'landing' | 'app') => void;
  language?: Language;
}

const Header: React.FC<HeaderProps> = ({ currentView = 'app', onNavigate, language = 'en' }) => {
  const t = UI_TRANSLATIONS[language].nav || { home: 'Home', app: 'App' };

  return (
    <header className="mb-8 border-b border-slate-200 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <button 
          onClick={() => onNavigate?.('landing')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <Hammer size={24} />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">PromptForge</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Engineer optimized system prompts for your LLMs</p>
          </div>
        </button>
        
        {onNavigate && (
           <div className="flex bg-slate-100 p-1 rounded-lg dark:bg-slate-800">
             <button
                onClick={() => onNavigate('landing')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${currentView === 'landing' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
             >
               {t.home}
             </button>
             <button
                onClick={() => onNavigate('app')}
                 className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${currentView === 'app' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
             >
               {t.app}
             </button>
           </div>
        )}

        <div className="hidden text-xs font-medium text-slate-400 dark:text-slate-500 md:block ml-4">
          v1.2 &bull; Prompt Forge
        </div>
      </div>
    </header>
  );
};

export default Header;