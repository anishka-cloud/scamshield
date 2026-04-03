"use client";

import { useEffect, useState } from "react";

const colorMap = {
  high: { stroke: "#ef4444", glow: "rgba(239,68,68,0.3)" },
  medium: { stroke: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
  low: { stroke: "#3b82f6", glow: "rgba(59,130,246,0.3)" },
  clean: { stroke: "#10b981", glow: "rgba(16,185,129,0.3)" },
};

export default function RiskMeter({
  score,
  verdict,
}: {
  score: number;
  verdict: "high" | "medium" | "low" | "clean";
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { stroke, glow } = colorMap[verdict];

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.75; // 270 degrees
  const offset = arc - (arc * animatedScore) / 100;

  useEffect(() => {
    setAnimatedScore(0);
    const timer = setTimeout(() => setAnimatedScore(score), 50);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
          strokeDasharray={`${arc} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(135 100 100)"
        />
        {/* Score arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="12"
          strokeDasharray={`${arc} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(135 100 100)"
          filter="url(#glow)"
          style={{
            transition: "stroke-dashoffset 1.2s ease-out",
            filter: `drop-shadow(0 0 8px ${glow})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-5xl font-bold tabular-nums"
          style={{ color: stroke }}
        >
          {animatedScore}
        </span>
        <span className="text-sm text-slate-400 mt-1">/ 100</span>
      </div>
    </div>
  );
}
