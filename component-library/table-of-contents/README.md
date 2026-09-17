# Table of Contents Rail

Fifth component. Based on the pasted toc-rail markup and client/src/components/TableOfContents.tsx.

## Files

table-of-contents/TableOfContents.tsx; presets.ts; shared/styles.css. Presets retain the existing page maps as reference data.

## Usage

Import TableOfContents from './table-of-contents/TableOfContents' and import './shared/styles.css' once. Render <TableOfContents items={[{ id: 'overview', label: 'Overview' }, { id: 'solutions', label: 'Solutions' }]} offset={80} />. Matching section IDs must exist in the document.

## Configuration

items: ordered array of { id, label }, supplied by the page. offset: sticky-header clearance in pixels, default 80. An empty item list renders nothing. Missing targets are ignored safely.

## Behavior and responsive layout

Tracks the last section above the header offset using scheduled scroll updates. Buttons jump to sections with the configured clearance. Reduced-motion users receive immediate scrolling. The active button exposes aria-current=location; keyboard focus reveals labels. Preserves the fixed rail, crimson active styling, and narrow-screen spacing.

## Reuse notes

Pass each future page's own section IDs instead of adding route logic inside the component. Verify IDs on established industry pages before using a preset: they are copied reference data, not a guarantee that all historical anchors still exist. Use one rail per page. The website's original component is unchanged.
