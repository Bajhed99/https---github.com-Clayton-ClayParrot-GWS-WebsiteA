import React, { useState, useEffect, useRef, Fragment } from 'react'

// ─── Brand tokens ────────────────────────────────────────────────────────────
const C = {
  bg:           '#09080A',
  // LEFT side — cool, neutral, desaturated. No gold anywhere.
  panelLeft:    '#111214',
  panelLeftHov: '#171A1C',
  surfaceLeft:  '#1A1D1F',
  surfaceLeftHi:'#222629',
  borderLeft:   '#2A2F33',
  borderLeftSub:'#1E2226',
  textLeftHead: '#C8CDD1',   // cooler white for left headings
  textLeftSub:  '#6A7278',   // cool gray labels
  textLeftFaint:'#3C4449',
  accentLeft:   '#4A5560',   // muted cool-blue tint for left side only
  // RIGHT side — warm, gold-forward, vivid
  panelRight:   '#0C0A07',
  panelRightHov:'#100E09',
  surfaceRight: '#1A1610',
  surfaceRightHi:'#221C14',
  borderRight:  '#2E2618',
  borderRightSub:'#201A10',
  gold:         '#B8863B',
  goldLight:    '#D4A355',
  goldFaint:    'rgba(184,134,59,0.1)',
  goldBorder:   'rgba(184,134,59,0.3)',
  goldBorderHi: 'rgba(184,134,59,0.55)',
  goldGlow:     'rgba(184,134,59,0.22)',
  maroon:       '#7A1E22',
  maroonFaint:  'rgba(122,30,34,0.18)',
  maroonBorder: 'rgba(122,30,34,0.45)',
  textPrimary:  '#F0ECE4',
  textSub:      '#8A8278',
  textFaint:    '#4E4840',
} as const

// ─── Particle dot network (right panel only) ──────────────────────────────────
function ParticleBg() {
  const dots = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    cx: 5 + Math.abs(Math.sin(i * 2.4) * 90),
    cy: 5 + Math.abs(Math.cos(i * 1.7) * 90),
    r:  i % 3 === 0 ? 1.2 : 0.7,
    op: 0.12 + (i % 4) * 0.07,
  }))
  const lines = [[0,4],[4,9],[9,14],[2,7],[7,12],[12,18],[1,6],[6,11],[11,17],[3,8],[8,15]]
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {lines.map(([a,b],i) => (
        <line key={i} x1={dots[a].cx} y1={dots[a].cy} x2={dots[b].cx} y2={dots[b].cy}
          stroke={C.gold} strokeWidth="0.18" opacity="0.14" />
      ))}
      {dots.map(d => <circle key={d.id} cx={d.cx} cy={d.cy} r={d.r} fill={C.gold} opacity={d.op} />)}
    </svg>
  )
}

// ─── Particle stream (center arrow) ──────────────────────────────────────────
const PARTICLES = [
  { delay:    0, dur: 1900, color: C.gold,      size: 4, y: -5 },
  { delay:  380, dur: 2100, color: '#7A1E22',   size: 3, y:  3 },
  { delay:  720, dur: 1850, color: '#D4A355',   size: 3, y: -1 },
  { delay: 1100, dur: 2050, color: C.gold,      size: 4, y:  6 },
  { delay: 1500, dur: 1950, color: '#9A2429',   size: 3, y: -6 },
  { delay: 1850, dur: 2000, color: '#D4A355',   size: 3, y:  1 },
]
function StreamParticles({ active }: { active: boolean }) {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size, height: p.size, background: p.color,
            top: `calc(50% + ${p.y}px)`, left: '50%', marginLeft: -(p.size / 2),
            boxShadow: `0 0 7px 2px ${p.color}88`,
            animation: `particle-stream ${p.dur}ms ease-in-out ${p.delay}ms infinite`,
            opacity: active ? 1 : 0.2,
            transition: 'opacity 0.6s',
          }} />
      ))}
    </>
  )
}

