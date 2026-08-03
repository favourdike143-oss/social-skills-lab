import { createFileRoute, Link } from "@tanstack/react-router";
import { library } from "@/lib/library";
import { BookCover } from "@/components/BookCover";

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
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="label-mono text-ink">
          The Social Board
        </Link>
        <span className="label-mono hidden text-ink/50 sm:block">The Library · Free Resources</span>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="label-mono inline-block border-2 border-ink bg-marigold px-3 py-1.5 text-ink">
              A Free Companion Library
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6.4vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-tight">
              Social skills,
              <br />
              <span className="text-rust">practiced,</span>{" "}
              <span className="text-teal">assessed,</span>
              <br />
              and <span className="text-violet">improved</span>.
            </h1>
            <div className="my-7 max-w-md dotted-rule" />
            <p className="max-w-lg text-[1.08rem] leading-relaxed text-foreground/80">
              Short, interactive guides that turn the psychology and research behind
              communication, confidence, humour and human behaviour into something you can
              actually practise this week.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#library" className="btn-solid">
                Browse the library
              </a>
              <Link to="/guides/social-intelligence-simplified" className="btn-outline">
                Take the assessment
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-2.5">
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

          <div className="mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="field-frame">
              {available[0] && <BookCover item={available[0]} />}
            </div>
          </div>
        </div>
      </section>


      <section id="library" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
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

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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

                  <div className="mt-5 flex flex-wrap gap-3">
                    {item.href && (
                      <Link to={item.href} className="btn-solid">
                        Open the guide →
                      </Link>
                    )}
                    {item.download && (
                      <a href={item.download} download className={item.href ? "btn-outline" : "btn-solid"}>
                        Download PDF
                      </a>
                    )}
                    {item.status === "soon" && <span className="btn-muted">Coming soon</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <p className="label-mono text-ink/50">The Social Board · @thesocialboardyt</p>
          <p className="label-mono text-ink/50">Free companion resources</p>
        </div>
      </footer>
    </div>
  );
}
