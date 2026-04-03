"use client";

import { useState, useCallback } from "react";
import { analyzeMessage, sampleScams, type AnalysisResult } from "@/lib/analyzer";
import ResultsPanel from "./ResultsPanel";
import LandingContent from "./LandingContent";

export default function ScamAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    // Brief delay for credibility
    setTimeout(() => {
      setResult(analyzeMessage(text));
      setAnalyzing(false);
    }, 1200);
  }, [text]);

  const handleSample = useCallback((sampleText: string) => {
    setText(sampleText);
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeMessage(sampleText));
      setAnalyzing(false);
    }, 1200);
  }, []);

  const handleReset = useCallback(() => {
    setText("");
    setResult(null);
  }, []);

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the suspicious message here..."
          rows={8}
          className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-sm leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || analyzing}
            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm hover:from-indigo-600 hover:to-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {analyzing ? "Analyzing..." : "Analyze Message"}
          </button>
          {result && (
            <button
              onClick={handleReset}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-sm transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sample buttons */}
        {!result && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
              Try a sample
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleScams.map((sample) => (
                <button
                  key={sample.label}
                  onClick={() => handleSample(sample.text)}
                  disabled={analyzing}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white text-xs transition-colors disabled:opacity-40 cursor-pointer"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading Animation */}
      {analyzing && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm animate-pulse">
            Scanning for scam patterns...
          </p>
        </div>
      )}

      {/* Results */}
      {result && !analyzing && <ResultsPanel result={result} />}

      {/* Landing content when no results */}
      {!result && !analyzing && <LandingContent />}
    </div>
  );
}
