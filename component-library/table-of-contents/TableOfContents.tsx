import { useEffect, useState } from 'react';
import type { TocItem } from './presets';
export type { TocItem } from './presets';

export default function TableOfContents({ items, offset = 80 }: { items: readonly TocItem[]; offset?: number }) {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const targets = items.map(item => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
      const passed = targets.filter(el => el.getBoundingClientRect().top <= offset + 1);
      setActiveId((passed.at(-1) ?? targets[0])?.id ?? '');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items, offset]);

  if (!items.length) return null;
  return <nav className="toc-rail" aria-label="Table of contents">
    {items.map(item => <button key={item.id} type="button"
      className={`toc-rail-item ${activeId === item.id ? 'toc-rail-item--active' : ''}`}
      aria-current={activeId === item.id ? 'location' : undefined}
      onClick={() => {
        const target = document.getElementById(item.id);
        if (!target) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: reduced ? 'auto' : 'smooth' });
        setActiveId(item.id);
      }}>
      <span className="toc-rail-dot" aria-hidden="true" />
      <span className="toc-rail-label">{item.label}</span>
    </button>)}
  </nav>;
}
