"use client";

import { useState, type FormEvent } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      // In V1, just show success. Wire to Beehiiv/ConvertKit later.
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
        <div className="text-emerald-400 text-lg font-semibold mb-1">
          You&apos;re in!
        </div>
        <p className="text-slate-400 text-sm">
          Watch for your first scam alert this week.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-1">
        Get weekly scam alerts
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        New scams emerge daily. We&apos;ll send a weekly roundup of the latest
        threats so you stay one step ahead.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium text-sm hover:from-indigo-600 hover:to-violet-600 transition-all cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
