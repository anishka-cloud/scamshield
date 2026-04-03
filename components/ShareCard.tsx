"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/analyzer";

const verdictEmoji = {
  high: "\u26a0\ufe0f",
  medium: "\u26a0\ufe0f",
  low: "\u2139\ufe0f",
  clean: "\u2705",
};

const verdictBg = {
  high: "from-red-500/20 to-red-900/20 border-red-500/30",
  medium: "from-amber-500/20 to-amber-900/20 border-amber-500/30",
  low: "from-blue-500/20 to-blue-900/20 border-blue-500/30",
  clean: "from-emerald-500/20 to-emerald-900/20 border-emerald-500/30",
};

export default function ShareCard({ result }: { result: AnalysisResult }) {
  const [copied, setCopied] = useState(false);

  const shareText = `I just checked a suspicious message with ScamShield — it scored ${result.score}/100 risk. Check yours free!`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div
        className={`bg-gradient-to-br ${verdictBg[result.verdict]} border rounded-2xl p-6 text-center`}
      >
        <div className="text-xs uppercase tracking-widest text-slate-400 mb-3">
          ScamShield Analysis
        </div>
        <div className="text-5xl font-bold text-white mb-1">{result.score}</div>
        <div className="text-sm text-slate-400 mb-3">/ 100 risk score</div>
        <div className="text-lg font-semibold text-white">
          {verdictEmoji[result.verdict]} {result.verdictLabel}
        </div>
        {result.findings.length > 0 && (
          <div className="text-sm text-slate-400 mt-2">
            {result.findings.length} red flag
            {result.findings.length !== 1 ? "s" : ""} detected
          </div>
        )}
      </div>
      <button
        onClick={handleCopy}
        className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy & Share"}
      </button>
    </div>
  );
}
