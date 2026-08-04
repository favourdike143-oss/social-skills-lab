import { useCallback, type ReactNode } from "react";

declare global {
  interface Window {
    call_locker?: () => void;
    CPABuildOptions?: Record<string, unknown>;
    /** CPAGrip fires this global when the offer is completed. */
    cpaSuccessCallback?: () => void;
  }
}

/** Downloads the file to the browser without navigating away. */
async function forceDownload(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error(String(res.status));
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);
  } catch {
    // Fallback: same-tab anchor download (still no visible redirect for PDFs on CDN)
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

type Props = {
  url: string;
  filename: string;
  className?: string;
  children: ReactNode;
};

export function LockedDownload({ url, filename, className, children }: Props) {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const complete = () => {
        void forceDownload(url, filename);
      };

      // CPAGrip looks for these hooks when the offer completes.
      window.cpaSuccessCallback = complete;
      window.CPABuildOptions = {
        ...(window.CPABuildOptions ?? {}),
        callback: complete,
      };

      if (typeof window.call_locker === "function") {
        window.call_locker();
      } else {
        // Locker script unavailable (blocked/offline) — don't strand the user.
        complete();
      }
    },
    [url, filename],
  );

  return (
    <a href={url} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
