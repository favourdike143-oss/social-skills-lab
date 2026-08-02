import type { LibraryItem } from "@/lib/library";

function Motif({ kind }: { kind: LibraryItem["motif"] }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.2, strokeLinecap: "round" as const };

  if (kind === "compass") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <circle cx="24" cy="24" r="13" {...common} />
        <circle cx="24" cy="24" r="9" {...common} strokeDasharray="1 3" className="text-rust" />
        <path d="M24 15l3 9-3 9-3-9z" {...common} className="text-rust" />
        <circle cx="24" cy="24" r="1.3" fill={stroke} stroke="none" />
        <path d="M24 6v5M24 37v5M6 24h5M37 24h5" {...common} />
      </svg>
    );
  }
  if (kind === "grin") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <circle cx="24" cy="24" r="13" {...common} />
        <path d="M16 26c2.6 4 13.4 4 16 0" {...common} className="text-rust" />
        <path d="M18 19.5h2.5M27.5 19.5H30" {...common} />
      </svg>
    );
  }
  if (kind === "spark") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <path d="M24 8l3.4 10.6L38 22l-10.6 3.4L24 36l-3.4-10.6L10 22l10.6-3.4z" {...common} />
        <circle cx="24" cy="22" r="3" {...common} className="text-rust" />
        <path d="M14 38l3-3M34 38l-3-3" {...common} className="text-rust" />
      </svg>
    );
  }
  if (kind === "eye") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
        <path d="M8 24c5-7 11-10.5 16-10.5S35 17 40 24c-5 7-11 10.5-16 10.5S13 31 8 24z" {...common} />
        <circle cx="24" cy="24" r="4.5" {...common} className="text-rust" />
        <circle cx="24" cy="24" r="1.2" fill={stroke} stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full text-ink">
      <path d="M6 20c4-5 8-5 12 0s8 5 12 0 8-5 12 0" {...common} />
      <path d="M6 28c4-5 8-5 12 0s8 5 12 0 8-5 12 0" {...common} className="text-rust" />
    </svg>
  );
}

export function BookCover({ item }: { item: LibraryItem }) {
  return (
    <div className="relative aspect-[210/297] w-full overflow-hidden bg-paper transition-transform duration-500 group-hover:-translate-y-1.5">
      <div className="absolute inset-[6px] corner-ticks border border-ink/40" />
      <div className="relative flex h-full flex-col items-center justify-center px-[10%] text-center">
        <p className="label-mono text-rust">
          {item.kind} · {item.edition.replace("Edition ", "")}
        </p>
        <div className="mt-[8%] h-10 w-10 sm:h-12 sm:w-12">
          <Motif kind={item.motif} />
        </div>
        <h3 className="mt-[7%] font-display text-[clamp(1rem,2.1vw,1.6rem)] leading-[1.08] font-bold tracking-tight uppercase text-ink">
          {item.title}
        </h3>
        <div className="my-[6%] w-2/3 dotted-rule" />
        <p className="font-display text-[clamp(0.5rem,0.95vw,0.72rem)] font-semibold uppercase tracking-wide text-ink/85">
          {item.pillars}
        </p>
        <p className="mt-[6%] text-[clamp(0.5rem,0.85vw,0.7rem)] leading-relaxed text-muted-foreground">
          {item.subtitle}
        </p>
        <p className="label-mono absolute bottom-[7%] left-0 right-0 text-[0.5rem] text-ink/50">
          The Social Board
        </p>
      </div>
    </div>
  );
}
