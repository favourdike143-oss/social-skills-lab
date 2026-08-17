import { useCallback, useState, type ReactNode } from "react";

/**
 * Triggers a real file download.
 * The PDFs are served from the same origin, so a plain anchor with `download`
 * saves the file straight to the device.
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
  const [isDownloading, setIsDownloading] = useState(false);

  const onClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (isDownloading) return;

      setIsDownloading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Download failed with status ${response.status}`);

        const blobUrl = URL.createObjectURL(await response.blob());
        triggerDownload(blobUrl, filename);
        window.setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
      } catch {
        triggerDownload(url, filename);
      } finally {
        setIsDownloading(false);
      }
    },
    [url, filename, isDownloading],
  );

  return (
    <a
      href={url}
      download={filename}
      className={className}
      onClick={onClick}
      aria-busy={isDownloading}
    >
      {isDownloading ? "PREPARING DOWNLOAD…" : children}
    </a>
  );
}
