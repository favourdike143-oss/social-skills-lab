import { createFileRoute, Link } from "@tanstack/react-router";
import { library } from "@/lib/library";
import { BookCover } from "@/components/BookCover";
import { Assessment } from "@/components/Assessment";
import { LockedDownload } from "@/components/LockedDownload";

const item = library[0]!;

export const Route = createFileRoute("/guides/social-intelligence-simplified")({
  head: () => ({
    meta: [
      { title: "Social Intelligence, Simplified — Free Field Guide | The Social Board" },
      {
        name: "description",
        content:
          "Take the 20-statement social intelligence self-assessment, earn your badge, and download the free field guide from The Social Board.",
      },
      { property: "og:title", content: "Social Intelligence, Simplified — Free Field Guide" },
      {
        property: "og:description",
        content:
          "A 20-statement assessment, the four-pillar framework, five habits and a seven-day challenge.",
      },
    ],
  }),
  component: GuidePage,
});

const pillars = [
  {
    name: "Communication",
    body: "How you express yourself — not just what you say, but whether it lands the way you intended.",
    tip: "Ask “did that make sense?” more often than feels natural.",
  },
  {
    name: "Confidence",
    body: "How you carry yourself, and how steady you stay when a room turns unfamiliar.",
    tip: "Let a silence run two seconds longer than is comfortable.",
  },
  {
    name: "Humour",
    body: "Lightness used to close distance rather than create it — timing over material.",
    tip: "Read the room first; drop the joke if the timing's off.",
  },
  {
    name: "Human Behaviour",
    body: "The layer underneath the words — body language, tone, timing — that tells you what someone actually means.",
    tip: "Watch hands and feet; they're more honest than faces.",
  },
];

const habits = [
  "Listen to understand, not to reply.",
  "Watch people's reactions, not just their words.",
  "Match the emotional tone of the room.",
  "Get comfortable with short silences.",
  "Ask one more question than usual.",
];

const challenge = [
  ["Only ask questions", "One full conversation using nothing but genuine questions."],
  ["Pay attention to body language", "Watch hands, feet and posture. Say nothing — just notice."],
  ["Practise active listening", "Reflect back what you heard before adding your own point."],
  ["Notice humour connecting", "Catch the moment a shared laugh visibly relaxes a room."],
  ["Avoid interrupting", "Even when you know where the sentence is going, let it get there."],
  ["Reflect on one conversation", "What went well? What would you adjust next time?"],
  ["Repeat your favourite habit", "Do the one that felt most natural — on purpose, once more."],
];

function GuidePage() {
  return (
    <div className="paper-grain min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="label-mono text-ink">
          ← The Library
        </Link>
        <span className="label-mono hidden text-ink/50 sm:block">{item.edition}</span>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="mx-auto w-full max-w-[15rem] md:max-w-none">
            <div className="field-frame">
              <BookCover item={item} />
            </div>
          </div>
          <div>
            <p className="label-mono text-rust">
              {item.kind} · {item.edition}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,5.2vw,3.6rem)] font-bold uppercase leading-[0.95] tracking-tight">
              {item.title}
            </h1>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{item.blurb}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LockedDownload
                url={item.download!}
                filename={`${item.slug}.pdf`}
                className="btn-solid justify-center"
              >
                Download the PDF · Free
              </LockedDownload>
              <a
                href="#assessment"
                className="btn-outline justify-center"
              >
                Take it online
              </a>
            </div>
            <p className="label-mono mt-5 text-ink/45">
              {item.pages} pages · Print-friendly · No email required
            </p>
          </div>
        </div>
      </section>

      <section id="assessment" className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="label-mono text-rust">Part One</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            The Self-Assessment
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Twenty statements, five for each pillar. Score how you behave <em>most</em> of the
            time — not on your best day. An accurate reading is far more useful than a
            flattering one.
          </p>
          <div className="mt-12">
            <Assessment />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="label-mono text-rust">Part Two</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            The Four Pillars
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Four instruments, one compass. Communication and confidence work outward. Humour and
            human behaviour work inward. You need all four.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <article key={p.name} className="border border-border bg-card p-7">
                <p className="label-mono text-ink/40">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <p className="mt-5 dotted-rule pt-4 text-sm text-rust">Field tip → {p.tip}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="label-mono text-rust">Part Three</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight">
              Five Everyday Habits
            </h2>
            <ul className="mt-8 space-y-4">
              {habits.map((h, i) => (
                <li key={h} className="flex gap-4 border-b border-border pb-4">
                  <span className="label-mono mt-1 text-rust">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono text-rust">Part Four</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight">
              The 7-Day Challenge
            </h2>
            <ol className="mt-8 space-y-3">
              {challenge.map(([title, body], i) => (
                <li key={title} className="border border-border bg-card p-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-xl font-bold text-rust">{i + 1}</span>
                    <div>
                      <p className="font-display text-base font-bold">{title}</p>
                      <p className="mt-1 text-sm leading-snug text-muted-foreground">{body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <p className="label-mono text-rust">Before You Go</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            Keep Exploring
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
            You don't need all four pillars perfected. You need to know which one to reach for,
            and when. Come back in 30 days and re-take the assessment.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <LockedDownload
              url={item.download!}
              filename={`${item.slug}.pdf`}
              className="btn-solid"
            >
              Download the field guide
            </LockedDownload>
            <Link
              to="/"
              className="btn-outline"
            >
              Back to the library
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <p className="label-mono text-ink/50">The Social Board · @thesocialboardyt</p>
          <p className="label-mono text-ink/50">Free companion resource</p>
        </div>
      </footer>
    </div>
  );
}
