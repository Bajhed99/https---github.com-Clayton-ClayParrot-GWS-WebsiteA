import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import PackageApp from "./Diagram";
import packageStyles from "./styles.css?inline";

const hostStyles = packageStyles.replaceAll(".gws-page", ":host");

export function RevenueInfrastructure(props: React.ComponentProps<typeof PackageApp>) {
  const mountRef = useRef<HTMLElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useLayoutEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setShadowRoot(mount.shadowRoot ?? mount.attachShadow({ mode: "open" }));
  }, []);

  return (
    <section
      id="revenue-infrastructure"
      ref={mountRef}
      className="homepage-visual-section gws-page"
      style={{ position: 'relative', contain: 'paint', isolation: 'isolate' }}
      aria-label="Revenue Infrastructure"
    >
      {shadowRoot && createPortal(
        <>
          <style>{hostStyles}</style>
          <PackageApp {...props} />
        </>,
        shadowRoot,
      )}
    </section>
  );
}
