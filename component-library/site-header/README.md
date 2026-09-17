# Site Header

First component in the reusable library. Extracted from client/src/components/SiteHeader.tsx, matching the supplied header reference.

## Files

site-header/SiteHeader.tsx; shared/navigation.ts; shared/stickyHeader.ts; shared/styles.css; assets/growthworks-official-logo.png.

## Usage

Import SiteHeader from './site-header/SiteHeader' and import './shared/styles.css' once. Render <SiteHeader currentPath="/insurance-agencies" />. Pass logoSrc when the logo asset is hosted elsewhere.

## Configuration

groups: navigation groups with label, href, and items (label, description, href). links: standalone label/href links. cta: label and href. currentPath: the active page path. logoSrc: logo URL. Defaults retain GWS navigation and branding.

## Behavior and responsive layout

Sticky header compacts after 24px of scrolling. Desktop dropdowns support hover and button activation; Escape closes menus. Mobile navigation uses the original responsive breakpoints and an accessible open/close button. Hidden mobile links are removed from keyboard navigation. Links use normal browser navigation and support modifier-click behavior.

## Reuse notes

Use one header per page. Desktop group buttons now open their dropdown; an overview link leads to the group landing page. Future solution and industry pages can supply updated groups and currentPath without editing this component. The source website remains unchanged.
