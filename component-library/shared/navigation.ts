export type NavigationMenuItem = {
  label: string;
  description: string;
  href: string;
};

export type NavigationGroup = {
  label: string;
  href: string;
  items: readonly NavigationMenuItem[];
};

export const GWS_NAV_GROUPS: readonly NavigationGroup[] = [
  {
    label: "Revenue Infrastructure",
    href: "/framework",
    items: [
      { label: "The Framework", description: "Nine domains. One operating system.", href: "/framework" },
      { label: "Diagnostic Platform", description: "Methodology, scorecard, and roadmap.", href: "/diagnostic" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "AI Visibility", description: "Be found by AI-powered search", href: "/ai-visibility" },
      { label: "AI-Ready Website", description: "Convert attention into trust", href: "/ai-ready-website" },
      { label: "CRM & Automation", description: "Eliminate revenue leakage", href: "/crm-automation" },
      { label: "Conversion Systems", description: "Turn interest into pipeline", href: "/conversion-systems" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Home Services", description: "Built for home service businesses", href: "/home-services" },
      { label: "Financial Advisors & RIAs", description: "Retirement planners & wealth advisors", href: "/financial-advisors" },
      { label: "Insurance Agencies", description: "Independent agencies & brokerages", href: "/insurance-agencies" },
    ],
  },
] as const;

export const GWS_NAV_LINKS = [
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
] as const;
