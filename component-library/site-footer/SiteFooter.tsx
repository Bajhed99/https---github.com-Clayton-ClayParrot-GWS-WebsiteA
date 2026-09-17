import React from "react";
import { Linkedin, Mail, Phone } from "lucide-react";

const OFFICIAL_LOGO_WHITE = "/assets/images/branding/growthworks-official-logo-white.png";

const footerGroups = [
  { title: "Revenue Infrastructure", links: ["What Is Revenue Infrastructure?", "The Nine Domains", "Maturity Model", "Why GWS Is Different"] },
  { title: "Solutions", links: ["AI Visibility", "AI-Ready Website", "CRM & Automation", "Conversion Systems", "All Solutions"] },
  { title: "Industries", links: ["Home Services", "Financial Advisors & RIAs", "Insurance Agencies"] },
  { title: "Company", links: ["About GWS", "Resources", "Contact", "Book a Revenue Diagnostic"] },
] as const;

function FooterLink({ href, children }: { href?: string; children: React.ReactNode }) {
  const text = typeof children === "string" ? children : ""
  const resolvedHref = href || (
    text === "Book a Revenue Diagnostic" ? "/revenue-diagnostic" :
    text === "Contact" ? "mailto:clayton@growthworks-systems.com" :
    text === "The Nine Domains" ? "/framework#nine-domain-framework" :
    text === "What Is Revenue Infrastructure?" ? "/framework#canonical-definition" :
    text === "Maturity Model" ? "/framework#revenue-maturity" :
    text === "Why GWS Is Different" ? "/framework#why-revenue-matters" :
    text === "AI Visibility" ? "/ai-visibility" :
    text === "AI-Ready Website" ? "/ai-ready-website" :
    text === "CRM & Automation" ? "/crm-automation" :
    text === "Conversion Systems" ? "/conversion-systems" :
    text === "All Solutions" ? "/solutions" :
    text === "Home Services" ? "/home-services" :
    text === "Financial Advisors & RIAs" ? "/financial-advisors" :
    text === "Insurance Agencies" ? "/insurance-agencies" :
    text === "About GWS" ? "/about" :
    text === "Resources" ? "/resources" :
    "/"
  )
  return <a href={resolvedHref}>{children}</a>;
}

export type SiteFooterProps = {
  groups?: readonly { title: string; links: readonly (string | { label: string; href: string })[] }[];
  logoSrc?: string;
  description?: string;
  year?: number;
};
export default function SiteFooter({ groups = footerGroups, logoSrc = OFFICIAL_LOGO_WHITE, description = "Revenue Infrastructure for founder-led service businesses.", year = new Date().getFullYear() }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-main">
        <div className="footer-brand-column">
          <img className="footer-logo" src={logoSrc} alt="GrowthWorks Systems" />
          <span className="brand-wordmark" style={{ marginTop: 12, display: 'inline-grid', gap: 1 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, textTransform: 'uppercase', color: '#FFFFFF' }}>GrowthWorks</span>
            <span className="brand-wordmark-systems" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, textTransform: 'uppercase' }}>Systems</span>
          </span>
          <p className="footer-tagline" style={{ color: '#841617' }}>Build. Automate. Grow.</p>
          <p className="footer-description" style={{ color: 'rgba(255,255,255,0.60)' }}>{description}</p>
          <address className="footer-contact-list">
            <a href="mailto:clayton@growthworks-systems.com"><Mail size={14} aria-hidden="true" />clayton@growthworks-systems.com</a>
            <a href="tel:+12143027720"><Phone size={14} aria-hidden="true" />214–302–7720</a>
            <a href="https://www.linkedin.com/in/clayton-tidwell-11a2525/" target="_blank" rel="noopener noreferrer"><Linkedin size={14} aria-hidden="true" />LinkedIn</a>
          </address>
        </div>
        {groups.map((group) => <nav className="footer-link-group" aria-label={group.title} key={group.title}><h2>{group.title}</h2>{group.links.map((link) => <FooterLink key={typeof link === "string" ? link : link.href} href={typeof link === "string" ? undefined : link.href}>{typeof link === "string" ? link : link.label}</FooterLink>)}</nav>)}
      </div>
      <div className="footer-bottom"><div className="site-shell"><small>© {year} GrowthWorks Systems LLC. All rights reserved.</small><em>One System. Every Touchpoint. Predictable Revenue.</em></div></div>
    </footer>
  );
}
