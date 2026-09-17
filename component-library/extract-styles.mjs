import fs from 'node:fs';
import postcss from 'postcss';
const source = postcss.parse(fs.readFileSync('client/src/index.css', 'utf8'));
const wanted = /\.(?:site-header|header-|brand(?:\b|-)|desktop-|nav-|mobile-nav|menu-button|site-footer|footer-|site-shell|button(?:\b|--)|toc-rail|homepage-visual-section)/;
function select(container) {
  for (const node of [...container.nodes ?? []]) {
    if (node.type === 'rule') {
      if (node.selector === ':root') continue;
      const selectors = node.selectors.filter(s => wanted.test(s));
      if (selectors.length) node.selector = selectors.join(',\n'); else node.remove();
    } else if (node.type === 'atrule' && node.name === 'media') {
      select(node); if (!node.nodes.length) node.remove();
    } else node.remove();
  }
}
select(source);
fs.writeFileSync('component-library/shared/styles.css', `/* Extracted from client/src/index.css. Import once when intentionally integrating. */\n` + source.toString() + `
[hidden] { display: none !important; }
.toc-rail-item:focus-visible, .toc-rail-item:focus-visible .toc-rail-label { opacity: 1; color: var(--gws-crimson); transform: none; }
.toc-rail-item:focus-visible { outline: 2px solid var(--gws-crimson); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .toc-rail * { transition: none !important; } }
`);
