# Revenue Infrastructure Visual

Third component. Based on the pasted gws-layout from client/src/components/revenue-infrastructure-package/App.tsx. Preserves the surrounding section heading and the full three-column interactive diagram.

## Files

revenue-infrastructure/RevenueInfrastructure.tsx; Diagram.tsx; styles.css. Based on the existing RevenueInfrastructurePlugAndPlayHost.tsx wrapper.

## Usage

Import { RevenueInfrastructure } from './revenue-infrastructure/RevenueInfrastructure'. Render <RevenueInfrastructure />. Requires React, React DOM, Vite inline CSS handling, and Tailwind CSS v4 processing. The isolated preview includes the required build configuration.

## Configuration

tools and capabilities: arrays of { label, detail }. outcomes: array of { phase, desc, detail }. consequences and steps: string arrays. Existing GWS copy is the default. Section and column headings retain the original design and can be edited in Diagram.tsx when a new variant is needed.

## Behavior and responsive layout

Expandable disconnected-tool pills, connected-system capability details, outcomes, and animated connectors. At narrow widths the layout stacks and capabilities use expandable controls. The existing styles are encapsulated in a shadow root. Reduced-motion preference disables the canvas spotlight at mount; CSS motion overrides suppress decorative animations.

## Reuse notes

This is a GWS visual module, with fixed structural headings and configurable list content. Use one instance per page because the wrapper retains the revenue-infrastructure ID. Review industry-specific content before reuse; default performance claims are copied from the source, not independently validated. The live website is unchanged.
