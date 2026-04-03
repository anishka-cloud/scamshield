const scamTypes = [
  "Phishing Emails",
  "Rental Scams",
  "Romance Scams",
  "Job Scams",
  "Crypto & Investment Scams",
  "Government Impersonation",
  "Brand Impersonation",
  "Marketplace Scams",
  "Advance Fee Fraud",
  "Data Harvesting",
  "Account Threats",
  "Too Good to Be True",
  "Emotional Manipulation",
  "Untraceable Payments",
  "Suspicious Links",
  "Urgency Tactics",
];

const stats = [
  { value: "3.4B", label: "phishing emails sent daily" },
  { value: "$12.5B", label: "lost to scams in 2024" },
  { value: "1 in 3", label: "adults targeted per year" },
];

export default function LandingContent() {
  return (
    <div className="space-y-20 py-16">
      {/* How it works */}
      <section>
        <h2 className="text-2xl font-bold text-white text-center mb-10">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Paste it",
              desc: "Copy the suspicious message and paste it into our analyzer.",
            },
            {
              step: "2",
              title: "We analyze it",
              desc: "Our engine checks against 18+ scam categories and patterns.",
            },
            {
              step: "3",
              title: "Get your score",
              desc: "See your risk score, red flags, and shareable report card.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we detect */}
      <section>
        <h2 className="text-2xl font-bold text-white text-center mb-10">
          What we detect
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scamTypes.map((type) => (
            <div key={type} className="flex items-center gap-3 text-slate-300">
              <svg
                className="w-5 h-5 text-indigo-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-sm">{type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
