import { createFileRoute, Link } from "@tanstack/react-router";
import { library } from "@/lib/library";
import { pillarLabs } from "@/lib/pillars";
import { BookCover } from "@/components/BookCover";
import { LockedDownload } from "@/components/LockedDownload";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Social Board Library — Free Social Skills Field Guides" },
      {
        name: "description",
        content:
          "A free library of interactive field guides and workbooks on social intelligence, humour, confidence and reading people — from The Social Board.",
      },
      { property: "og:title", content: "The Social Board Library" },
      {
        property: "og:description",
        content:
          "Free interactive field guides that turn social intelligence research into daily practice.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const available = library.filter((i) => i.status === "available");

  return (
    <div className="paper-grain min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <Link to="/" className="label-mono text-ink">
          The Social Board
        </Link>
        <span className="label-mono hidden text-ink/50 sm:block">The Library · Free Resources</span>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="max-w-3xl">
          <div>
            <p className="label-mono inline-block border-2 border-ink bg-marigold px-3 py-1.5 text-ink">
              A Free Companion Library
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6.4vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-tight">
              <span className="text-rust">Practice,</span>{" "}
              <span className="text-teal">assess</span>
              <br />
              and <span className="text-violet">improve</span>
              <br />
              your social skills.
            </h1>
            <div className="my-7 max-w-md dotted-rule" />
            <p className="max-w-lg text-[1.08rem] leading-relaxed text-foreground/80">
              Short, interactive guides that turn the psychology and research behind
              communication, confidence, humour and human behaviour into something you can
              actually practise this week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#library" className="btn-bright justify-center">
                Browse the library
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2 sm:mt-12 sm:gap-2.5">
              {[
                ["Communication", "bg-teal-soft"],
                ["Confidence", "bg-marigold"],
                ["Humour", "bg-rust-soft"],
                ["Human Behaviour", "bg-paper-deep"],
              ].map(([p, bg]) => (
                <span
                  key={p}
                  className={`label-mono border-2 border-ink px-3 py-1.5 text-ink ${bg}`}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="labs" className="border-t-2 border-ink">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="label-mono text-rust">Practice Labs</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            Practice one social skill at a time
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-foreground/80">
            Dedicated interactive sections for each social skill — rate your habits, write your
            own answers to real scenarios, score them against clear criteria, then take four reps
            into your week.
          </p>
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {pillarLabs.map((lab) => (
              <Link
                key={lab.slug}
                to="/practice/$pillar"
                params={{ pillar: lab.slug }}
                className="flex flex-col border-2 border-ink bg-card p-6 transition-transform hover:-translate-y-1"
                style={{ boxShadow: `8px 8px 0 ${lab.accentSoft}` }}
              >
                <h3 className="font-display text-2xl font-bold uppercase leading-tight">
                  {lab.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">
                  {lab.tagline}
                </p>
                <p className="label-mono mt-4 text-ink/55">
                  {lab.statements.length} statements · {lab.drills.length} written drills
                </p>
                <span className="label-mono mt-4" style={{ color: lab.accent }}>
                  START QUESTIONNAIRE →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section id="library" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-mono text-rust">The Shelf</p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                Guides & Workbooks
              </h2>
            </div>
            <p className="label-mono text-ink/50">
              {available.length} available · {library.length - available.length} coming soon
            </p>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
            {library.map((item) => (
              <article key={item.slug} className="group flex flex-col">
                <div
                  className={`field-frame ${item.status === "soon" ? "opacity-70 saturate-[0.75]" : ""}`}
                >
                  <BookCover item={item} />
                </div>
                <div className="mt-7 flex flex-1 flex-col">
                  <p className="label-mono text-ink/60">
                    {item.edition} ·{" "}
                    {item.status === "available" ? (
                      <span style={{ color: item.accent }}>Available now</span>
                    ) : (
                      <span>Coming soon</span>
                    )}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-foreground/75">
                    {item.blurb}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {item.href && (
                      <Link to={item.href} className="btn-solid justify-center">
                        Open the guide →
                      </Link>
                    )}
                    {item.download && (
                      <LockedDownload
                        url={item.download}
                        filename={`${item.slug}.pdf`}
                        className={`justify-center ${item.href ? "btn-outline" : "btn-solid"}`}
                      >
                        Download PDF
                      </LockedDownload>
                    )}
                    {item.status === "soon" && <span className="btn-muted justify-center">Coming soon</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 sm:px-6 sm:py-10">
          <p className="label-mono text-ink/50">The Social Board · @thesocialboardyt</p>
          <p className="label-mono text-ink/50">Free companion resources</p>
        </div>
      </footer>
    </div>
  );
}
