import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { GwsParticleDrift } from "./GwsParticleDrift";
import PackageApp from "./Diagram";
import packageStyles from "./styles.css?inline";

const desktopGutterStyles = `
  @media (min-width: 768px) {
    .min-h-screen > .mx-4 {
      width: min(calc(100% - 96px), 1120px);
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const sectionSpacingStyles = `
  #ai-visibility-homepage-visual-section {
    border-top: 1px solid #D8D5CE;
    border-bottom: 1px solid #D8D5CE;
    padding: 112px 0px !important;
  }

  @media (max-width: 760px) {
    #ai-visibility-homepage-visual-section {
      padding: 72px 0px !important;
    }
  }

  .min-h-screen.flex.flex-col {
    padding: 0px 0px !important;
  }

  .min-h-screen > .text-center {
    padding-top: 0 !important;
  }

  .min-h-screen > .mx-4.mb-6 {
    margin-bottom: 0 !important;
  }

`;

const typographyAndRadiusStyles = `
  .min-h-screen,
  .min-h-screen * {
    border-radius: 0 !important;
  }

  .min-h-screen h1 {
    font-family: "DM Serif Display", Georgia, serif !important;
    font-size: clamp(2rem, 3.4vw, 2.75rem) !important;
    font-weight: 400 !important;
    line-height: 1.15 !important;
  }

  .min-h-screen h2 {
    font-family: "DM Serif Display", Georgia, serif !important;
    font-size: clamp(1.35rem, 2.1vw, 1.75rem) !important;
    font-weight: 400 !important;
    line-height: 1.22 !important;
  }

  .min-h-screen em {
    font-family: "DM Serif Display", Georgia, serif !important;
    font-style: italic !important;
  }

  .min-h-screen > .text-center > p:last-child,
  .min-h-screen .text-sm {
    font-family: "DM Sans", Arial, sans-serif !important;
    font-size: 17px !important;
    line-height: 1.62 !important;
  }

  .min-h-screen .text-xs {
    font-family: "DM Sans", Arial, sans-serif !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
  }
`;

const particleDriftStyles = `
  .gws-ai-visibility-particle-stage {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background: #000000;
  }

  .gws-ai-visibility-particle-canvas {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    opacity: 0.76;
    pointer-events: none;
  }

  .gws-ai-visibility-particle-stage > #ai-visibility-homepage-visual-section {
    position: relative;
    z-index: 1;
    background: transparent !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .gws-ai-visibility-particle-canvas {
      opacity: 0.32;
    }
  }
`;

export function BuyerJourney(props: React.ComponentProps<typeof PackageApp>) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useLayoutEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setShadowRoot(mount.shadowRoot ?? mount.attachShadow({ mode: "open" }));
  }, []);

  return (
    <div ref={mountRef}>
      {shadowRoot && createPortal(
        <>
          <style>{`${packageStyles}\n${desktopGutterStyles}\n${sectionSpacingStyles}\n${typographyAndRadiusStyles}\n${particleDriftStyles}`}</style>
          <div className="gws-ai-visibility-particle-stage">
            <GwsParticleDrift />
            <PackageApp {...props} />
          </div>
        </>,
        shadowRoot,
      )}
    </div>
  );
}
