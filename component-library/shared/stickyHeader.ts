export const STICKY_HEADER_COMPACT_THRESHOLD = 24;

export function shouldCompactStickyHeader(scrollY: number, threshold = STICKY_HEADER_COMPACT_THRESHOLD) {
  return scrollY > threshold;
}
