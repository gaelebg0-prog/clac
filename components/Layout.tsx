
import React from 'react';
import { AppTab } from '../types';
import { Calculator as CalcIcon, RefreshCw, Github } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <CalcIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:block">
            NovaCalc
          </span>
        </div>

        <div className="flex bg-slate-800/50 p-1 rounded-full border border-slate-700">
          <button
            onClick={() => onTabChange(AppTab.CALCULATOR)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === AppTab.CALCULATOR ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalcIcon size={16} />
            <span className="hidden sm:inline">Calculatrice</span>
          </button>
          <button
            onClick={() => onTabChange(AppTab.CONVERTER)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === AppTab.CONVERTER ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Convertisseur</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
           <a href="#" className="p-2 text-slate-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
        </div>
      </nav>

      {children}

      <footer className="mt-auto py-8 text-center text-slate-500 text-sm border-t border-slate-900">
        <p>© 2024 NovaCalc & Finance. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Layout;
