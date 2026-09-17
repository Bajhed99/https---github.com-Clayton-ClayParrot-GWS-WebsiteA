# Site Footer

Second component in the reusable library. Extracted from client/src/components/SiteFooter.tsx, matching the supplied footer reference.

## Files

site-footer/SiteFooter.tsx; shared/styles.css; assets/growthworks-official-logo-white.png.

## Usage

Import SiteFooter from './site-footer/SiteFooter' and import './shared/styles.css' once. Render <SiteFooter year={2026} />. Supply logoSrc if the logo lives at a different URL.

## Configuration

groups: columns with title and links. Each link may be an existing GWS label or an explicit { label, href } object; use explicit objects for new pages. description: business description. year: copyright year, defaulting to the current year. logoSrc: white logo URL.

## Behavior and responsive layout

Preserves the GWS brand column, contact links, four navigation columns, and copyright strip. Original responsive CSS adapts the columns to narrow screens. Native anchors preserve fragments, external links, mailto, and telephone behavior.

## Reuse notes

GWS contact details remain the project defaults. The previous Contact placeholder now opens the existing business email address. Provide explicit links for future solution or industry pages. Use one footer per page. The source website remains unchanged.
