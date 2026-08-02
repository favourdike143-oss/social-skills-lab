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
            <p className="label-mono text-rust">A Free Companion Library</p>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] font-bold uppercase leading-[0.92] tracking-tight">
              Social skills,
              <br />
              simplified.
            </h1>
            <div className="my-7 max-w-md dotted-rule" />
            <p className="max-w-lg text-[1.05rem] leading-relaxed text-muted-foreground">
              Short, interactive guides that turn the psychology and research behind
              communication, confidence, humour and human behaviour into something you can
              actually practise this week.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#library"
                className="label-mono border border-ink bg-ink px-7 py-4 text-primary-foreground transition-colors hover:border-rust hover:bg-rust"
              >
                Browse the library
              </a>
              <Link
                to="/guides/social-intelligence-simplified"
                className="label-mono border border-ink/40 px-7 py-4 transition-colors hover:border-rust hover:text-rust"
              >
                Take the assessment
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {["Communication", "Confidence", "Humour", "Human Behaviour"].map((p) => (
                <span key={p} className="label-mono text-ink/55">
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
            {library.map((item) => {
              const cover = (
                <>
                  <div
                    className={`field-frame ${item.status === "soon" ? "opacity-55 saturate-50" : ""}`}
                  >
                    <BookCover item={item} />
                  </div>
                  <div className="mt-7">
                    <p className="label-mono text-ink/45">
                      {item.edition} ·{" "}
                      {item.status === "available" ? (
                        <span className="text-rust">Available now</span>
                      ) : (
                        <span>Coming soon</span>
                      )}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.blurb}
                    </p>
                  </div>
                </>
              );

              return (
                <article key={item.slug} className="group">
                  {item.status === "available" && item.href ? (
                    <Link to={item.href} className="block">
                      {cover}
                      <span className="label-mono mt-4 inline-block border-b border-rust pb-1 text-rust">
                        Open the guide →
                      </span>
                    </Link>
                  ) : (
                    <div>
                      {cover}
                      <span className="label-mono mt-4 inline-block border-b border-ink/20 pb-1 text-ink/40">
                        In the field · Coming soon
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
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
