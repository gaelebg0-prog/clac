
import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, TrendingUp, DollarSign, Euro, PoundSterling } from 'lucide-react';
import { Currency, ExchangeRate } from '../types';

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
];

// Mock rates for the demo
const MOCK_BASE_RATES: Record<string, number> = {
  'USD': 1.0,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 151.2,
  'CAD': 1.35,
  'CHF': 0.90,
  'AUD': 1.53,
  'CNY': 7.23,
  'BRL': 5.06,
  'INR': 83.3,
  'MXN': 16.5,
  'ZAR': 18.7,
  'RUB': 92.4,
  'KRW': 1345.0,
  'SGD': 1.35,
  'HKD': 7.82,
  'TRY': 32.2,
  'NZD': 1.66,
  'AED': 3.67,
  'SAR': 3.75,
  'THB': 36.4,
  'ILS': 3.63,
  'NOK': 10.7,
  'SEK': 10.6,
  'DKK': 6.86,
};

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number>(0);
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    // Calculate rate relative to USD base
    const fromRate = MOCK_BASE_RATES[fromCurrency] || 1;
    const toRate = MOCK_BASE_RATES[toCurrency] || 1;
    const finalRate = toRate / fromRate;
    
    setRate(finalRate);
    setResult(amount * finalRate);
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const getCurrencyData = (code: string) => CURRENCIES.find(c => c.code === code);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center animate-in fade-in zoom-in duration-500">
      {/* Conversion Main Card */}
      <div className="w-full max-w-[500px] bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-800 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <DollarSign className="text-indigo-500" />
            Conversion de Devise
          </h2>

          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Montant à convertir</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-2xl font-mono-custom font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                  {getCurrencyData(fromCurrency)?.symbol}
                </div>
              </div>
            </div>

            {/* Currency Selectors */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">De</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600/50 cursor-pointer"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={swapCurrencies}
                className="mt-6 p-3 bg-slate-800 rounded-full border border-slate-700 text-indigo-400 hover:bg-slate-700 hover:text-white transition-all transform hover:rotate-180 duration-500 shadow-lg"
              >
                <ArrowLeftRight size={20} />
              </button>

              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">À</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600/50 cursor-pointer"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Result Area */}
        <div className="mt-10 pt-8 border-t border-slate-800">
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-500 text-sm font-medium">Résultat calculé</span>
            <span className="text-xs text-indigo-400 font-mono-custom">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</span>
          </div>
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
            <div className="text-sm text-indigo-400 mb-1 font-medium">{amount.toLocaleString()} {fromCurrency} =</div>
            <div className="text-4xl font-mono-custom font-black text-white">
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
            </div>
          </div>
        </div>
      </div>

      {/* Market Watch Side Panel */}
      <div className="w-full max-w-[400px] flex flex-col gap-6">
        <div className="bg-slate-900 rounded-[2rem] p-6 border border-slate-800 flex-1">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
            <TrendingUp size={18} className="text-emerald-400" />
            <h3 className="font-semibold text-slate-200">Surveillance Marché</h3>
          </div>
          
          <div className="space-y-4">
            {['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD'].map((pair, idx) => (
              <div key={pair} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${idx % 2 === 0 ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></div>
                  <span className="font-medium text-sm text-slate-300">{pair}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {idx === 0 ? '1.0924' : idx === 1 ? '1.2741' : idx === 2 ? '151.32' : '67,421.10'}
                  </div>
                  <div className={`text-[10px] ${idx % 2 === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {idx % 2 === 0 ? '+0.42%' : '-0.15%'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4 px-1">
              <span>DEVISES POPULAIRES</span>
              <button className="text-indigo-400 hover:underline">Tout voir</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/30 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => {setFromCurrency('EUR'); setToCurrency('USD')}}>
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400"><Euro size={16}/></div>
                <div className="text-xs font-bold">EUR</div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/30 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => {setFromCurrency('USD'); setToCurrency('EUR')}}>
                <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center text-emerald-400"><DollarSign size={16}/></div>
                <div className="text-xs font-bold">USD</div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/30 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => {setFromCurrency('GBP'); setToCurrency('USD')}}>
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400"><PoundSterling size={16}/></div>
                <div className="text-xs font-bold">GBP</div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/30 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => {setFromCurrency('JPY'); setToCurrency('USD')}}>
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center text-amber-400"><span className="text-sm font-bold">¥</span></div>
                <div className="text-xs font-bold">JPY</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 rounded-[2rem] p-6 text-white overflow-hidden relative group">
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-2">Conversion Mondiale</h4>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Désormais avec plus de 25 devises mondiales supportées pour vos voyages et transactions.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <ArrowLeftRight size={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
