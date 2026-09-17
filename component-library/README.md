# Reusable component library

Isolated storage for reusable components based on this project's established industry page designs, supporting future solution and industry pages.

## Categories

- section-headers: section titles, eyebrow labels, and supporting descriptions
- cards: reusable content cards and variants
- cta: calls to action
- text-visual-layouts: responsive two-column text and visual layouts
- visual-containers: diagram and visual wrappers
- responsive-grids: reusable responsive grid layouts
- typography: heading, body, label, and supporting text presets

## Isolation

This folder is outside the website's client source and public directories. It has no website route, application imports, or global stylesheet integration. Keep examples and documentation here until components are intentionally integrated into a page.

## Implemented components — first batch

1. [Site Header](site-header/README.md)
2. [Site Footer](site-footer/README.md)
3. [Revenue Infrastructure Visual](revenue-infrastructure/README.md)
4. [Buyer Journey Visual](buyer-journey/README.md)
5. [Table of Contents Rail](table-of-contents/README.md)

These are local source copies with documented configuration, styles, and assets. They do not import the website's component implementations. The original seven category folders remain available for future extractions.

## Local preview and checks

Run from the project root:

```sh
npx vite --config component-library/vite.config.ts
npx tsc -p component-library/tsconfig.json
npx vite build --config component-library/vite.config.ts
```

The preview uses http://127.0.0.1:4317 and orders the examples header first, footer second, then the visuals and navigation rail. It is a separate entry point, not a website route. Production Tailwind scanning and Vercel uploads exclude this folder. Preview build output stays inside this folder and is ignored by Git.

## Reuse and documentation

Import individual components only when intentionally integrating them into a future page. Header, footer, and TOC use shared/styles.css; the two visual hosts carry shadow-root styles processed by Tailwind v4 and Vite. The project supplies React, React DOM, and Lucide dependencies. Logo copies are included under assets; fonts retain their existing external or system fallbacks.

Google Docs are manually maintained counterparts of the component READMEs. See [Google Drive mirror](GOOGLE-DRIVE-MIRROR.md). Automatic synchronization is not configured. The initial Google Drive overview records the earlier storage-only stage; the numbered component documents describe this implementation batch.
