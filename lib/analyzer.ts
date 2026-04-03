export interface ScamCategory {
  name: string;
  weight: number;
  description: string;
  patterns: RegExp[];
}

export interface Finding {
  category: string;
  weight: number;
  severity: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  matches: string[];
}

export interface AnalysisResult {
  score: number;
  verdict: "high" | "medium" | "low" | "clean";
  verdictLabel: string;
  verdictAdvice: string;
  findings: Finding[];
}

const categories: ScamCategory[] = [
  {
    name: "Data Harvesting",
    weight: 25,
    description:
      "Requesting sensitive personal information like SSN, credit card numbers, or bank details is a classic sign of identity theft and phishing scams.",
    patterns: [
      /\b(social\s*security\s*(number|#)?|ssn)\b/i,
      /\b(credit\s*card\s*(number|#|info|details|information)?)\b/i,
      /\b(cvv|cvc|security\s*code)\b/i,
      /\b(bank\s*account\s*(number|#|info|details|information)?)\b/i,
      /\b(date\s*of\s*birth|dob|birth\s*date)\b/i,
      /\b(passport\s*(number|#|info|details)?)\b/i,
      /\b(routing\s*number)\b/i,
      /\b(mother'?s?\s*maiden\s*name)\b/i,
      /\b(full\s*name\s*and\s*address)\b/i,
      /\b(verify\s*your\s*(identity|account|information))\b/i,
      /\b(confirm\s*your\s*(personal|account)\s*(details|information))\b/i,
    ],
  },
  {
    name: "Untraceable Payment",
    weight: 25,
    description:
      "Requesting payment via wire transfer, gift cards, cryptocurrency, or peer-to-peer apps makes it nearly impossible to recover your money.",
    patterns: [
      /\b(wire\s*transfer)\b/i,
      /\b(western\s*union)\b/i,
      /\b(money\s*gram|moneygram)\b/i,
      /\b(gift\s*card)/i,
      /\b(bitcoin|btc|ethereum|eth|crypto\s*wallet|cryptocurrency)\b/i,
      /\b(zelle)\b/i,
      /\b(cash\s*app|cashapp)\b/i,
      /\b(venmo)\b/i,
      /\b(send\s*(the\s*)?money)\b/i,
      /\b(pay\s*(via|through|using|with)\s*(bitcoin|crypto|gift\s*card|wire|zelle|venmo|cash\s*app))/i,
    ],
  },
  {
    name: "Romance Scam",
    weight: 22,
    description:
      "Romance scammers build emotional connections quickly, then fabricate emergencies requiring money. They often claim to be deployed overseas or unable to meet in person.",
    patterns: [
      /\b(deployed\s*(overseas|abroad|military))\b/i,
      /\b(can'?t\s*(video\s*)?chat)\b/i,
      /\b(can'?t\s*meet\s*(in\s*person|right\s*now|yet))\b/i,
      /\b(send\s*(me\s*)?money.*love|love.*send\s*(me\s*)?money)\b/i,
      /\b(i\s*love\s*you.*send|fallen\s*in\s*love)\b/i,
      /\b(my\s*darling|my\s*dearest|my\s*beloved)\b/i,
      /\b(soul\s*mate|soulmate)\b/i,
      /\b(i'?ve\s*never\s*felt\s*this\s*way)\b/i,
      /\b(need\s*(your\s*)?help.*money|money.*need\s*(your\s*)?help)\b/i,
      /\b(stranded\s*(overseas|abroad))\b/i,
    ],
  },
  {
    name: "Rental Scam",
    weight: 22,
    description:
      "Rental scammers list properties they don't own, then pressure you to send deposits before viewing. They often claim to be out of town and offer to mail keys.",
    patterns: [
      /\b(can'?t\s*show\s*(the\s*)?(property|apartment|house|unit))\b/i,
      /\b(out\s*of\s*(town|the\s*country|state))\b/i,
      /\b(mail\s*(you\s*)?(the\s*)?keys)\b/i,
      /\b(send\s*(the\s*)?deposit)\b/i,
      /\b(sight\s*unseen)\b/i,
      /\b(first\s*month.*deposit.*before\s*(viewing|seeing))\b/i,
      /\b(currently\s*(overseas|abroad|out\s*of))\b/i,
      /\b(send\s*.*before\s*(you\s*)?(see|view|visit))\b/i,
      /\b(application\s*fee.*wire|wire.*application\s*fee)\b/i,
    ],
  },
  {
    name: "Government Impersonation",
    weight: 22,
    description:
      "Scammers impersonate government agencies like the IRS, FBI, or Social Security Administration to create fear and urgency. Real agencies never demand immediate payment by phone or email.",
    patterns: [
      /\b(irs|internal\s*revenue\s*service)\b/i,
      /\b(fbi|federal\s*bureau)\b/i,
      /\b(social\s*security\s*admin(istration)?)\b/i,
      /\b(medicare)\b/i,
      /\b(customs\s*(and\s*border|enforcement|agency))\b/i,
      /\b(department\s*of\s*(homeland|justice|treasury))\b/i,
      /\b(warrant\s*(for\s*your|has\s*been\s*issued))\b/i,
      /\b(you\s*will\s*be\s*arrested)\b/i,
      /\b(tax\s*(debt|lien|levy|fraud))\b/i,
      /\b(legal\s*action\s*will\s*be\s*taken)\b/i,
    ],
  },
  {
    name: "Crypto / Investment Scam",
    weight: 22,
    description:
      "Investment scams promise guaranteed returns with no risk. Legitimate investments never guarantee profits. Requests for seed phrases or wallet connections are always scams.",
    patterns: [
      /\b(guaranteed\s*(returns?|profit|income))\b/i,
      /\b(seed\s*phrase)\b/i,
      /\b(connect\s*(your\s*)?wallet)\b/i,
      /\b(airdrop)\b/i,
      /\b(risk[\s-]*free\s*(investment|return|profit))\b/i,
      /\b(double\s*your\s*(money|investment|crypto))\b/i,
      /\b(mining\s*pool|liquidity\s*pool)\b/i,
      /\b(passive\s*income.*crypto|crypto.*passive\s*income)\b/i,
      /\b(decentralized\s*finance.*guaranteed|defi.*guaranteed)\b/i,
      /\b(nft.*exclusive.*invest|invest.*exclusive.*nft)\b/i,
    ],
  },
  {
    name: "Account Threat",
    weight: 20,
    description:
      "Messages claiming your account is suspended or compromised aim to panic you into clicking malicious links or sharing login credentials.",
    patterns: [
      /\b(account\s*(has\s*been\s*)?(suspended|locked|disabled|compromised|restricted))\b/i,
      /\b(locked\s*out\s*of\s*(your\s*)?account)\b/i,
      /\b(unusual\s*(activity|login|sign[\s-]*in))\b/i,
      /\b(verify\s*your\s*(identity|account))\b/i,
      /\b(unauthorized\s*(access|transaction|activity))\b/i,
      /\b(your\s*account\s*will\s*be\s*(closed|terminated|deleted))\b/i,
      /\b(security\s*alert|security\s*notice)\b/i,
      /\b(confirm\s*your\s*(ownership|login))\b/i,
    ],
  },
  {
    name: "Too Good to Be True",
    weight: 20,
    description:
      "Congratulations messages about winning lotteries, receiving inheritances, or unclaimed funds are almost always scams designed to extract fees or personal information.",
    patterns: [
      /\b(lottery\s*(winner|winning)|you'?ve?\s*won)\b/i,
      /\b(inheritance|beneficiary)\b/i,
      /\b(million(s)?\s*(dollars|usd|pounds|euros))\b/i,
      /\b(unclaimed\s*(funds|money|inheritance))\b/i,
      /\b(congratulations.*selected|selected.*congratulations)\b/i,
      /\b(you\s*have\s*been\s*(chosen|selected))\b/i,
      /\b(claim\s*your\s*(prize|reward|winnings|funds))\b/i,
      /\b(lucky\s*winner)\b/i,
    ],
  },
  {
    name: "Emotional Manipulation",
    weight: 20,
    description:
      "Scammers craft elaborate sob stories involving royalty, military personnel, sick relatives, or orphaned children to manipulate your emotions and bypass critical thinking.",
    patterns: [
      /\b(i\s*am\s*a?\s*prince)\b/i,
      /\b(soldier|military\s*(officer|personnel).*help)\b/i,
      /\b(widow|widower)\b/i,
      /\b(orphan(ed)?)\b/i,
      /\b(dying\s*wish)\b/i,
      /\b(terminal(ly)?\s*(ill|sick|disease|cancer))\b/i,
      /\b(god\s*(has\s*)?(directed|led|told)\s*me\s*to\s*(you|contact))\b/i,
      /\b(last\s*wish|final\s*wish)\b/i,
      /\b(refugee\s*camp)\b/i,
    ],
  },
  {
    name: "Marketplace Scam",
    weight: 20,
    description:
      "Marketplace scams involve overpayment with fake checks, insistence on shipping-only transactions, or requests to send back the difference — the original payment always bounces.",
    patterns: [
      /\b(overpay(ment)?|over[\s-]*pay)\b/i,
      /\b(cashier'?s?\s*check)\b/i,
      /\b(shipping\s*only|ship\s*it\s*to)\b/i,
      /\b(send\s*(back\s*)?(the\s*)?difference)\b/i,
      /\b(certified\s*check)\b/i,
      /\b(my\s*(agent|assistant|secretary)\s*will\s*(pick\s*up|send|handle))\b/i,
      /\b(pay\s*more\s*than\s*(the\s*)?(asking|listed)\s*price)\b/i,
    ],
  },
  {
    name: "Brand Impersonation",
    weight: 18,
    description:
      "Scammers impersonate trusted brands like Apple, Amazon, or banks to make their messages appear legitimate. Always verify by contacting the company directly through official channels.",
    patterns: [
      /\b(apple\s*support|apple\s*id\s*(has\s*been|is|was))\b/i,
      /\b(microsoft\s*support|windows\s*(defender|security))\b/i,
      /\b(amazon\s*(support|security|team|customer\s*service))\b/i,
      /\b(paypal\s*(support|security|team|notification))\b/i,
      /\b(netflix\s*(support|account|billing|team))\b/i,
      /\b(your\s*bank\s*(has\s*been|is|was|account))\b/i,
      /\b(geek\s*squad)\b/i,
      /\b(norton\s*(antivirus|security|lifelock))\b/i,
    ],
  },
  {
    name: "Advance Fee",
    weight: 18,
    description:
      "Advance fee scams require you to pay upfront to receive a larger sum. Whether called a 'processing fee,' 'customs charge,' or 'unlock fee,' the promised payout never arrives.",
    patterns: [
      /\b(processing\s*fee)\b/i,
      /\b(customs?\s*fee)\b/i,
      /\b(unlock\s*(the\s*)?(funds|money|account))\b/i,
      /\b(upfront\s*(payment|fee|deposit))\b/i,
      /\b(administrative\s*fee)\b/i,
      /\b(clearance\s*fee)\b/i,
      /\b(transfer\s*fee)\b/i,
      /\b(handling\s*(fee|charge))\b/i,
      /\b(pay\s*.*to\s*(release|receive|claim|access)\s*(the\s*)?(funds|money|prize))\b/i,
    ],
  },
  {
    name: "Job Scam",
    weight: 18,
    description:
      "Job scams promise easy money for minimal work. Legitimate employers never ask you to pay upfront, buy gift cards, or guarantee specific income levels.",
    patterns: [
      /\b(work\s*from\s*home.*(\$|money|earn|income))\b/i,
      /\b(easy\s*money)\b/i,
      /\b(no\s*experience\s*(needed|required|necessary))\b/i,
      /\b(guaranteed\s*(income|salary|pay))\b/i,
      /\b(be\s*your\s*own\s*boss)\b/i,
      /\b(make\s*\$?\d{3,}\s*(per|a|every)\s*(day|hour|week))\b/i,
      /\b(earn\s*up\s*to\s*\$?\d{3,})\b/i,
      /\b(data\s*entry.*\$|typing.*\$|\$.*data\s*entry|\$.*typing)\b/i,
      /\b(paid\s*training.*immediate(ly)?|immediate(ly)?.*paid\s*training)\b/i,
    ],
  },
  {
    name: "Urgency Pressure",
    weight: 15,
    description:
      "Creating false urgency is a manipulation tactic. Scammers want you to act before you can think critically or verify their claims.",
    patterns: [
      /\b(act\s*now)\b/i,
      /\b(urgent(ly)?)\b/i,
      /\b(immediate(ly)?)\b/i,
      /\b(limited\s*time)\b/i,
      /\b(deadline)\b/i,
      /\b(within\s*\d+\s*(hours?|minutes?|days?))\b/i,
      /\b(expires?\s*(today|tonight|soon|in\s*\d+))\b/i,
      /\b(don'?t\s*delay)\b/i,
      /\b(time[\s-]*sensitive)\b/i,
      /\b(last\s*chance)\b/i,
      /\b(final\s*(warning|notice))\b/i,
    ],
  },
  {
    name: "Suspicious Links",
    weight: 15,
    description:
      "Shortened URLs and generic 'click here' links hide the true destination. Scammers use them to direct you to fake login pages that steal your credentials.",
    patterns: [
      /\b(click\s*here)\b/i,
      /bit\.ly/i,
      /tinyurl/i,
      /\b(verify|confirm|login|sign[\s-]*in)\s*(via|through|at|using)\s*(this\s*)?link/i,
      /\b(click\s*(the\s*)?(link|button)\s*(below|above|here))\b/i,
      /\b(update\s*your\s*(information|details|password)\s*(here|now|via))\b/i,
      /t\.co\//i,
      /goo\.gl/i,
      /rb\.gy/i,
    ],
  },
  {
    name: "Phishing Language",
    weight: 10,
    description:
      "Overly formal or generic greetings like 'Dear Sir/Madam' or excessive use of 'kindly' are hallmarks of mass-produced phishing messages.",
    patterns: [
      /\b(dear\s*(sir|madam|friend|customer|user|valued\s*(customer|member)))\b/i,
      /\b(kindly)\b/i,
      /\b(humbly)\b/i,
      /\b(with\s*due\s*respect)\b/i,
      /\b(i\s*write\s*to\s*(inform|notify|let)\s*you)\b/i,
      /\b(good\s*day\s*to\s*you)\b/i,
      /\b(compliments\s*of\s*the\s*(day|season))\b/i,
      /\b(permit\s*me\s*to\s*introduce)\b/i,
    ],
  },
  {
    name: "Excessive Caps",
    weight: 5,
    description:
      "Excessive use of capital letters is a pressure tactic meant to convey urgency and importance, commonly used in spam and scam messages.",
    patterns: [/[A-Z]{5,}/],
  },
  {
    name: "Excessive Punctuation",
    weight: 5,
    description:
      "Multiple exclamation marks or question marks are used to create artificial urgency and excitement — a common trait of scam messages.",
    patterns: [/!{2,}/, /\?{3,}/],
  },
];

export function analyzeMessage(text: string): AnalysisResult {
  const findings: Finding[] = [];

  for (const category of categories) {
    const matches: string[] = [];

    for (const pattern of category.patterns) {
      const match = text.match(new RegExp(pattern.source, pattern.flags + "g"));
      if (match) {
        for (const m of match) {
          if (!matches.includes(m)) {
            matches.push(m);
          }
        }
      }
    }

    if (matches.length > 0) {
      const severity: "HIGH" | "MEDIUM" | "LOW" =
        category.weight >= 20 ? "HIGH" : category.weight >= 15 ? "MEDIUM" : "LOW";

      findings.push({
        category: category.name,
        weight: category.weight,
        severity,
        description: category.description,
        matches,
      });
    }
  }

  // Score: weight × min(matchCount, 3), sum, then normalize
  let rawScore = 0;
  for (const f of findings) {
    rawScore += f.weight * Math.min(f.matches.length, 3);
  }
  const score = Math.min(100, Math.round((rawScore / 130) * 100));

  // Sort by weight descending
  findings.sort((a, b) => b.weight - a.weight);

  let verdict: AnalysisResult["verdict"];
  let verdictLabel: string;
  let verdictAdvice: string;

  if (score >= 70) {
    verdict = "high";
    verdictLabel = "High Risk";
    verdictAdvice =
      "Do NOT respond, click any links, or send money. Block and report the sender immediately.";
  } else if (score >= 40) {
    verdict = "medium";
    verdictLabel = "Medium Risk";
    verdictAdvice =
      "Several red flags detected. Verify the sender independently before taking any action.";
  } else if (score >= 15) {
    verdict = "low";
    verdictLabel = "Low Risk";
    verdictAdvice =
      "Minor suspicious patterns detected. Stay cautious but this may be legitimate.";
  } else {
    verdict = "clean";
    verdictLabel = "Looks Clean";
    verdictAdvice =
      "No major scam patterns detected. Still use your best judgment.";
  }

  return { score, verdict, verdictLabel, verdictAdvice, findings };
}

export const sampleScams: { label: string; text: string }[] = [
  {
    label: "Phishing Email",
    text: `Dear Valued Customer,

Your Apple ID has been suspended due to unusual activity on your account. To avoid permanent account closure, you must verify your identity immediately.

Click here to verify: bit.ly/apple-verify-2024

You will need to confirm your:
- Full name and address
- Credit card number and CVV
- Date of birth
- Social Security Number

URGENT: Your account will be permanently deleted within 24 hours if you do not act now!!!

Sincerely,
Apple Support Team`,
  },
  {
    label: "Rental Scam",
    text: `Hi there,

I saw you were interested in the apartment listing. The rent is $800/month for a beautiful 2-bedroom — well below market rate.

Unfortunately, I'm currently out of the country on a mission trip and can't show the property in person. However, I can mail you the keys once I receive the deposit.

Please send the first month's rent and security deposit ($1,600 total) via Zelle to secure the apartment before someone else takes it. You won't be able to see it before the deposit since I have the only set of keys with me.

This is a limited time offer — I've had many inquiries. Please act immediately.

God bless,
Pastor Williams`,
  },
  {
    label: "Job Scam",
    text: `CONGRATULATIONS! You've been selected for a Work From Home opportunity!

No experience needed! Earn up to $5,000 per week with simple data entry tasks. Be your own boss and make easy money from the comfort of your home!

To get started, you'll need to purchase a $200 gift card as your enrollment fee. This covers your training materials and software setup.

Guaranteed income — we have hundreds of satisfied workers already! Paid training starts immediately after you submit your enrollment fee via CashApp.

Don't delay — positions are filling up fast!!!

Reply ASAP to secure your spot!`,
  },
  {
    label: "Romance Scam",
    text: `My dearest,

I know we've only been talking for two weeks, but I've never felt this way about anyone before. You are my soulmate, and I've fallen in love with you completely.

I'm currently deployed overseas with the military, so I can't video chat due to security restrictions. But I promise when I return, we'll be together forever.

I have a small emergency — I need $2,000 for medical treatment that the military won't cover. Can you send money through Western Union? I'll pay you back as soon as I'm stateside.

Please don't delay, my darling. I love you so much and need your help urgently.

Forever yours,
Captain James Rodriguez`,
  },
  {
    label: "Crypto Scam",
    text: `🚀 EXCLUSIVE OPPORTUNITY — LIMITED SPOTS 🚀

Join our exclusive DeFi liquidity pool and earn GUARANTEED RETURNS of 15% daily! This is a risk-free investment that has already made our members millions of dollars.

To get started:
1. Connect your wallet at our platform
2. Enter your seed phrase to verify ownership
3. Deposit minimum 0.5 ETH (Bitcoin also accepted)

Our proprietary mining pool algorithm ensures passive income with ZERO risk. Double your crypto investment in just 7 days!!!

This airdrop promotion expires within 48 hours — act now before it's too late!

Join our Telegram for more guaranteed profit strategies.`,
  },
];
