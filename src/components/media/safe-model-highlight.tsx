"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

import { ProjectCoverMedia } from "@/components/media/site-media";

type MediaRatio = "landscape" | "standard" | "square" | "portrait" | "free";

const ratioClasses: Record<MediaRatio, string> = {
  landscape: "aspect-[16/9]",
  standard: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[9/16]",
  free: "",
};

const MODEL_VIEWER_SCRIPT_SRC =
  "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";

let modelViewerScriptPromise: Promise<void> | null = null;

function loadModelViewerScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.customElements.get("model-viewer")) {
    return Promise.resolve();
  }

  if (!modelViewerScriptPromise) {
    modelViewerScriptPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${MODEL_VIEWER_SCRIPT_SRC}"]`,
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("model-viewer failed")), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = MODEL_VIEWER_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("model-viewer failed"));
      document.head.appendChild(script);
    });
  }

  return modelViewerScriptPromise;
}

function canUse3D() {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const navigatorWithMemory = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  if (navigatorWithMemory.connection?.saveData) {
    return false;
  }

  const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
  const deviceMemory = navigatorWithMemory.deviceMemory ?? 8;
  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

  if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
    return false;
  }

  if (isSmallScreen && (hardwareConcurrency <= 6 || deviceMemory <= 6)) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    return Boolean(context);
  } catch {
    return false;
  }
}

type ModelViewerElement = HTMLElement & {
  play?: () => void;
  pause?: () => void;
};

type SafeModelHighlightProps = {
  modelSrc?: string;
  posterSrc?: string;
  alt?: string;
  ratio?: MediaRatio;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
};

export function SafeModelHighlight({
  modelSrc,
  posterSrc,
  alt,
  ratio = "landscape",
  className,
  overlayClassName,
  children,
}: SafeModelHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<ModelViewerElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [canRenderModel, setCanRenderModel] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [hasModelError, setHasModelError] = useState(false);

  useEffect(() => {
    if (!modelSrc || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [modelSrc]);

  useEffect(() => {
    if (!modelSrc || !isNearViewport) {
      return;
    }

    if (!canUse3D()) {
      return;
    }

    let cancelled = false;

    loadModelViewerScript()
      .then(() => {
        if (cancelled) {
          return;
        }

        setCanRenderModel(true);
        setScriptReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setHasModelError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isNearViewport, modelSrc]);

  useEffect(() => {
    if (!canRenderModel || !containerRef.current) {
      return;
    }

    modelRef.current = containerRef.current.querySelector("model-viewer") as ModelViewerElement | null;
  }, [canRenderModel, scriptReady]);

  useEffect(() => {
    if (!canRenderModel || !containerRef.current || !modelRef.current) {
      return;
    }

    const modelElement = modelRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          modelElement.play?.();
        } else {
          modelElement.pause?.();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [canRenderModel, scriptReady]);

  if (!modelSrc || hasModelError || !canRenderModel || !scriptReady) {
    return (
      <div ref={containerRef}>
        <ProjectCoverMedia
          src={posterSrc}
          alt={alt}
          ratio={ratio}
          sizes="(max-width: 1023px) 100vw, 42vw"
          quality={72}
          className={className}
          interactive={false}
          overlayClassName={overlayClassName}
        >
          {children}
        </ProjectCoverMedia>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div className={clsx("media-surface", ratioClasses[ratio], className)}>
        {createElement("model-viewer", {
          src: modelSrc,
          poster: posterSrc,
          alt: alt || "",
          autoplay: true,
          "camera-controls": false,
          "auto-rotate": true,
          "auto-rotate-delay": 0,
          "rotation-per-second": "3deg",
          "interaction-prompt": "none",
          loading: "lazy",
          reveal: "auto",
          ar: false,
          shadowIntensity: "0.8",
          exposure: "1",
          environmentImage: "neutral",
          disableZoom: true,
          style: {
            width: "100%",
            height: "100%",
            background: "transparent",
          },
          onError: () => setHasModelError(true),
        })}
        <div
          className={clsx(
            "media-surface-overlay",
            "bg-[linear-gradient(180deg,rgba(17,19,21,0.04),rgba(17,19,21,0.32))]",
            overlayClassName,
          )}
        />
        {children ? <div className="media-surface-content">{children}</div> : null}
      </div>
    </div>
  );
}
