import { useCallback, type ReactNode } from "react";

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
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      triggerDownload(url, filename);
    },
    [url, filename],
  );

  return (
    <a href={url} download={filename} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
