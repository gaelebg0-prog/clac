
import React, { useState } from 'react';
import { Sparkles, Brain, Lightbulb, Send, Loader2, Info } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIInsights: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAIResponse = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResponse(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `En tant qu'assistant expert en mathématiques et finance, réponds à cette question de manière concise et pédagogique en français : ${prompt}`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });
      setResponse(result.text || "Désolé, je n'ai pas pu générer de réponse.");
    } catch (error) {
      console.error(error);
      setResponse("Une erreur est survenue lors de la communication avec l'IA. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Brain className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Assistant IA Nova</h2>
              <p className="text-slate-400 text-sm">Expliquez des concepts complexes ou demandez des analyses.</p>
            </div>
          </div>
          <Sparkles className="text-indigo-400 opacity-50" />
        </div>

        {/* Question Area */}
        <div className="mb-8">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Explique-moi le théorème de Pythagore ou la différence entre inflation et déflation..."
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-3xl p-6 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all resize-none"
            />
            <button
              onClick={getAIResponse}
              disabled={loading || !prompt.trim()}
              className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl px-6 py-3 font-bold transition-all flex items-center gap-2 shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              <span>Analyser</span>
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            "Théorème de Bayes",
            "Effet de levier financier",
            "Équations différentielles",
            "Cryptomonnaies vs Monnaie Fiat",
            "Suite de Fibonacci"
          ].map((text) => (
            <button
              key={text}
              onClick={() => setPrompt(text)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-all"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Response Area */}
        {(response || loading) && (
          <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Lightbulb size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Réponse de l'IA</span>
            </div>
            {loading ? (
              <div className="flex flex-col items-center py-12">
                <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
                <p className="text-slate-400 animate-pulse">L'intelligence artificielle analyse votre demande...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {response}
                </p>
              </div>
            )}
          </div>
        )}

        {!response && !loading && (
          <div className="text-center py-12 opacity-30 select-none">
            <Info size={48} className="mx-auto mb-4" />
            <p>Posez une question pour commencer l'analyse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
