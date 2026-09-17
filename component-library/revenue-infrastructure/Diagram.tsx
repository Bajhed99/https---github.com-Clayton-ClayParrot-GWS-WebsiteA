import React, { useState, useRef, useCallback, useEffect } from "react";

// ── Expandable data ────────────────────────────────────────────────────────

const LEFT_TOOLS: { label: string; detail: string }[] = [
  { label: "Website",       detail: "Your digital storefront. Without conversion tracking and smart forms, visitors leave without a trace." },
  { label: "Agentic Search",  detail: "Agentic Engine Optimization and paid search running in parallel — but not connected to closed revenue or cost-per-acquisition." },
  { label: "CRM",           detail: "Deals exist in the system, but reps update them manually, creating stale and unreliable pipeline data." },
  { label: "Lead Response", detail: "No automated follow-up means average response times of 4–24 hours — long enough to lose a warm lead." },
  { label: "Automation",    detail: "Batch email sequences with no behavioural triggers, no lifecycle logic, and no CRM synchronisation." },
  { label: "Analytics",     detail: "Traffic dashboards show visits but cannot connect activity to closed revenue or customer lifetime value." },
];

const CENTER_CAPABILITIES: { label: string; detail: string }[] = [
  { label: "Digital Presence",    detail: "SEO, paid search, and website conversion optimised as one coordinated channel — not three separate budgets." },
  { label: "Lead Response",       detail: "AI reception responds in under 60 seconds, qualifies intent, and books directly into calendar availability." },
  { label: "Sales Operations",    detail: "CRM hygiene, deal automation, and pipeline reporting all maintained without manual data entry." },
  { label: "Revenue Intelligence",detail: "Full closed-loop attribution from first touchpoint through customer lifetime value — real-time." },
];

const RIGHT_OUTCOMES: { phase: string; desc: string; detail: string }[] = [
  { phase: "ATTRACT", desc: "Qualified inbound demand",  detail: "Coordinated digital presence generates high-intent demand across search, AI engines, and referral channels." },
  { phase: "CONVERT", desc: "Faster pipeline velocity",  detail: "Speed-to-lead under 60 seconds and automated qualification reduce sales cycle length measurably." },
  { phase: "RETAIN",  desc: "Reduced churn & risk",      detail: "Proactive success workflows and early churn signals surface risk before it becomes cancellation." },
  { phase: "GROW",    desc: "Net revenue expansion",     detail: "Cross-sell, upsell, and referral automation expand net revenue without proportional headcount growth." },
];

const LEFT_CONSEQUENCES = ["Slow response", "Broken handoffs", "Limited visibility"];
const PROCESS_STEPS     = ["Diagnose", "Design", "Implement", "Optimize"];

// ── Chevron ────────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
      style={{ flexShrink: 0, transition: "transform 0.22s ease",
               transform: open ? "rotate(180deg)" : "rotate(0deg)",
               color: open ? "var(--color-gws-maroon)" : "#9C9490" }}>
      <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── ToolPill ───────────────────────────────────────────────────────────────
function ToolPill({ label, detail, isOpen, onToggle }:
  { label: string; detail: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ width: "100%" }}>
      <button type="button" className={`gws-pill${isOpen ? " active" : ""}`}
        onClick={onToggle} aria-expanded={isOpen} style={{ width: "100%", textAlign: "left" }}>
        <span>{label}</span>
        <Chevron open={isOpen} />
      </button>
      <div className={`gws-pill-detail${isOpen ? " open" : ""}`}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px",
                    color: "var(--color-text-secondary)", lineHeight: 1.55, margin: 0 }}>
          {detail}
        </p>
      </div>
    </div>
  );
}

// ── CapabilityBadge ────────────────────────────────────────────────────────
function CapabilityBadge({ label, isActive, onToggle }:
  { label: string; isActive: boolean; onToggle: () => void }) {
  return (
    <button type="button" className={`gws-badge${isActive ? " active" : ""}`}
      onClick={onToggle} aria-pressed={isActive}>
      {label}
    </button>
  );
}

// ── OutcomeRow ─────────────────────────────────────────────────────────────
function OutcomeRow({ phase, desc, detail, isOpen, onToggle }:
  { phase: string; desc: string; detail: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`gws-outcome${isOpen ? " active" : ""}`} onClick={onToggle}
      role="button" tabIndex={0} aria-expanded={isOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
                       letterSpacing: "1.5px", color: "var(--color-gws-maroon)",
                       flexShrink: 0, width: "70px" }}>
          {phase}
        </span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px",
                       color: "var(--color-text-secondary)", lineHeight: 1.4, flex: 1 }}>
          {desc}
        </span>
        <Chevron open={isOpen} />
      </div>
      <div className={`gws-outcome-detail${isOpen ? " open" : ""}`}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px",
                    color: "var(--color-text-secondary)", lineHeight: 1.55,
                    margin: "8px 0 0 82px" }}>
          {detail}
        </p>
      </div>
    </div>
  );
}

