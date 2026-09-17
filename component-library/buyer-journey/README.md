# Buyer Journey Visual

Fourth component. Based on the pasted split-panel layout from client/src/components/buyer-journey-package/App.tsx. Preserves the complete traditional-search versus AI-assisted-discovery visual and its existing surrounding section.

## Files

buyer-journey/BuyerJourney.tsx; Diagram.tsx; styles.css; GwsParticleDrift.tsx. Based on the existing BuyerJourneyPlugAndPlayHost.tsx wrapper, including its spacing, typography, and particle treatment.

## Usage

Import { BuyerJourney } from './buyer-journey/BuyerJourney'. Render <BuyerJourney searchQuery="best b2b analytics platform" />. Requires React, React DOM, Vite inline CSS handling, and Tailwind CSS v4 processing.

## Configuration

searchQuery: displayed traditional-search query. eyebrow: section label. description: supporting paragraph. The diagram nodes, comparison headings, and remaining example copy retain the supplied design in Diagram.tsx; changing the search query alone does not rewrite the entire scenario.

## Behavior and responsive layout

Two comparison panels sit side by side on large screens and stack below the package breakpoint. Hover accents, arrows, and the particle backdrop are retained within a shadow root. Reduced-motion preference suppresses the blinking cursor at mount and decorative CSS animations; the copied particle component already observes reduced motion.

## Reuse notes

Use as an existing GWS comparison visual on solution or industry pages. Review all scenario copy together when adapting to a different industry. Use one instance per page; original section and SVG identifiers are retained inside the shadow root. The live website is unchanged.
