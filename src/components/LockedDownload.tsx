import { useCallback, useRef, useState, type ReactNode } from "react";

declare global {
  interface Window {
    call_locker?: () => void;
    CPABuildOptions?: Record<string, unknown>;
    /** CPAGrip fires one of these globals when the offer is completed. */
    cpaSuccessCallback?: () => void;
    CPAGripSuccess?: () => void;
    lck?: boolean;
  }
}

/**
 * Triggers a real file download.
 * The PDFs are served from the same origin, so a plain anchor with `download`
 * saves the file straight to the device — no fetch, no blob, no lost user
 * gesture on iOS/Android.
 */
function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.target = "_self";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

type Props = {
  url: string;
  filename: string;
  className?: string;
  children: ReactNode;
};

export function LockedDownload({ url, filename, className, children }: Props) {
  const [showFallback, setShowFallback] = useState(false);
  const done = useRef(false);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const complete = () => {
        if (done.current) return;
        done.current = true;
        setShowFallback(false);
        triggerDownload(url, filename);
      };

      // CPAGrip looks for these hooks when the offer completes.
      window.cpaSuccessCallback = complete;
      window.CPAGripSuccess = complete;
      window.CPABuildOptions = {
        ...(window.CPABuildOptions ?? {}),
        callback: complete,
      };

      if (typeof window.call_locker === "function") {
        window.call_locker();
        // Safety net: if the locker never fires its callback (blocked, closed,
        // or a callback name we don't know), give the reader a direct link.
        window.setTimeout(() => {
          if (!done.current) setShowFallback(true);
        }, 6000);
      } else {
        // Locker script unavailable (blocked/offline) — don't strand the user.
        complete();
      }
    },
    [url, filename],
  );

  return (
    <span className="inline-flex flex-col gap-2">
      <a href={url} download={filename} className={className} onClick={onClick}>
        {children}
      </a>
      {showFallback && (
        <a
          href={url}
          download={filename}
          className="label-mono text-rust underline underline-offset-4"
          onClick={() => {
            done.current = true;
            setShowFallback(false);
          }}
        >
          Download didn't start? Tap here →
        </a>
      )}
    </span>
  );
}
