import { useMemo, useState } from "react";

type Pillar = "Communication" | "Confidence" | "Humour" | "Human Behaviour";

const sections: { key: "A" | "B" | "C" | "D"; pillar: Pillar; note: string; items: string[] }[] = [
  {
    key: "A",
    pillar: "Communication",
    note: "How you express yourself, and how well that expression lands.",
    items: [
      "I notice when someone is waiting for a chance to speak.",
      "I let people finish their thought before I respond.",
      "I adjust my tone and language depending on who I'm speaking with.",
      "I check that the other person understood what I meant, not just what I said.",
      "People tell me I explain things clearly, even when the topic is complicated.",
    ],
  },
  {
    key: "B",
    pillar: "Confidence",
    note: "How you carry yourself, and how steady you stay under mild social pressure.",
    items: [
      "I can enter a room of strangers without needing someone else to lead the way.",
      "I say what I actually think, even when I expect some pushback.",
      "I recover quickly from an awkward moment instead of replaying it for hours.",
      "My posture, eye contact and tone match how confident I want to seem.",
      "I can sit with silence in a conversation without rushing to fill it.",
    ],
  },
  {
    key: "C",
    pillar: "Humour",
    note: "How you use lightness to build connection, rather than distance.",
    items: [
      "I can recognise sarcasm or a joke, even when it's subtle.",
      "I use humour to ease tension rather than to deflect or one-up someone.",
      "I can laugh at myself without it feeling forced.",
      "I read the room before making a joke, and let it go if the timing's off.",
      "My humour tends to bring people closer rather than put anyone down.",
    ],
  },
  {
    key: "D",
    pillar: "Human Behaviour",
    note: "How well you read what other people don't say out loud.",
    items: [
      "I can tell when someone is uncomfortable, even if they don't say so.",
      "I notice shifts in someone's energy or mood during a conversation.",
      "I consider what might be driving someone's behaviour before I judge it.",
      "People usually seem to feel heard after talking with me.",
      "I pick up on unspoken group dynamics — who's close, who's tense, who's left out.",
    ],
  },
];

const scale = ["Never", "Rarely", "Sometimes", "Fairly often", "Often", "Always"];

const badges = [
  {
    max: 25,
    name: "Social Explorer",
    copy: "You're just starting to map this terrain. Most interactions still feel like guesswork — which means small, deliberate practice will show up fast.",
  },
  {
    max: 50,
    name: "Social Navigator",
    copy: "You read situations reasonably well and recover from most of them. Consistency is the next frontier: doing on an ordinary day what you already do on a good one.",
  },
  {
    max: 75,
    name: "Social Cartographer",
    copy: "You notice things other people walk past, and it shows in how people respond to you. Focus your practice on your lowest pillar — it's the one holding the rest back.",
  },
  {
    max: 100,
    name: "Social Compass",
    copy: "You move through social terrain with instinct rather than effort. Your work now is depth: sharper listening, braver honesty, and helping others find their footing.",
  },
];

export function Assessment() {
  const total = sections.reduce((n, s) => n + s.items.length, 0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / total) * 100);

  const result = useMemo(() => {
    const subtotals = sections.map((s) => ({
      pillar: s.pillar,
      key: s.key,
      score: s.items.reduce((n, _, i) => n + (answers[`${s.key}${i}`] ?? 0), 0),
    }));
    const score = subtotals.reduce((n, s) => n + s.score, 0);
    const sorted = [...subtotals].sort((a, b) => b.score - a.score);
    const badge = (badges.find((b) => score <= b.max) ?? badges[badges.length - 1])!;
    return {
      subtotals,
      score,
      badge,
      strongest: sorted[0]!,
      growth: sorted[sorted.length - 1]!,
    };
  }, [answers]);

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-4 mb-10 bg-background/92 px-4 py-3 backdrop-blur">
        <div className="flex items-baseline justify-between">
          <span className="label-mono text-ink/60">Progress</span>
          <span className="label-mono text-rust">
            {answered} / {total}
          </span>
        </div>
        <div className="mt-2 h-[3px] w-full bg-ink/12">
          <div
            className="h-full bg-rust transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-14">
        {sections.map((section, si) => (
          <section key={section.key}>
            <p className="label-mono text-rust">Section {section.key}</p>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              {section.pillar}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{section.note}</p>

            <ul className="mt-7 space-y-5">
              {section.items.map((statement, i) => {
                const id = `${section.key}${i}`;
                const value = answers[id];
                return (
                  <li key={id} className="border border-border bg-card p-4 sm:p-5">
                    <div className="flex gap-3">
                      <span className="label-mono mt-1 text-ink/45">
                        {String(si * 5 + i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[0.95rem] leading-snug">{statement}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {scale.map((label, n) => {
                        const active = value === n;
                        return (
                          <button
                            key={n}
                            type="button"
                            aria-label={`${label} (${n})`}
                            aria-pressed={active}
                            onClick={() => setAnswers((a) => ({ ...a, [id]: n }))}
                            className={`group flex min-w-[3.1rem] flex-1 flex-col items-center gap-0.5 border px-1 py-2 transition-colors ${
                              active
                                ? "border-rust bg-rust text-accent-foreground"
                                : "border-border bg-background hover:border-rust/60 hover:bg-secondary"
                            }`}
                          >
                            <span className="font-display text-base font-bold leading-none">{n}</span>
                            <span className="label-mono text-[0.5rem] leading-none opacity-75">
                              {label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="label-mono mt-4 text-right text-ink/60">
              Subtotal {section.key} — {result.subtotals[si]!.score} / 25
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        {!submitted ? (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={answered < total}
              className="label-mono border border-ink bg-ink px-8 py-4 text-primary-foreground transition-colors hover:bg-rust hover:border-rust disabled:cursor-not-allowed disabled:opacity-35"
            >
              Reveal my badge
            </button>
            {answered < total && (
              <p className="mt-3 text-xs text-muted-foreground">
                {total - answered} statement{total - answered === 1 ? "" : "s"} left to score.
              </p>
            )}
          </div>
        ) : (
          <div className="field-frame corner-ticks bg-card p-8 text-center sm:p-12">
            <p className="label-mono text-rust">Your Results</p>
            <p className="mt-6 font-display text-6xl font-bold leading-none sm:text-7xl">
              {result.score}
              <span className="text-2xl text-ink/40"> / 100</span>
            </p>
            <h3 className="mt-5 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              {result.badge.name}
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {result.badge.copy}
            </p>

            <div className="mx-auto mt-9 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {result.subtotals.map((s) => (
                <div key={s.key} className="border border-border bg-background p-3">
                  <p className="font-display text-2xl font-bold">{s.score}</p>
                  <p className="label-mono mt-1 text-[0.5rem] text-ink/55">{s.pillar}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 dotted-rule pt-6 text-sm">
              <p>
                Strongest pillar —{" "}
                <span className="font-display font-bold uppercase">{result.strongest.pillar}</span>
              </p>
              <p className="mt-1">
                Growth edge —{" "}
                <span className="font-display font-bold uppercase text-rust">
                  {result.growth.pillar}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="label-mono mt-8 border border-ink/40 px-6 py-3 transition-colors hover:border-rust hover:text-rust"
            >
              Retake the assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
