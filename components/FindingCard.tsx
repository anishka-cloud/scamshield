import type { Finding } from "@/lib/analyzer";

const severityColors = {
  HIGH: "bg-red-500/10 text-red-400 border-red-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const badgeColors = {
  HIGH: "bg-red-500/20 text-red-400",
  MEDIUM: "bg-amber-500/20 text-amber-400",
  LOW: "bg-blue-500/20 text-blue-400",
};

export default function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div
      className={`rounded-xl border p-4 ${severityColors[finding.severity]}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-white">{finding.category}</h3>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColors[finding.severity]}`}
        >
          {finding.severity}
        </span>
      </div>
      <p className="text-sm text-slate-300 mb-3">{finding.description}</p>
      <div className="flex flex-wrap gap-2">
        {finding.matches.map((match, i) => (
          <code
            key={i}
            className="text-xs bg-slate-900/60 text-slate-200 px-2 py-1 rounded font-mono"
          >
            {match}
          </code>
        ))}
      </div>
    </div>
  );
}
