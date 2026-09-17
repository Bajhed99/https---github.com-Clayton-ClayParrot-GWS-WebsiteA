import { ChevronDown, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GWS_NAV_GROUPS, GWS_NAV_LINKS } from "../shared/navigation";
import { shouldCompactStickyHeader } from "../shared/stickyHeader";

const OFFICIAL_LOGO = "/assets/images/branding/growthworks-official-logo.png";

export type SiteHeaderProps = {
  groups?: typeof GWS_NAV_GROUPS;
  links?: readonly { label: string; href: string }[];
  logoSrc?: string;
  cta?: { label: string; href: string };
  currentPath?: string;
};
export default function SiteHeader({ groups = GWS_NAV_GROUPS, links = GWS_NAV_LINKS, logoSrc = OFFICIAL_LOGO, cta = { label: "Book a Revenue Diagnostic", href: "/revenue-diagnostic" }, currentPath = "/" }: SiteHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [isHeaderCompact, setHeaderCompact] = useState(false);
  const navigateTo = (href: string) => { window.location.assign(href); };

  useEffect(() => {
    const updateHeaderState = () => {
      const nextCompactState = shouldCompactStickyHeader(window.scrollY);
      setHeaderCompact((currentState) => currentState === nextCompactState ? currentState : nextCompactState);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <header
      className={`site-header ${isHeaderCompact ? "is-compact" : ""}`}
      onMouseLeave={() => setActiveDesktopMenu(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") { setActiveDesktopMenu(null); setMobileNavOpen(false); }
      }}
    >
      <div className="site-shell header-shell">
        <a href="/" className="brand" aria-label="GrowthWorks Systems home">
          <span className="brand-mark" aria-hidden="true"><img src={logoSrc} alt="" /></span>
          <span className="brand-wordmark"><span>GrowthWorks</span><span className="brand-wordmark-systems">Systems</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="desktop-nav-links">
            {groups.map((group) => {
              const isOpen = activeDesktopMenu === group.label;
              const groupIsActive = currentPath === group.href || group.items.some((item) => item.href === currentPath);
              const menuId = `desktop-menu-${group.label.toLowerCase().replace(/ /g, "-")}`;
              return (
                <div key={group.label} className="nav-group" onMouseEnter={() => setActiveDesktopMenu(group.label)}>
                  <button type="button" className={`nav-link nav-link--group ${isOpen || groupIsActive ? "is-active" : ""}`} aria-expanded={isOpen} aria-controls={menuId}  onClick={() => { setActiveDesktopMenu(isOpen ? null : group.label); }}>
                    {group.label}<ChevronDown size={13} aria-hidden="true" />
                  </button>
                  {isOpen && <div id={menuId} className="desktop-dropdown" aria-label={`${group.label} menu`}>
                    <a href={group.href} className="desktop-dropdown-link">{group.label} overview</a>{group.items.map((item) => <a key={item.label} href={item.href} className="desktop-dropdown-link" onClick={() => setActiveDesktopMenu(null)}><strong>{item.label}</strong><span>{item.description}</span></a>)}
                  </div>}
                </div>
              );
            })}
            {links.map((item) => {
              const linkIsActive = currentPath === item.href;
              return <a key={item.label} href={item.href} className={`nav-link ${linkIsActive ? "is-active" : ""}`} onClick={() => setActiveDesktopMenu(null)}>{item.label}</a>;
            })}
          </div>
        </nav>
        <div className="header-actions">
          <a href={cta.href} className="button button--dark header-cta">{cta.label}</a>
          <button type="button" className="menu-button" aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>{mobileNavOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <div hidden={!mobileNavOpen} className={`mobile-nav ${mobileNavOpen ? "is-open" : ""}`}><nav className="site-shell" aria-label="Mobile primary navigation">
        {groups.map((group) => <div className="mobile-nav-group" key={group.label}><button type="button" className="mobile-nav-link" onClick={() => { navigateTo(group.href); setMobileNavOpen(false); }}>{group.label}</button><div className="mobile-nav-submenu">{group.items.map((item) => <a key={item.label} href={item.href} className="mobile-nav-sublink" onClick={() => setMobileNavOpen(false)}>{item.label}</a>)}</div></div>)}
        {links.map((item) => <a key={item.label} href={item.href} className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>{item.label}</a>)}
      </nav></div>
    </header>
  );
}