// ─── Glowing center arrow ─────────────────────────────────────────────────────
function GlowArrow({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 56 }}>
      <div className="absolute rounded-full transition-all duration-500"
        style={{
          width: 52, height: 52,
          background: active
            ? `radial-gradient(circle, rgba(184,134,59,0.4) 0%, rgba(122,30,34,0.18) 55%, transparent 75%)`
            : `radial-gradient(circle, rgba(184,134,59,0.14) 0%, transparent 70%)`,
          filter: active ? 'blur(8px)' : 'blur(4px)',
        }} />
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden className="relative z-10">
        <defs>
          <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.maroon} />
            <stop offset="100%" stopColor={C.gold} />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M8 22h24M24 14l8 8-8 8"
          stroke="url(#arrowGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          filter={active ? 'url(#glow)' : undefined} style={{ transition: 'all 0.3s' }} />
      </svg>
    </div>
  )
}

// ─── Compression funnel ───────────────────────────────────────────────────────
const FUNNEL_W = 300, FUNNEL_H = 60
const NODE_X     = [18, 60, 102, 143, 157, 198, 240, 282]
const CARD_X     = [50, 150, 250]
const NODE_CARD  = [0, 1, 2, 0, 2, 1, 0, 2]   // which card each node feeds

function CompressionFunnel({ active }: { active: boolean }) {
  return (
    <div className="mb-2">
      <p className="text-[9px] font-semibold tracking-[0.16em] uppercase mb-2"
        style={{ color: active ? C.gold : C.textFaint, opacity: active ? 0.7 : 0.5, transition: 'color 0.4s, opacity 0.4s' }}>
        AI narrows {NODE_X.length} options to a shortlist
      </p>
      {/* Input nodes */}
      <div className="flex justify-between">
        {NODE_X.map((_, i) => {
          const isYou = NODE_CARD[i] === 0
          return (
            <div key={i} className="flex items-center justify-center" style={{ width: 20 }}>
              <div className="rounded flex items-center justify-center transition-all duration-300"
                style={{
                  width: 15, height: 15,
                  background: isYou ? C.goldFaint : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isYou ? C.goldBorder : C.borderRightSub}`,
                  opacity: active ? 1 : 0.3,
                  transitionDelay: `${i * 40}ms`,
                }}>
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden>
                  <path d="M3.5 1L6 2.5v2L3.5 6 1 4.5v-2L3.5 1z"
                    stroke={isYou ? C.gold : C.textFaint} strokeWidth={isYou ? '0.9' : '0.6'} />
                </svg>
              </div>
            </div>
          )
        })}
      </div>
      {/* Converging bezier paths */}
      <svg width="100%" viewBox={`0 0 ${FUNNEL_W} ${FUNNEL_H}`} preserveAspectRatio="none"
        style={{ display: 'block', height: 48 }} aria-hidden>
        {NODE_X.map((nx, i) => {
          const cx = CARD_X[NODE_CARD[i]]
          const isYou = NODE_CARD[i] === 0
          const pathLen = 220
          return (
            <path key={i}
              d={`M ${nx} 0 C ${nx} ${FUNNEL_H * 0.55}, ${cx} ${FUNNEL_H * 0.45}, ${cx} ${FUNNEL_H}`}
              fill="none"
              stroke={isYou ? C.gold : C.textFaint}
              strokeWidth={isYou ? 1.3 : 0.7}
              strokeDasharray={pathLen}
              strokeDashoffset={active ? 0 : pathLen}
              opacity={active ? (isYou ? 0.6 : 0.1) : 0.04}
              style={{ transition: `stroke-dashoffset ${active ? 0.65 : 0.25}s ease-out ${i * 50}ms, opacity 0.4s ${i * 40}ms` }} />
          )
        })}
      </svg>
    </div>
  )
}

// ─── Search result row ────────────────────────────────────────────────────────
function ResultRow({ n, active }: { n: number; active: boolean }) {
  const urls = ['', 'www.techreview.com › analytics', 'www.g2.com › b2b-analytics', 'www.capterra.com › analytics']
  const barW = ['', '74%', '58%', '46%']
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-300"
      style={{
        background: C.surfaceLeft,
        border: `1px solid ${active && n === 1 ? C.borderLeft : C.borderLeftSub}`,
        opacity: active ? (n === 1 ? 1 : 0.7) : 0.55,
      }}>
      <span className="text-base font-light flex-shrink-0 mt-0.5 leading-none"
        style={{ color: C.textLeftFaint, fontFamily: 'var(--font-display)', minWidth: 14 }}>{n}</span>
      <div className="flex-1 min-w-0">
        {/* Title bar — cool-tinted, NOT gold */}
        <div className="h-2 rounded-sm mb-2"
          style={{ width: barW[n], background: active && n === 1 ? C.accentLeft : C.borderLeft, maxWidth: '100%', transition: 'background 0.3s' }} />
        <div className="text-[10px] mb-1.5 truncate" style={{ color: C.textLeftFaint }}>{urls[n]}</div>
        <div className="h-1.5 rounded-sm mb-1" style={{ width: '85%', background: C.borderLeftSub }} />
        <div className="h-1.5 rounded-sm" style={{ width: '60%', background: C.borderLeftSub, opacity: 0.5 }} />
      </div>
    </div>
  )
}

// ─── Recommendation card ──────────────────────────────────────────────────────
function RecoCard({ label, isYou, delay }: { label: string; isYou?: boolean; delay: number }) {
  return (
    <div className="flex-1 rounded-xl flex flex-col items-center gap-2.5 px-3 py-4 transition-all duration-300"
      style={{
        background: isYou ? 'rgba(184,134,59,0.1)' : C.surfaceRight,
        border: `1.5px solid ${isYou ? C.goldBorderHi : C.borderRightSub}`,
        boxShadow: isYou ? `0 0 24px rgba(184,134,59,0.16), inset 0 0 16px rgba(184,134,59,0.05)` : 'none',
        transitionDelay: `${delay}ms`,
        position: 'relative',
      }}>
      {isYou && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider whitespace-nowrap"
          style={{ background: C.maroon, color: 'white', boxShadow: '0 0 10px rgba(122,30,34,0.5)' }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="white" aria-hidden>
            <path d="M4 1l.8 2H7L5.4 4.2l.6 2L4 5 2 6.2l.6-2L1 3h2.2L4 1z" />
          </svg>
          RECOMMENDED
        </div>
      )}
      <div className="w-10 h-10 flex items-center justify-center rounded-lg"
        style={{
          background: isYou ? 'rgba(184,134,59,0.18)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isYou ? C.goldBorder : C.borderRightSub}`,
        }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 2l7 4v8l-7 4-7-4V6z" stroke={isYou ? C.gold : C.textFaint} strokeWidth="1.3" />
          {isYou && <path d="M7 10l2 2 4-4" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      </div>
      <span className="text-[11px] font-bold text-center leading-tight tracking-wide"
        style={{ color: isYou ? C.textPrimary : C.textSub }}>
        {label}
      </span>
      <div className="flex items-center gap-1" aria-label="Evaluated criteria">
        {['Fit', 'Evidence', 'Relevance'].map((criterion) => (
          <span key={criterion} className="text-[7px] font-semibold tracking-wide uppercase px-1 py-0.5 rounded"
            style={{
              color: isYou ? C.gold : C.textSub,
              background: isYou ? C.goldFaint : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isYou ? C.goldBorder : C.borderRightSub}`,
            }}>
            {criterion}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Trust badge ──────────────────────────────────────────────────────────────
function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span style={{ color: C.gold, opacity: 0.65 }}>{icon}</span>
      <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: C.textSub }}>{label}</span>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────
export type BuyerJourneyProps = { searchQuery?: string; eyebrow?: string; description?: string };
export default function App({ searchQuery = 'best b2b analytics platform', eyebrow = 'The Buyer Journey Has Changed', description = 'Buyers can now reach a shortlist before they ever visit your website.' }: BuyerJourneyProps) {
  const [hov, setHov]       = useState<'trad' | 'ai' | null>(null)
  const [blink, setBlink]   = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timerRef.current = setInterval(() => setBlink(b => !b), 530)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const tradActive = hov === 'trad'
  const aiActive   = hov === 'ai'

  return (
    <section id="ai-visibility-homepage-visual-section" className="min-h-screen flex flex-col"
      style={{ background: C.bg, fontFamily: 'var(--font-body)' }}
      role="region" aria-label="Old vs New Buyer Journey">

      {/* ── Page header ───────────────────────────────────────────── */}
      <div className="text-center pt-10 pb-8 px-6">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4"
          style={{ color: C.gold }}>
          {eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl font-light leading-tight mb-3"
          style={{ fontFamily: 'var(--font-display)', color: C.textPrimary, letterSpacing: '-0.01em' }}>
          AI is moving the decision{' '}
          <em style={{ fontStyle: 'italic', color: C.gold }}>upstream.</em>
        </h1>
        <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: C.textSub }}>
          {description}
        </p>
      </div>

      {/* ── Split panels ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row mx-4 mb-4 rounded-2xl overflow-hidden"
        style={{ border: `1px solid #1E1E20`, minHeight: 460 }}>

        {/* ══ LEFT — Traditional Search ════════════════════════════ */}
        <div className="relative flex-1 flex flex-col cursor-default transition-colors duration-400"
          style={{ background: tradActive ? C.panelLeftHov : C.panelLeft }}
          onMouseEnter={() => setHov('trad')}
          onMouseLeave={() => setHov(null)}>

          {/* Cool top accent bar */}
          <div className="h-[3px] w-full" style={{ background: tradActive ? C.accentLeft : C.borderLeft, transition: 'background 0.4s' }} />

          <div className="flex flex-col flex-1 p-6 sm:p-8">
            {/* Panel heading */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 rounded"
                  style={{ background: 'rgba(255,255,255,0.05)', color: C.textLeftSub, border: `1px solid ${C.borderLeft}`, letterSpacing: '0.2em' }}>
                  Then
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold leading-snug mb-1"
                style={{ fontFamily: 'var(--font-display)', color: C.textLeftHead, letterSpacing: '-0.01em' }}>
                Traditional Search
              </h2>
              <p className="text-xs font-medium" style={{ color: C.textLeftSub }}>
                The buyer navigates the market alone.
              </p>
            </div>

            {/* Search bar */}
            <div className="rounded-xl mb-4 px-4 py-3 flex items-center gap-3 transition-all duration-300"
              style={{
                background: C.surfaceLeftHi,
                border: `1.5px solid ${tradActive ? C.borderLeft : C.borderLeftSub}`,
              }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <circle cx="6.5" cy="6.5" r="4.2" stroke={C.textLeftSub} strokeWidth="1.4" />
                <path d="M10 10l3 3" stroke={C.textLeftSub} strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span className="text-sm flex-1" style={{ color: C.textLeftHead, fontFamily: 'var(--font-body)' }}>
                {searchQuery}
                <span style={{
                  display: 'inline-block', width: 1.5, height: 13, background: C.textLeftSub,
                  marginLeft: 2, verticalAlign: 'middle',
                  opacity: blink ? 0.7 : 0, transition: 'opacity 0.1s',
                }} />
              </span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: C.borderLeft }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <circle cx="4.8" cy="4.8" r="3.2" stroke={C.textLeftSub} strokeWidth="1.3" />
                  <path d="M7.3 7.3l2.2 2.2" stroke={C.textLeftSub} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Result rows */}
            <div className="flex flex-col gap-2 flex-1 mb-5">
              {[1, 2, 3].map(n => <ResultRow key={n} n={n} active={tradActive} />)}
            </div>

            {/* Buyer effort label */}
            <div className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: C.surfaceLeft, border: `1px solid ${C.borderLeftSub}` }}>
              <div className="w-[3px] self-stretch rounded-full flex-shrink-0"
                style={{ background: tradActive ? C.accentLeft : C.borderLeft, transition: 'background 0.3s' }} />
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: C.textLeftHead }}>
                  Buyer does all the filtering
                </p>
                <p className="text-[11px] leading-relaxed" style={{ color: C.textLeftSub }}>
                  Search surfaces options. You click, compare, and decide — manually, across many sites.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ CENTER — Particle stream + arrow ═════════════════════ */}
        <div className="hidden lg:flex flex-col items-center justify-center py-8 relative"
          style={{ background: C.bg, minWidth: 82 }}>
          <StreamParticles active={hov !== null} />
          <GlowArrow active={hov !== null} />
        </div>

        {/* Mobile divider */}
        <div className="lg:hidden flex items-center justify-center py-5" style={{ background: C.bg }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 36, height: 1, background: '#2A2620' }} />
            <GlowArrow active={hov !== null} />
            <div style={{ width: 36, height: 1, background: '#2A2620' }} />
          </div>
        </div>

        {/* ══ RIGHT — AI-Assisted Discovery ════════════════════════ */}
        <div className="relative flex-1 flex flex-col cursor-default transition-colors duration-400 overflow-hidden"
          style={{ background: aiActive ? C.panelRightHov : C.panelRight }}
          onMouseEnter={() => setHov('ai')}
          onMouseLeave={() => setHov(null)}>

          {/* Gold top accent bar */}
          <div className="h-[3px] w-full transition-all duration-400"
            style={{ background: aiActive ? `linear-gradient(90deg, ${C.maroon}, ${C.gold})` : `linear-gradient(90deg, rgba(122,30,34,0.4), rgba(184,134,59,0.4))` }} />

          {/* Particle background */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ opacity: aiActive ? 0.65 : 0.2, transition: 'opacity 0.5s' }}>
            <ParticleBg />
          </div>

          {/* Gold bottom glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: 280, height: 130,
              background: `radial-gradient(ellipse at 50% 100%, rgba(184,134,59,0.18) 0%, transparent 70%)`,
              filter: 'blur(10px)',
              opacity: aiActive ? 1 : 0.35,
              transition: 'opacity 0.5s',
            }} />

          <div className="relative z-10 flex flex-col flex-1 p-6 sm:p-8">
            {/* Panel heading */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 rounded"
                  style={{ background: C.goldFaint, color: C.gold, border: `1px solid ${C.goldBorder}` }}>
                  Now
                </span>
                {/* Live dot */}
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.gold, boxShadow: `0 0 5px ${C.gold}`, display: 'inline-block' }} />
                  <span className="text-[9px] font-semibold tracking-wide" style={{ color: C.gold }}>AI ACTIVE</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold leading-snug mb-1"
                style={{ fontFamily: 'var(--font-display)', color: C.textPrimary, letterSpacing: '-0.01em' }}>
                AI-Assisted Discovery
              </h2>
              <p className="text-xs font-medium" style={{ color: C.gold, opacity: 0.8 }}>
                AI evaluates and shortlists before you visit.
              </p>
            </div>

            {/* Chat bubble */}
            <div className="self-end mb-3 px-4 py-2.5 rounded-xl rounded-tr-sm"
              style={{ background: C.surfaceRightHi, border: `1px solid ${C.borderRight}`, maxWidth: '88%' }}>
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <circle cx="6" cy="6" r="4.5" stroke={C.textSub} strokeWidth="1" />
                  <circle cx="6" cy="6" r="1.5" fill={C.textSub} opacity="0.4" />
                </svg>
                <span className="text-xs font-medium" style={{ color: C.textPrimary }}>
                  Who is the best fit for my business?
                </span>
              </div>
            </div>

            {/* AI response */}
            <div className="mb-4 px-4 py-3 rounded-xl"
              style={{ background: C.surfaceRight, border: `1px solid ${C.borderRight}` }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: C.goldFaint, border: `1px solid ${C.goldBorder}` }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M5 1.5l.8 2H8L6.2 4.8l.7 2.2L5 6 3.1 7l.7-2.2L2 3.5h2.2L5 1.5z" fill={C.gold} opacity="0.85" />
                    </svg>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: C.textSub }}>
                    Based on your goals, budget, and integrations — here are the top solutions I recommend:
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 rounded"
                  style={{ background: C.goldFaint, border: `1px solid ${C.goldBorder}` }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                    <path d="M2 2h5M2 4.5h3.5M2 7h4" stroke={C.gold} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                  </svg>
                  <span className="text-[8px] font-bold tracking-wider" style={{ color: C.gold }}>9 SOURCES</span>
                </div>
              </div>
            </div>

            {/* Compression funnel */}
            <CompressionFunnel active={aiActive} />

            {/* Recommendation cards */}
            <div className="flex gap-2 mb-4">
              <RecoCard label="YOUR BUSINESS" isYou delay={0} />
              <RecoCard label="Brand B" delay={80} />
              <RecoCard label="Brand C" delay={160} />
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 flex-wrap pt-3"
              style={{ borderTop: `1px solid ${C.borderRightSub}` }}>
              <TrustBadge label="Verified Sources" icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1L2 3v3c0 2.8 1.7 4.7 4 5.5C9.3 10.7 11 8.8 11 6V3L6 1z" stroke="currentColor" strokeWidth="1" />
                  <path d="M4 6l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              } />
              <div style={{ width: 1, height: 14, background: C.borderRight }} />
              <TrustBadge label="Source Signals" icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
                  <path d="M2 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              } />
              <div style={{ width: 1, height: 14, background: C.borderRight }} />
              <TrustBadge label="AI-Evaluated" icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1l1 3h3l-2.5 2 1 3L6 7.5 3.5 9l1-3L2 4h3L6 1z" stroke="currentColor" strokeWidth="0.9" />
                </svg>
              } />
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Visibility gate ─────────────────────────────────────── */}
      <div className="mx-4 mb-4 rounded-xl px-5 sm:px-8 py-4"
        style={{ background: '#111009', border: `1px solid #2A2418` }}>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <div className="flex-shrink-0 text-center sm:text-left">
            <p className="text-[9px] font-bold tracking-[0.22em] uppercase" style={{ color: C.gold }}>AI Visibility</p>
            <p className="text-[9px] mt-0.5" style={{ color: C.textFaint }}>To enter the shortlist</p>
          </div>
          <div style={{ width: 1, height: 24, background: '#2A2418', flexShrink: 0 }} className="hidden sm:block" />
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start flex-1">
            {['Found', 'Understood', 'Trusted', 'Recommended'].map((w, i) => (
              <Fragment key={w}>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-lg"
                  style={{
                    background: i === 3 ? C.goldFaint : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${i === 3 ? C.goldBorder : '#2A2418'}`,
                    color: i === 3 ? C.gold : C.textSub,
                  }}>{w}</span>
                {i < 3 && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M3 5h4M5.5 3L7.5 5l-2 2" stroke={C.textFaint} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Fragment>
            ))}
            <span className="text-[9px] ml-1 hidden sm:inline" style={{ color: C.textFaint }}>
              — by both buyers and AI systems
            </span>
          </div>
        </div>
      </div>

      {/* ── Conclusion bar ─────────────────────────────────────────── */}
      <div className="mx-4 mb-6 rounded-xl px-6 sm:px-10 py-7 text-center"
        style={{
          background: `linear-gradient(135deg, #1C0A0C 0%, #140E08 55%, #0E0C07 100%)`,
          border: `1.5px solid rgba(122,30,34,0.32)`,
        }}>
        <p className="text-lg sm:text-2xl lg:text-[1.65rem] font-light leading-snug max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-display)', color: C.textPrimary, letterSpacing: '-0.01em' }}>
          If AI cannot find, understand, or trust your business —{' '}
          <em style={{ fontStyle: 'italic', color: C.gold }}>you may never enter the shortlist.</em>
        </p>
        <p className="text-xs mt-2.5" style={{ color: 'rgba(240,236,228,0.28)' }}>
          Be visible before the website visit.
        </p>
      </div>

      <p className="sr-only">
        Traditional search sends buyers to multiple results and websites where they perform most comparison themselves.
        In AI-assisted discovery, AI systems gather and synthesize information across multiple sources and can shape
        a shortlist before the buyer visits individual websites. AI Visibility helps a business become discoverable,
        understandable, trusted, and recommendable within that evaluation process.
      </p>
    </section>
  )
}
