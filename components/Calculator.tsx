
import React, { useState, useCallback } from 'react';
import { History, Delete, X, Divide, Plus, Minus, Equal, Info, ChevronRight, ChevronLeft } from 'lucide-react';
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

  const Button = ({ children, onClick, className, variant = 'default' }: any) => {
    const baseStyles = "h-14 rounded-2xl flex items-center justify-center font-bold transition-all duration-200 active:scale-95 active:brightness-90 select-none shadow-sm";
    const variants: Record<string, string> = {
      default: "bg-gradient-to-b from-slate-800 to-slate-800/80 text-white hover:from-slate-700 hover:to-slate-800 border-t border-slate-700/50",
      action: "bg-gradient-to-b from-slate-700 to-slate-800 text-slate-300 hover:from-slate-600 hover:to-slate-700 border-t border-slate-600/50",
      operator: "bg-gradient-to-b from-indigo-500/20 to-indigo-600/10 text-indigo-400 hover:from-indigo-500/30 hover:to-indigo-600/20 border-t border-indigo-400/20",
      equal: "bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white hover:from-indigo-400 hover:to-violet-600 shadow-lg shadow-indigo-600/30 border-t border-white/20",
      danger: "bg-gradient-to-b from-rose-500/10 to-rose-600/5 text-rose-500 hover:from-rose-500/20 hover:to-rose-600/10 border-t border-rose-500/20",
      scientific: "h-11 bg-slate-900/40 text-indigo-300/80 text-xs hover:bg-slate-800 hover:text-indigo-300 border border-slate-800/50 rounded-xl"
    };

    return (
      <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-center animate-in fade-in duration-1000">
      {/* Calculator Main Unit */}
      <div className="w-full max-w-[440px] bg-[#0f172a] rounded-[3rem] p-7 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-slate-800/50 relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Screen */}
        <div className="bg-gradient-to-b from-slate-950 to-[#020617] rounded-[2rem] p-8 mb-8 h-40 flex flex-col justify-end items-end overflow-hidden border border-slate-800/60 shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)] relative">
          <div className="absolute top-4 left-4 flex gap-1.5 opacity-40">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-indigo-400/60 text-sm font-medium mb-2 tracking-wider truncate w-full text-right h-5 font-mono-custom">
            {equation}
          </div>
          <div className="text-5xl font-mono-custom font-bold tracking-tight text-white overflow-x-auto no-scrollbar w-full text-right py-1">
            {display}
          </div>
        </div>

        {/* Action Toggle & Memory */}
        <div className="flex justify-between items-center mb-6 px-2">
           <button 
            onClick={() => setIsScientific(!isScientific)}
            className="group/btn flex items-center gap-2 py-2 px-4 rounded-full bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 transition-all"
           >
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isScientific ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-slate-600'}`} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover/btn:text-slate-200 transition-colors">
              {isScientific ? 'Scientifique' : 'Simple'}
            </span>
            {isScientific ? <ChevronLeft size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
           </button>

           <div className="flex gap-4">
              {['MC', 'MR', 'M+'].map(m => (
                <button 
                  key={m}
                  onClick={() => memoryFunc(m)} 
                  className="text-[10px] font-black text-slate-600 hover:text-indigo-400 transition-colors tracking-widest"
                >
                  {m}
                </button>
              ))}
           </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* Row 1 */}
          <Button onClick={clear} variant="danger">AC</Button>
          <Button onClick={backspace} variant="action"><Delete size={20}/></Button>
          <Button onClick={() => handleInput('%')} variant="action">%</Button>
          <Button onClick={() => handleInput('/')} variant="operator"><Divide size={22}/></Button>

          {/* Row 2 */}
          <Button onClick={() => handleInput('7')}>7</Button>
          <Button onClick={() => handleInput('8')}>8</Button>
          <Button onClick={() => handleInput('9')}>9</Button>
          <Button onClick={() => handleInput('*')} variant="operator"><X size={20}/></Button>

          {/* Row 3 */}
          <Button onClick={() => handleInput('4')}>4</Button>
          <Button onClick={() => handleInput('5')}>5</Button>
          <Button onClick={() => handleInput('6')}>6</Button>
          <Button onClick={() => handleInput('-')} variant="operator"><Minus size={22}/></Button>

          {/* Row 4 */}
          <Button onClick={() => handleInput('1')}>1</Button>
          <Button onClick={() => handleInput('2')}>2</Button>
          <Button onClick={() => handleInput('3')}>3</Button>
          <Button onClick={() => handleInput('+')} variant="operator"><Plus size={22}/></Button>

          {/* Row 5 */}
          <Button onClick={() => handleInput('0')} className="col-span-2">0</Button>
          <Button onClick={() => handleInput('.')}>.</Button>
          <Button onClick={calculate} variant="equal"><Equal size={28}/></Button>
        </div>

        {/* Scientific Buttons */}
        <div className={`grid grid-cols-4 gap-3 transition-all duration-500 overflow-hidden ${isScientific ? 'max-h-[200px] mt-6 pt-6 opacity-100 border-t border-slate-800/50' : 'max-h-0 mt-0 pt-0 opacity-0 border-none'}`}>
          <Button onClick={() => scientificFunc('sin')} variant="scientific">sin</Button>
          <Button onClick={() => scientificFunc('cos')} variant="scientific">cos</Button>
          <Button onClick={() => scientificFunc('tan')} variant="scientific">tan</Button>
          <Button onClick={() => scientificFunc('sqrt')} variant="scientific">√x</Button>
          <Button onClick={() => scientificFunc('log')} variant="scientific">log</Button>
          <Button onClick={() => scientificFunc('ln')} variant="scientific">ln</Button>
          <Button onClick={() => scientificFunc('pi')} variant="scientific">π</Button>
          <Button onClick={() => scientificFunc('e')} variant="scientific">e</Button>
        </div>
      </div>

      {/* History Side Panel */}
      <div className="w-full max-w-[340px] bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-800/50 h-full max-h-[640px] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <History size={18} className="text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-100 tracking-tight">Derniers Calculs</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{history.length} ITEMS</span>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700/30">
                <History size={24} className="text-slate-600" />
              </div>
              <p className="text-slate-500 font-medium text-sm">Prêt pour votre premier calcul ?</p>
            </div>
          ) : (
            history.map((item, idx) => (
              <div 
                key={idx} 
                className="group/history relative bg-gradient-to-br from-slate-800/30 to-slate-900/40 p-5 rounded-2xl border border-slate-700/30 animate-in slide-in-from-right-4 duration-500 hover:border-indigo-500/30 transition-all cursor-default" 
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <p className="text-xs font-mono-custom text-slate-500 mb-2 group-hover/history:text-slate-400 transition-colors">{item.expression}</p>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-xl font-mono-custom font-black text-indigo-400 group-hover/history:text-indigo-300 transition-colors">{item.result}</p>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter whitespace-nowrap">{item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 border border-indigo-500/10 p-5 rounded-3xl flex gap-4 items-start group/tip">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover/tip:scale-110 transition-transform">
            <Info className="text-indigo-400" size={16} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Astuce Pro</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Utilisez le <span className="text-slate-200">Mode Scientifique</span> pour accéder aux fonctions logarithmiques et trigonométriques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
