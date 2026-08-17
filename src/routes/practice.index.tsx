import { createFileRoute, Link } from "@tanstack/react-router";
import { pillarLabs } from "@/lib/pillars";

export const Route = createFileRoute("/practice/")({
  head: () => ({
    meta: [
      { title: "Practice Labs — Train Each Social Pillar | The Social Board" },
      {
        name: "description",
        content:
          "Four interactive labs — communication, confidence, humour and human behaviour. Rate your habits, write real answers, score yourself and get weekly reps.",
      },
      { property: "og:title", content: "Practice Labs — Train Each Social Pillar" },
      {
        property: "og:description",
        content:
          "Dedicated interactive sections for each social pillar: self-assessment, written drills and scored feedback.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticeIndex,
});

function PracticeIndex() {
  return (
    <div className="paper-grain min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="label-mono text-ink">
          ← The Library
        </Link>
        <span className="label-mono hidden text-ink/50 sm:block">Practice Labs</span>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-8">
        <p className="label-mono inline-block border-2 border-ink bg-marigold px-3 py-1.5 text-ink">
          Interactive · Free · No email
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.3rem,6vw,4.2rem)] font-bold uppercase leading-[0.95] tracking-tight">
          One lab for <span className="text-rust">each</span> social pillar.
        </h1>
        <div className="my-7 max-w-md dotted-rule" />
        <p className="max-w-xl text-[1.05rem] leading-relaxed text-foreground/80">
          The field guide gives you an overall reading. These labs go deeper — one pillar at a
          time. Rate your habits, write your actual answers to real scenarios, score them against
          clear criteria, then take four reps into the week.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {pillarLabs.map((lab, i) => (
            <article
              key={lab.slug}
              className="flex flex-col border-2 border-ink bg-card p-7"
              style={{ boxShadow: `8px 8px 0 ${lab.accentSoft}` }}
            >
              <p className="label-mono" style={{ color: lab.accent }}>
                {String(i + 1).padStart(2, "0")} · {lab.tagline}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight">
                {lab.name}
              </h2>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-foreground/80">
                {lab.intro}
              </p>
              <p className="label-mono mt-5 text-ink/55">
                {lab.statements.length} statements · {lab.drills.length} written drills ·{" "}
                {lab.reps.length} reps
              </p>
              <div className="mt-5">
                <Link to="/practice/$pillar" params={{ pillar: lab.slug }} className="btn-solid">
                  START QUESTIONNAIRE →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <p className="label-mono text-ink/50">The Social Board · @thesocialboardyt</p>
          <p className="label-mono text-ink/50">Free companion resources</p>
        </div>
      </footer>
    </div>
  );
}
