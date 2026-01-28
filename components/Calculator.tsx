
import React, { useState, useCallback } from 'react';
import { History, Delete, X, Divide, Plus, Minus, Equal, Info } from 'lucide-react';
import { CalculationResult } from '../types';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [isScientific, setIsScientific] = useState(true);

  const handleInput = useCallback((val: string) => {
    setDisplay((prev) => {
      if (prev === '0' && val !== '.') return val;
      if (prev.length >= 20) return prev;
      return prev + val;
    });
  }, []);

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const backspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const calculate = () => {
    try {
      // Basic expression sanitizer/parser
      const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-eval
      const res = eval(sanitized);
      const resultStr = Number.isFinite(res) ? String(parseFloat(res.toFixed(8))) : 'Error';
      
      const newCalc: CalculationResult = {
        expression: display,
        result: resultStr,
        timestamp: new Date()
      };

      setHistory((prev) => [newCalc, ...prev].slice(0, 5));
      setEquation(display + ' =');
      setDisplay(resultStr);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const scientificFunc = (func: string) => {
    try {
      const val = parseFloat(display);
      let res = 0;
      switch (func) {
        case 'sin': res = Math.sin(val); break;
        case 'cos': res = Math.cos(val); break;
        case 'tan': res = Math.tan(val); break;
        case 'log': res = Math.log10(val); break;
        case 'ln': res = Math.log(val); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'pow2': res = Math.pow(val, 2); break;
        case 'pi': res = Math.PI; break;
        case 'e': res = Math.E; break;
        default: return;
      }
      setDisplay(String(parseFloat(res.toFixed(8))));
      setEquation(`${func}(${val}) =`);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const memoryFunc = (action: string) => {
    const current = parseFloat(display);
    if (isNaN(current)) return;

    switch (action) {
      case 'MC': setMemory(0); break;
      case 'MR': setDisplay(String(memory)); break;
      case 'M+': setMemory(prev => prev + current); break;
      case 'M-': setMemory(prev => prev - current); break;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center animate-in fade-in duration-700">
      {/* Calculator Main Unit */}
      <div className="w-full max-w-[420px] bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl border border-slate-800">
        {/* Screen */}
        <div className="bg-slate-950 rounded-3xl p-6 mb-6 h-32 flex flex-col justify-end items-end overflow-hidden border border-slate-800 shadow-inner">
          <div className="text-indigo-400 text-sm font-medium mb-1 truncate w-full text-right h-5">
            {equation}
          </div>
          <div className="text-4xl font-mono-custom font-bold tracking-tight text-white overflow-x-auto no-scrollbar w-full text-right">
            {display}
          </div>
        </div>

        {/* Action Toggle */}
        <div className="flex justify-between items-center mb-4 px-2">
           <button 
            onClick={() => setIsScientific(!isScientific)}
            className="text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors"
           >
            {isScientific ? 'Mode Simple' : 'Mode Scientifique'}
           </button>
           <div className="flex gap-4">
              <button onClick={() => memoryFunc('MC')} className="text-xs font-bold text-slate-600 hover:text-slate-400">MC</button>
              <button onClick={() => memoryFunc('MR')} className="text-xs font-bold text-slate-600 hover:text-slate-400">MR</button>
              <button onClick={() => memoryFunc('M+')} className="text-xs font-bold text-slate-600 hover:text-slate-400">M+</button>
           </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button onClick={clear} className="col-span-1 h-14 rounded-2xl bg-slate-800 text-rose-500 font-bold hover:bg-slate-700 transition-all">AC</button>
          <button onClick={backspace} className="h-14 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-all"><Delete size={20}/></button>
          <button onClick={() => handleInput('%')} className="h-14 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all">%</button>
          <button onClick={() => handleInput('/')} className="h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center hover:bg-indigo-600/30 transition-all"><Divide size={20}/></button>

          {/* Row 2 */}
          <button onClick={() => handleInput('7')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">7</button>
          <button onClick={() => handleInput('8')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">8</button>
          <button onClick={() => handleInput('9')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">9</button>
          <button onClick={() => handleInput('*')} className="h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center hover:bg-indigo-600/30 transition-all"><X size={20}/></button>

          {/* Row 3 */}
          <button onClick={() => handleInput('4')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">4</button>
          <button onClick={() => handleInput('5')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">5</button>
          <button onClick={() => handleInput('6')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">6</button>
          <button onClick={() => handleInput('-')} className="h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center hover:bg-indigo-600/30 transition-all"><Minus size={20}/></button>

          {/* Row 4 */}
          <button onClick={() => handleInput('1')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">1</button>
          <button onClick={() => handleInput('2')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">2</button>
          <button onClick={() => handleInput('3')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">3</button>
          <button onClick={() => handleInput('+')} className="h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center hover:bg-indigo-600/30 transition-all"><Plus size={20}/></button>

          {/* Row 5 */}
          <button onClick={() => handleInput('0')} className="col-span-2 h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">0</button>
          <button onClick={() => handleInput('.')} className="h-14 rounded-2xl bg-slate-800 text-white text-xl font-medium hover:bg-slate-700 transition-all">.</button>
          <button onClick={calculate} className="h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"><Equal size={24}/></button>
        </div>

        {/* Scientific Buttons */}
        {isScientific && (
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-800/50">
            <button onClick={() => scientificFunc('sin')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">sin</button>
            <button onClick={() => scientificFunc('cos')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">cos</button>
            <button onClick={() => scientificFunc('tan')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">tan</button>
            <button onClick={() => scientificFunc('sqrt')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">√</button>
            <button onClick={() => scientificFunc('log')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">log</button>
            <button onClick={() => scientificFunc('ln')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">ln</button>
            <button onClick={() => scientificFunc('pi')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">π</button>
            <button onClick={() => scientificFunc('e')} className="h-10 rounded-xl bg-slate-800/50 text-indigo-300 text-xs font-bold hover:bg-slate-800 transition-all">e</button>
          </div>
        )}
      </div>

      {/* History Side Panel */}
      <div className="w-full max-w-[320px] bg-slate-900/50 backdrop-blur rounded-[2rem] p-6 border border-slate-800 h-full max-h-[600px] flex flex-col">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
          <History size={18} className="text-indigo-400" />
          <h3 className="font-semibold text-slate-200">Historique</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {history.length === 0 ? (
            <div className="text-slate-500 text-center py-8 italic text-sm">
              Aucun calcul récent
            </div>
          ) : (
            history.map((item, idx) => (
              <div key={idx} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 animate-in slide-in-from-right duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                <p className="text-xs text-slate-500 mb-1">{item.expression}</p>
                <p className="text-lg font-mono-custom font-bold text-indigo-400">{item.result}</p>
                <p className="text-[10px] text-slate-600 mt-1">{item.timestamp.toLocaleTimeString()}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-2xl flex gap-3">
          <Info className="text-indigo-400 flex-shrink-0" size={18} />
          <p className="text-xs text-indigo-300 leading-relaxed">
            Utilisez les fonctions avancées pour des calculs trigonométriques et logarithmiques précis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
