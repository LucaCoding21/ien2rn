"use client";

import { useEffect, useRef } from "react";

const RESIZER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js";

declare global {
  interface Window {
    iFrameResize?: (opts: Record<string, unknown>, target: string | HTMLElement) => void;
  }
}

interface Props {
  src: string;
  id?: string;
  title?: string;
  initialHeight?: number;
}

export default function EnginehireIframe({
  src,
  id = "enginehire-iframe",
  title = "Application form",
  initialHeight = 2400,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const bind = () => {
      if (window.iFrameResize && iframeRef.current) {
        window.iFrameResize({ log: false, checkOrigin: false }, iframeRef.current);
      }
    };

    if (window.iFrameResize) {
      bind();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RESIZER_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", bind);
      return () => existing.removeEventListener("load", bind);
    }

    const script = document.createElement("script");
    script.src = RESIZER_SRC;
    script.async = true;
    script.onload = bind;
    document.body.appendChild(script);
  }, [src]);

  return (
    <iframe
      ref={iframeRef}
      id={id}
      src={src}
      title={title}
      width="100%"
      height={initialHeight}
      style={{ border: "none", display: "block", width: "1px", minWidth: "100%" }}
    />
  );
}
