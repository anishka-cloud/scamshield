"use client";

import type { AnalysisResult } from "@/lib/analyzer";
import RiskMeter from "./RiskMeter";
import FindingCard from "./FindingCard";
import ShareCard from "./ShareCard";
import EmailCapture from "./EmailCapture";

const verdictColors = {
  high: "text-red-400",
  medium: "text-amber-400",
  low: "text-blue-400",
  clean: "text-emerald-400",
};

export default function ResultsPanel({ result }: { result: AnalysisResult }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Score + Verdict */}
      <div className="text-center space-y-4">
        <RiskMeter score={result.score} verdict={result.verdict} />
        <div>
          <h2
            className={`text-2xl font-bold ${verdictColors[result.verdict]}`}
          >
            {result.verdictLabel}
          </h2>
          <p className="text-slate-400 mt-2 max-w-md mx-auto">
            {result.verdictAdvice}
          </p>
        </div>
      </div>

      {/* Red Flag Cards */}
      {result.findings.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Red Flags Detected ({result.findings.length})
          </h3>
          <div className="space-y-3">
            {result.findings.map((finding, i) => (
              <FindingCard key={i} finding={finding} />
            ))}
          </div>
        </div>
      )}

      {/* Share Card */}
      <ShareCard result={result} />

      {/* Email Capture */}
      <EmailCapture />
    </div>
  );
}
