import guidePdf from "@/assets/si-field-guide.pdf.asset.json";

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
};

export const library: LibraryItem[] = [
  {
    slug: "social-intelligence-simplified",
    edition: "Edition No. 01",
    kind: "A Field Guide",
    title: "Social Intelligence, Simplified",
    subtitle: "Map your own social instincts",
    pillars: "Communication · Confidence · Humour · Human Behaviour",
    blurb:
      "A 20-statement self-assessment, the four-pillar framework, five everyday habits and a seven-day challenge — the companion to the video.",
    pages: 15,
    status: "available",
    href: "/guides/social-intelligence-simplified",
    download: guidePdf.url,
    motif: "compass",
  },
  {
    slug: "how-to-be-funny",
    edition: "Edition No. 02",
    kind: "A Workbook",
    title: "How To Be Funny",
    subtitle: "Timing, tension and the turn",
    pillars: "Humour · Timing · Delivery",
    blurb:
      "The mechanics behind why something lands — misdirection, callbacks, self-deprecation — broken into drills you can run in real conversations.",
    status: "soon",
    motif: "grin",
  },
  {
    slug: "humour-field-guide",
    edition: "Edition No. 03",
    kind: "A Field Guide",
    title: "The Humour Field Guide",
    subtitle: "Lightness that connects, not distances",
    pillars: "Play · Warmth · Reading The Room",
    blurb:
      "Field notes on the six comic registers, when each one belongs, and how shared laughter quietly rewires a group's dynamic.",
    status: "soon",
    motif: "spark",
  },
  {
    slug: "reading-people",
    edition: "Edition No. 04",
    kind: "A Field Guide",
    title: "Reading People",
    subtitle: "The layer underneath the words",
    pillars: "Body Language · Tone · Micro-Signals",
    blurb:
      "What hands, feet and pacing reveal before anyone speaks — plus an observation log for training your eye over thirty days.",
    status: "soon",
    motif: "eye",
  },
  {
    slug: "conversation-lab",
    edition: "Edition No. 05",
    kind: "A Workbook",
    title: "The Conversation Lab",
    subtitle: "Openers, depth, and graceful exits",
    pillars: "Communication · Curiosity · Rapport",
    blurb:
      "Scripts, question ladders and repair moves for the three hardest moments: starting, going deeper, and leaving well.",
    status: "soon",
    motif: "wave",
  },
  {
    slug: "quiet-influence",
    edition: "Edition No. 06",
    kind: "A Field Guide",
    title: "Quiet Influence",
    subtitle: "Persuasion without pressure",
    pillars: "Leadership · Trust · Persuasion",
    blurb:
      "The research-backed levers behind cooperation — reciprocity, consistency, status — written for people who dislike selling.",
    status: "soon",
    motif: "compass",
  },
];
