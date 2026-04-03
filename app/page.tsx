import ScamAnalyzer from "@/components/ScamAnalyzer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="w-7 h-7 text-indigo-400"
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
            <span className="text-lg font-bold text-white">ScamShield</span>
          </div>
          <span className="text-xs text-slate-500">Free Scam Checker</span>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Is this a scam?
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Paste any suspicious email, text, DM, rental listing, or job post.
          Get an instant risk analysis with red flags and a shareable report.
        </p>
      </div>

      {/* Main Tool */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <ScamAnalyzer />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-slate-600">
          <p>
            ScamShield uses pattern matching to detect common scam indicators.
            It is not a substitute for professional advice. Always verify
            suspicious communications independently.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} ScamShield. All rights reserved.
          </p>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What types of scams can ScamShield detect?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ScamShield detects 18+ categories including phishing emails, romance scams, rental scams, job scams, crypto/investment scams, government impersonation, brand impersonation, marketplace scams, advance fee fraud, data harvesting, and more.",
                },
              },
              {
                "@type": "Question",
                name: "Is ScamShield free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, ScamShield is completely free. Paste any suspicious message and get an instant risk analysis with specific red flags identified.",
                },
              },
              {
                "@type": "Question",
                name: "How does ScamShield analyze messages?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ScamShield uses pattern matching against 18+ scam categories, each with a severity weight. It identifies specific red flags, calculates a risk score from 0-100, and provides actionable advice.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
