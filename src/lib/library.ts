import guidePdf from "@/assets/si-field-guide.pdf.asset.json";
import siCover from "@/assets/social-intelligence-cover.png.asset.json";
import funnyPdf from "@/assets/i-am-officially-funny.pdf.asset.json";
import selfTrustPdf from "@/assets/self-trust.pdf.asset.json";
import selfTrustCover from "@/assets/self-trust-cover.png.asset.json";

const ASSET_ORIGIN = "https://social-skills-lab.lovable.app";

function assetUrl(url: string) {
  return new URL(url, ASSET_ORIGIN).href;
}

export type LibraryItem = {
  slug: string;
  edition: string;
  kind: string;
  title: string;
  subtitle: string;
  pillars: string;
  blurb: string;
  pages?: number;
  status: "available" | "soon";
  href?: string;
  download?: string;
  motif: "compass" | "grin" | "spark" | "eye" | "wave";
  /** Optional alternate cover treatment. "comic" = bold sunburst pop-comedy cover. */
  coverStyle?: "comic";
  /** Optional real cover artwork; when set it replaces the generated cover. */
  coverImage?: string;
  /** Each edition gets its own cover palette so the shelf reads as a series, not a clone. */
  accent: string;
  accentSoft: string;
  paper: string;
};

export const library: LibraryItem[] = [
  {
    slug: "social-intelligence-simplified",
    edition: "Edition No. 01",
    kind: "A Field Guide",
    title: "Social Intelligence, Simplified",
    subtitle: "Social intelligence, assessed",
    pillars: "Communication · Confidence · Humour · Human Behaviour",
    blurb:
      "A 20-statement self-assessment, the four-pillar framework, five everyday habits and a seven-day challenge — the companion to the video.",
    pages: 15,
    status: "available",
    href: "/guides/social-intelligence-simplified",
    download: assetUrl(guidePdf.url),
    coverImage: assetUrl(siCover.url),
    motif: "compass",
    accent: "oklch(0.52 0.15 38)",
    accentSoft: "oklch(0.78 0.09 45)",
    paper: "oklch(0.962 0.02 88)",
  },
  {
    slug: "i-am-officially-funny",
    edition: "Edition No. 02",
    kind: "An Interactive Workbook",
    title: "I Am Officially Funny",
    subtitle: "Ten modules, one comedy voice",
    pillars: "Humour · Writing · Delivery · Performance",
    blurb:
      "The complete interactive comedy workbook: comedy style profile, the daily writing habit, joke anatomy, banter drills, observation logs, delivery and a 90-day career plan.",
    pages: 41,
    status: "available",
    download: assetUrl(funnyPdf.url),
    motif: "grin",
    coverStyle: "comic",
    accent: "oklch(0.78 0.17 62)",
    accentSoft: "oklch(0.9 0.19 100)",
    paper: "oklch(0.8 0.16 66)",
  },
  {
    slug: "how-to-trust-yourself",
    edition: "Edition No. 03",
    kind: "A Companion Resource",
    title: "How To Trust Yourself",
    subtitle: "A 4 step framework",
    pillars: "Confidence · Self-Trust · Decision Making",
    blurb:
      "A companion resource on how to trust yourself — a four-step framework for rebuilding self-trust, keeping promises to yourself and deciding with less second-guessing.",
    status: "available",
    download: assetUrl(selfTrustPdf.url),
    coverImage: assetUrl(selfTrustCover.url),
    motif: "compass",
    accent: "oklch(0.5 0.12 45)",
    accentSoft: "oklch(0.72 0.1 50)",
    paper: "oklch(0.55 0.13 45)",
  },

  {
    slug: "reading-people",
    edition: "Edition No. 05",
    kind: "A Field Guide",
    title: "Reading People",
    subtitle: "The layer underneath the words",
    pillars: "Body Language · Tone · Micro-Signals",
    blurb:
      "What hands, feet and pacing reveal before anyone speaks — plus an observation log for training your eye over thirty days.",
    status: "soon",
    motif: "eye",
    accent: "oklch(0.52 0.13 235)",
    accentSoft: "oklch(0.78 0.09 230)",
    paper: "oklch(0.955 0.022 230)",
  },
  {
    slug: "conversation-lab",
    edition: "Edition No. 06",
    kind: "A Workbook",
    title: "The Conversation Lab",
    subtitle: "Openers, depth, and graceful exits",
    pillars: "Communication · Curiosity · Rapport",
    blurb:
      "Scripts, question ladders and repair moves for the three hardest moments: starting, going deeper, and leaving well.",
    status: "soon",
    motif: "wave",
    accent: "oklch(0.55 0.13 185)",
    accentSoft: "oklch(0.8 0.1 180)",
    paper: "oklch(0.955 0.025 180)",
  },
  {
    slug: "quiet-influence",
    edition: "Edition No. 07",
    kind: "A Field Guide",
    title: "Quiet Influence",
    subtitle: "Persuasion without pressure",
    pillars: "Leadership · Trust · Persuasion",
    blurb:
      "The research-backed levers behind cooperation — reciprocity, consistency, status — written for people who dislike selling.",
    status: "soon",
    motif: "compass",
    accent: "oklch(0.48 0.13 145)",
    accentSoft: "oklch(0.76 0.11 140)",
    paper: "oklch(0.955 0.028 135)",
  },
];
