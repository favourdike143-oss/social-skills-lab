import { useEffect, useMemo, useState } from "react";
import type { PillarLab as PillarLabData } from "@/lib/pillars";
import { scaleLabels } from "@/lib/pillars";

type Saved = {
  ratings: Record<number, number>;
  answers: Record<number, string>;
  checks: Record<string, boolean>;
};

const empty: Saved = { ratings: {}, answers: {}, checks: {} };

export function PillarLab({ lab }: { lab: PillarLabData }) {
  const storageKey = `tsb-lab-${lab.slug}`;
  const [state, setState] = useState<Saved>(empty);
  const [revealed, setRevealed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setState({ ...empty, ...(JSON.parse(raw) as Saved) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, storageKey, hydrated]);

  const totalCriteria = lab.drills.reduce((n, d) => n + d.criteria.length, 0);
  const maxRaw = lab.statements.length * 5 + totalCriteria;

  const result = useMemo(() => {
    const rated = Object.keys(state.ratings).length;
    const ratingScore = Object.values(state.ratings).reduce((n, v) => n + v, 0);
    const checkScore = Object.values(state.checks).filter(Boolean).length;
    const written = lab.drills.filter((_, i) => (state.answers[i] ?? "").trim().length > 20).length;
    const score = Math.round(((ratingScore + checkScore) / maxRaw) * 100);
    const band = lab.bands.find((b) => score <= b.max) ?? lab.bands[lab.bands.length - 1]!;
    return { rated, written, score, band, ratingScore, checkScore };
  }, [state, lab, maxRaw]);

  const complete =
    result.rated === lab.statements.length && result.written === lab.drills.length;

  const style = {
    "--lab-accent": lab.accent,
    "--lab-soft": lab.accentSoft,
  } as React.CSSProperties;

  return (
    <div style={style}>
      <div className="sticky top-0 z-20 -mx-4 mb-12 border-b-2 border-ink bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label-mono text-ink/60">{lab.name} Lab</span>
          <span className="label-mono" style={{ color: lab.accent }}>
            {result.rated}/{lab.statements.length} rated · {result.written}/{lab.drills.length}{" "}
            written
          </span>
        </div>
        <div className="mt-2 h-[5px] w-full border border-ink/15 bg-ink/8">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${Math.round(
                ((result.rated + result.written) /
                  (lab.statements.length + lab.drills.length)) *
                  100,
              )}%`,
              background: lab.accent,
            }}
          />
        </div>
      </div>

      {/* Part 1 — rate yourself */}
      <section>
        <p className="label-mono" style={{ color: lab.accent }}>
          Step One
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight">
          Rate Your Habits
        </h3>
        <p className="mt-2 max-w-xl text-sm text-foreground/75">
          Score how you behave <em>most</em> of the time — not on your best day.
        </p>

        <ul className="mt-8 space-y-4">
          {lab.statements.map((statement, i) => {
            const value = state.ratings[i];
            return (
              <li key={statement} className="border-2 border-ink bg-card p-4 sm:p-5">
                <div className="flex gap-3">
                  <span className="label-mono mt-1 text-ink/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.98rem] leading-snug">{statement}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {scaleLabels.map((label, n) => {
                    const active = value === n;
                    return (
                      <button
                        key={label}
                        type="button"
                        aria-label={`${label} (${n})`}
                        aria-pressed={active}
                        onClick={() =>
                          setState((s) => ({ ...s, ratings: { ...s.ratings, [i]: n } }))
                        }
                        className="flex min-w-[3.1rem] flex-1 flex-col items-center gap-0.5 border-2 px-1 py-2 transition-colors"
                        style={
                          active
                            ? {
                                background: lab.accent,
                                borderColor: "var(--ink)",
                                color: "white",
                              }
                            : { borderColor: "var(--border)" }
                        }
                      >
                        <span className="font-display text-base font-bold leading-none">{n}</span>
                        <span className="label-mono text-[0.5rem] leading-none opacity-80">
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
      </section>

      {/* Part 2 — written drills */}
      <section className="mt-16">
        <p className="label-mono" style={{ color: lab.accent }}>
          Step Two
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight">
          Write It Out
        </h3>
        <p className="mt-2 max-w-xl text-sm text-foreground/75">
          Type your real answers. Then score yourself honestly against the criteria — each box you
          can truthfully tick is a point.
        </p>

        <div className="mt-8 space-y-8">
          {lab.drills.map((drill, i) => {
            const answer = state.answers[i] ?? "";
            const words = answer.trim() ? answer.trim().split(/\s+/).length : 0;
            return (
              <article
                key={drill.title}
                className="border-2 border-ink bg-card p-5 sm:p-7"
                style={{ boxShadow: `6px 6px 0 ${lab.accentSoft}` }}
              >
                <p className="label-mono text-ink/45">Drill {String(i + 1).padStart(2, "0")}</p>
                <h4 className="mt-2 font-display text-xl font-bold uppercase tracking-tight">
                  {drill.title}
                </h4>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">
                  {drill.prompt}
                </p>

                <textarea
                  value={answer}
                  onChange={(e) =>
                    setState((s) => ({ ...s, answers: { ...s.answers, [i]: e.target.value } }))
                  }
                  placeholder={drill.placeholder}
                  rows={4}
                  className="mt-4 w-full resize-y border-2 border-ink bg-background p-3 text-[0.95rem] leading-relaxed outline-none focus:ring-2"
                  style={{ boxShadow: "inset 0 0 0 0" }}
                />
                <p className="label-mono mt-1 text-right text-ink/45">{words} words</p>

                <div className="mt-4 dotted-rule pt-4">
                  <p className="label-mono text-ink/60">Score your answer</p>
                  <ul className="mt-3 space-y-2">
                    {drill.criteria.map((c, ci) => {
                      const key = `${i}-${ci}`;
                      const on = !!state.checks[key];
                      return (
                        <li key={c}>
                          <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug">
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() =>
                                setState((s) => ({
                                  ...s,
                                  checks: { ...s.checks, [key]: !on },
                                }))
                              }
                              className="mt-0.5 h-4 w-4 shrink-0 appearance-none border-2 border-ink"
                              style={on ? { background: lab.accent } : undefined}
                            />
                            <span className={on ? "" : "text-foreground/75"}>{c}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Part 3 — reps */}
      <section className="mt-16">
        <p className="label-mono" style={{ color: lab.accent }}>
          Step Three
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight">
          This Week's Reps
        </h3>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {lab.reps.map((rep, i) => (
            <li key={rep} className="flex gap-3 border-2 border-ink bg-card p-4">
              <span className="font-display text-xl font-bold" style={{ color: lab.accent }}>
                {i + 1}
              </span>
              <span className="text-sm leading-snug">{rep}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Result */}
      <div className="mt-14 border-t-2 border-ink pt-10">
        {!revealed ? (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setRevealed(true)}
              disabled={!complete}
              className="btn-solid disabled:cursor-not-allowed disabled:opacity-40"
            >
              Score my {lab.name.toLowerCase()} lab
            </button>
            {!complete && (
              <p className="mt-3 text-xs text-foreground/70">
                Rate every statement and write an answer for each drill to unlock your score.
              </p>
            )}
          </div>
        ) : (
          <div
            className="field-frame corner-ticks bg-card p-8 text-center sm:p-12"
            style={{ background: lab.accentSoft }}
          >
            <p className="label-mono text-ink/70">{lab.name} Result</p>
            <p className="mt-6 font-display text-6xl font-bold leading-none sm:text-7xl">
              {result.score}
              <span className="text-2xl text-ink/45"> / 100</span>
            </p>
            <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              {result.band.name}
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/80">
              {result.band.copy}
            </p>
            <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-3">
              <div className="border-2 border-ink bg-background p-3">
                <p className="font-display text-2xl font-bold">
                  {result.ratingScore}
                  <span className="text-sm text-ink/45">/{lab.statements.length * 5}</span>
                </p>
                <p className="label-mono mt-1 text-[0.5rem] text-ink/60">Habits</p>
              </div>
              <div className="border-2 border-ink bg-background p-3">
                <p className="font-display text-2xl font-bold">
                  {result.checkScore}
                  <span className="text-sm text-ink/45">/{totalCriteria}</span>
                </p>
                <p className="label-mono mt-1 text-[0.5rem] text-ink/60">Written craft</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-outline"
              >
                Print / save my answers
              </button>
              <button
                type="button"
                onClick={() => {
                  setState(empty);
                  setRevealed(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn-muted"
              >
                Reset this lab
              </button>
            </div>
          </div>
        )}
        <p className="label-mono mt-6 text-center text-ink/45">
          Your answers save automatically in this browser.
        </p>
      </div>
    </div>
  );
}
