import type { CSSProperties } from "react";
import type { LibraryItem } from "@/lib/library";

function Motif({ kind }: { kind: LibraryItem["motif"] }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const };

  if (kind === "compass") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <circle cx="24" cy="24" r="13" {...common} />
        <circle cx="24" cy="24" r="9" {...common} strokeDasharray="1 3" className="cover-accent" />
        <path d="M24 15l3 9-3 9-3-9z" {...common} className="cover-accent" />
        <circle cx="24" cy="24" r="1.3" fill={stroke} stroke="none" />
        <path d="M24 6v5M24 37v5M6 24h5M37 24h5" {...common} />
      </svg>
    );
  }
  if (kind === "grin") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <circle cx="24" cy="24" r="13" {...common} />
        <path d="M16 26c2.6 4 13.4 4 16 0" {...common} className="cover-accent" />
        <path d="M18 19.5h2.5M27.5 19.5H30" {...common} />
      </svg>
    );
  }
  if (kind === "spark") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <path d="M24 8l3.4 10.6L38 22l-10.6 3.4L24 36l-3.4-10.6L10 22l10.6-3.4z" {...common} />
        <circle cx="24" cy="22" r="3" {...common} className="cover-accent" />
        <path d="M14 38l3-3M34 38l-3-3" {...common} className="cover-accent" />
      </svg>
    );
  }
  if (kind === "eye") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <path d="M8 24c5-7 11-10.5 16-10.5S35 17 40 24c-5 7-11 10.5-16 10.5S13 31 8 24z" {...common} />
        <circle cx="24" cy="24" r="4.5" {...common} className="cover-accent" />
        <circle cx="24" cy="24" r="1.2" fill={stroke} stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
      <path d="M6 20c4-5 8-5 12 0s8 5 12 0 8-5 12 0" {...common} />
      <path d="M6 28c4-5 8-5 12 0s8 5 12 0 8-5 12 0" {...common} className="cover-accent" />
    </svg>
  );
}

function ComicCover({ item }: { item: LibraryItem }) {
  const words = item.title.split(" ");
  const last = words.pop() ?? "";
  const lead = words.join(" ");

  return (
    <div
      className="relative aspect-[210/297] w-full overflow-hidden bg-[var(--cover-paper)] transition-transform duration-500 group-hover:-translate-y-1.5"
      style={{
        "--cover-paper": item.paper,
        "--cover-accent": item.accent,
        "--cover-pop": item.accentSoft,
      } as CSSProperties}
    >
      {/* sunburst rays */}
      <div
        className="absolute left-1/2 top-[38%] aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, color-mix(in oklab, white 26%, transparent) 0deg 5deg, transparent 5deg 12deg)",
        }}
      />
      <div className="relative flex h-full flex-col items-center px-[7%] py-[6%] text-center">
        <p className="font-display text-[clamp(0.5rem,1.5vw,0.9rem)] font-bold uppercase tracking-[0.22em] text-black/85">
          The Social Board
        </p>
        <h3 className="mt-[4%] w-full font-display font-bold uppercase italic leading-[0.85] tracking-tight">
          <span className="block text-[clamp(1.2rem,4.6vw,2.6rem)] text-black -rotate-2">
            {lead}
          </span>
          <span
            className="mt-[2%] block text-[clamp(1.7rem,6.6vw,3.6rem)] rotate-1"
            style={{
              color: "var(--cover-pop)",
              WebkitTextStroke: "1.5px black",
              paintOrder: "stroke fill",
            }}
          >
            {last}
          </span>
        </h3>

        {/* big grin */}
        <svg viewBox="0 0 100 70" className="my-auto w-[78%]" aria-hidden="true">
          <path
            d="M22 22c3-6 9-6 12 0M66 22c3-6 9-6 12 0"
            fill="none"
            stroke="black"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M18 36c6 22 58 22 64 0z"
            fill="white"
            stroke="black"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
        </svg>

        <div className="mt-auto w-full">
          <p className="bg-black px-2 py-[3%] font-display text-[clamp(0.5rem,1.35vw,0.8rem)] font-bold uppercase leading-tight text-white">
            {item.subtitle}
          </p>
          <p className="mt-[3%] font-display text-[clamp(0.5rem,1.25vw,0.78rem)] font-bold uppercase tracking-wide text-black/85">
            {item.pillars}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BookCover({ item }: { item: LibraryItem }) {
  const style = {
    "--cover-accent": item.accent,
    "--cover-accent-soft": item.accentSoft,
    "--cover-paper": item.paper,
  } as CSSProperties;
  if (item.coverImage)
    return (
      <div className="relative aspect-[210/297] w-full overflow-hidden bg-[var(--cover-paper)] transition-transform duration-500 group-hover:-translate-y-1.5" style={style}>
        <img
          src={item.coverImage}
          alt={`${item.title} — cover`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );

  if (item.coverStyle === "comic") return <ComicCover item={item} />;


  return (
    <div
      style={style}
      className="relative aspect-[210/297] w-full overflow-hidden transition-transform duration-500 group-hover:-translate-y-1.5"
    >
      {/* Per-edition colour field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, var(--cover-paper) 0%, color-mix(in oklab, var(--cover-accent-soft) 32%, var(--cover-paper)) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[6px]"
        style={{ background: "var(--cover-accent)" }}
      />
      <div
        className="absolute -right-10 -bottom-10 h-36 w-36 rounded-full opacity-25 blur-xl"
        style={{ background: "var(--cover-accent)" }}
      />
      <div
        className="absolute inset-[7px] corner-ticks border"
        style={{ borderColor: "color-mix(in oklab, var(--cover-accent) 45%, transparent)" }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-[10%] text-center">
        <p className="label-mono cover-accent">
          {item.kind} · {item.edition.replace("Edition ", "")}
        </p>
        <div className="mt-[8%] h-11 w-11 sm:h-14 sm:w-14">
          <Motif kind={item.motif} />
        </div>
        <h3 className="mt-[7%] font-display text-[clamp(1.05rem,2.2vw,1.7rem)] leading-[1.08] font-bold tracking-tight uppercase text-ink">
          {item.title}
        </h3>
        <div
          className="my-[6%] h-[2px] w-1/3"
          style={{ background: "var(--cover-accent)" }}
        />
        <p className="font-display text-[clamp(0.55rem,1vw,0.78rem)] font-bold uppercase tracking-wide text-ink/90">
          {item.pillars}
        </p>
        <p className="mt-[6%] text-[clamp(0.58rem,0.95vw,0.8rem)] font-medium leading-relaxed text-ink/70">
          {item.subtitle}
        </p>
        <p className="label-mono absolute bottom-[6%] left-0 right-0 text-[0.55rem] text-ink/55">
          The Social Board
        </p>
      </div>
    </div>
  );
}