// ── Flow connector (CSS-animated, no canvas) ───────────────────────────────
// Renders a vertical form on mobile, horizontal on tablet+
function FlowConnector() {
  return (
    <>
      {/* Mobile: vertical connector (visible only below 768px) */}
      <div className="gws-flow-connector-v">
        <div className="gws-connector-track">
          <div className="gws-connector-beam" />
        </div>
        <div className="gws-chevrons">
          <i className="gws-chevron">∨</i>
          <i className="gws-chevron">∨</i>
          <i className="gws-chevron">∨</i>
        </div>
      </div>
      {/* Tablet+: horizontal connector (visible only at 768px+) */}
      <div className="gws-col-gap">
        <div className="gws-connector-track">
          <div className="gws-connector-beam" />
        </div>
        <div className="gws-chevrons">
          <i className="gws-chevron">›</i>
          <i className="gws-chevron">›</i>
          <i className="gws-chevron">›</i>
        </div>
      </div>
    </>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export type RevenueInfrastructureProps = {
  tools?: typeof LEFT_TOOLS;
  capabilities?: typeof CENTER_CAPABILITIES;
  outcomes?: typeof RIGHT_OUTCOMES;
  consequences?: string[];
  steps?: string[];
};
export default function App({ tools = LEFT_TOOLS, capabilities = CENTER_CAPABILITIES, outcomes = RIGHT_OUTCOMES, consequences = LEFT_CONSEQUENCES, steps = PROCESS_STEPS }: RevenueInfrastructureProps) {
  const [openTool,    setOpenTool]    = useState<number | null>(null);
  const [activeBadge, setActiveBadge] = useState<number | null>(null);
  const [openOutcome, setOpenOutcome] = useState<number | null>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  // Canvas ref for dot-grid spotlight
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse spotlight state (refs → no re-renders)
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const spotRef   = useRef({ x: -9999, y: -9999 });
  const activeRef = useRef(false);
  const gridRafRef = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const updateNarrowState = () => setIsNarrow(query.matches);

    updateNarrowState();
    query.addEventListener("change", updateNarrowState);
    return () => query.removeEventListener("change", updateNarrowState);
  }, []);

  useEffect(() => {
    if (isNarrow) setActiveBadge(null);
  }, [isNarrow]);

  // ── Dot-grid spotlight ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas = gridCanvasRef.current!;
    const ctx    = canvas.getContext("2d");
    if (!ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const GRID = 24, R_BASE = 0.9, R_LIT = 2.2, REACH = 180, LERP = 0.08;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      spotRef.current.x += (mouseRef.current.x - spotRef.current.x) * LERP;
      spotRef.current.y += (mouseRef.current.y - spotRef.current.y) * LERP;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: sx, y: sy } = spotRef.current;
      const cols = Math.ceil(canvas.width  / GRID) + 2;
      const rows = Math.ceil(canvas.height / GRID) + 2;
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const dx = col * GRID, dy = row * GRID;
          const influence = activeRef.current ? Math.max(0, 1 - Math.hypot(dx - sx, dy - sy) / REACH) : 0;
          const t = influence * influence;
          ctx.beginPath();
          ctx.arc(dx, dy, R_BASE + (R_LIT - R_BASE) * t, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(28,25,23,${(0.09 + 0.50 * t).toFixed(3)})`;
          ctx.fill();
        }
      }
      gridRafRef.current = requestAnimationFrame(draw);
    };
    gridRafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(gridRafRef.current); window.removeEventListener("resize", resize); };
  }, []);


  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    mouseRef.current  = { x: e.clientX, y: e.clientY };
    activeRef.current = true;
  }, []);
  const handleMouseLeave = useCallback(() => {
    activeRef.current = false;
    mouseRef.current  = { x: -9999, y: -9999 };
  }, []);

  return (
    <> {/* standalone homepage section — ThemeProvider supplied by outer App */}
      {/* Layer 0: dot-grid spotlight */}
      <canvas ref={gridCanvasRef}
          style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

        <div
          style={{ width: "100%", maxWidth: "1400px", position: "relative", zIndex: 1 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >

          {/* ── Section header ── */}
          <div className="gws-diagram-section-header">
            <h2><span className="gws-diagram-heading-accent">Growth</span> compounds when<br />the system <span className="gws-diagram-heading-accent">connects</span>.</h2>
            <p>The same capabilities produce very different results when they work as one connected system.</p>
          </div>

          {/* ── Three-column layout ── */}
          <div className="gws-layout">

            {/* ═══ LEFT ═══ */}
            <div className="gws-col-side"
              style={{ background: "var(--color-canvas)", borderRadius: "12px",
                       border: "1px solid var(--color-border)", padding: "20px 16px" }}>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600,
                            letterSpacing: "0.8px", color: "var(--color-text-tertiary)",
                            textTransform: "uppercase", margin: "0 0 6px" }}>
                  Disconnected Tools
                </p>
                <h2 className="gws-col-heading">
                  The tools work.<br />
                  <em>They just don't</em><br />
                  work as one system.
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                {tools.map((tool, i) => (
                  <ToolPill key={tool.label} label={tool.label} detail={tool.detail}
                    isOpen={openTool === i} onToggle={() => setOpenTool(p => p === i ? null : i)} />
                ))}
              </div>

              <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
                {consequences.map(c => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                    <span style={{ width: "14px", height: "1px", background: "var(--color-border-strong)",
                                   flexShrink: 0, display: "block" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px",
                                   color: "var(--color-text-tertiary)" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <FlowConnector />

            {/* ═══ CENTER ═══ */}
            <div className="gws-col-center">
              <div className="gws-hub"
                style={{ width: "100%", background: "var(--color-surface)",
                         border: "1.5px solid var(--color-border-strong)", borderRadius: "16px",
                         padding: "32px 24px", textAlign: "center",
                         boxShadow: "0 2px 16px rgba(122,30,34,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                         position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                               width: "48px", height: "3px", background: "var(--color-gws-maroon)",
                               borderRadius: "0 0 3px 3px" }} />

                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 600,
                            letterSpacing: "2px", color: "var(--color-gws-maroon)",
                            textTransform: "uppercase", margin: "0 0 8px" }}>
                  One Connected System
                </p>
                <h2 className="gws-hub-title">Revenue Infrastructure</h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px",
                            color: "var(--color-text-secondary)", lineHeight: 1.6,
                            maxWidth: "280px", margin: "0 auto 22px" }}>
                  Visibility, response, sales operations, and intelligence working together.
                </p>

                <div className="gws-badge-row">
                  {capabilities.map((cap, i) => isNarrow ? (
                    <span className="gws-badge gws-badge--static" key={cap.label}>{cap.label}</span>
                  ) : (
                    <CapabilityBadge key={cap.label} label={cap.label}
                      isActive={activeBadge === i}
                      onToggle={() => setActiveBadge(p => p === i ? null : i)} />
                  ))}
                </div>

                <div className={`gws-badge-detail${!isNarrow && activeBadge !== null ? " open" : ""}`}>
                  {!isNarrow && activeBadge !== null && (
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px",
                                color: "var(--color-text-secondary)", lineHeight: 1.6,
                                background: "var(--color-canvas)", border: "1px solid var(--color-border)",
                                borderRadius: "8px", padding: "10px 14px", margin: 0, textAlign: "left" }}>
                      {capabilities[activeBadge]?.detail}
                    </p>
                  )}
                </div>

                <div className="gws-steps" style={{ marginTop: activeBadge !== null ? "16px" : "0" }}>
                  {steps.map((step, i) => (
                    <span key={step} style={{ display: "contents" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px",
                                     color: "var(--color-text-tertiary)", fontWeight: 400 }}>
                        {step}
                      </span>
                      {i < steps.length - 1 && (
                        <span style={{ width: "10px", height: "1px",
                                       background: "var(--color-border-strong)",
                                       display: "inline-block", verticalAlign: "middle" }} />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <FlowConnector />

            {/* ═══ RIGHT ═══ */}
            <div className="gws-col-side"
              style={{ background: "var(--color-canvas)", borderRadius: "12px",
                       border: "1px solid var(--color-border)", padding: "20px 16px" }}>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600,
                            letterSpacing: "0.8px", color: "var(--color-text-tertiary)",
                            textTransform: "uppercase", margin: "0 0 6px" }}>
                  Business Outcomes
                </p>
                <h2 className="gws-col-heading">
                  Compounding<br />
                  <em style={{ color: "var(--color-gws-maroon)" }}>Revenue</em><br />
                  Performance
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                {outcomes.map((o, i) => (
                  <OutcomeRow key={o.phase} phase={o.phase} desc={o.desc} detail={o.detail}
                    isOpen={openOutcome === i}
                    onToggle={() => setOpenOutcome(p => p === i ? null : i)} />
                ))}
              </div>

              <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px",
                            color: "var(--color-text-tertiary)", lineHeight: 1.55, margin: 0 }}>
                  Each capability reinforces the next — creating durable, compounding revenue advantage.
                </p>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
