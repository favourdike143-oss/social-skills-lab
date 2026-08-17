import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pillarLabs } from "@/lib/pillars";
import { PillarLab } from "@/components/PillarLab";

export const Route = createFileRoute("/practice/$pillar")({
  loader: ({ params }) => {
    const lab = pillarLabs.find((l) => l.slug === params.pillar);
    if (!lab) throw notFound();
    return { slug: lab.slug, name: lab.name, tagline: lab.tagline, intro: lab.intro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Practice lab not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} Practice Lab — ${loaderData.tagline} | The Social Board`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.intro.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.intro.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: LabNotFound,
  component: LabPage,
});

function LabNotFound() {
  return (
    <div className="paper-grain flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-4xl font-bold uppercase">Lab not found</h1>
      <Link to="/practice" className="btn-solid">
        See all practice labs
      </Link>
    </div>
  );
}

function LabPage() {
  const { slug } = Route.useLoaderData();
  const lab = pillarLabs.find((l) => l.slug === slug)!;
  const others = pillarLabs.filter((l) => l.slug !== slug);

  return (
    <div className="paper-grain min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/practice" className="label-mono text-ink">
          ← All practice labs
        </Link>
        <span className="label-mono hidden text-ink/50 sm:block">The Social Board</span>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-14 pt-8">
        <p
          className="label-mono inline-block border-2 border-ink px-3 py-1.5 text-ink"
          style={{ background: lab.accentSoft }}
        >
          Pillar Lab · {lab.tagline}
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-tight">
          {lab.name}
        </h1>
        <div className="my-7 dotted-rule" />
        <p className="max-w-xl text-[1.05rem] leading-relaxed text-foreground/80">{lab.intro}</p>
      </section>

      <section className="border-t-2 border-ink">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <PillarLab lab={lab} />
        </div>
      </section>

      <section className="border-t-2 border-ink">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
            Practise another pillar
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/practice/$pillar"
                params={{ pillar: o.slug }}
                className="border-2 border-ink bg-card p-5 transition-transform hover:-translate-y-1"
                style={{ boxShadow: `6px 6px 0 ${o.accentSoft}` }}
              >
                <p className="font-display text-xl font-bold uppercase">{o.name}</p>
                <p className="mt-2 text-sm text-foreground/75">{o.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <p className="label-mono text-ink/50">The Social Board · @thesocialboardyt</p>
          <Link to="/" className="label-mono text-ink/50">
            Back to the library
          </Link>
        </div>
      </footer>
    </div>
  );
}
