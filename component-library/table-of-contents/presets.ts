export type TocItem = {
  id: string;
  label: string;
};

type PageToc = {
  page: string;
  items: TocItem[];
};

export const PAGE_TOCS: PageToc[] = [
  {
    page: '/',
    items: [
      { id: 'credibility', label: 'Experience' },
      { id: 'problem-recognition', label: 'Problems' },
      { id: 'how-gws-works', label: 'How It Works' },
      { id: 'solutions', label: 'Solutions' },
    ],
  },
  {
    page: '/about',
    items: [
      { id: 'founder-hero-h1', label: 'Founder' },
      { id: 'why-gws', label: 'Why GWS' },
      { id: 'experience', label: 'Experience' },
      { id: 'diagnostic-h2', label: 'Diagnostic' },
      { id: 'about-closing-cta', label: 'Next Step' },
    ],
  },
  {
    page: '/framework',
    items: [
      { id: 'why-revenue-matters', label: 'Why Revenue Infrastructure' },
      { id: 'nine-domains', label: 'Nine Domains' },
      { id: 'how-it-works', label: 'How It Works' },
      { id: 'maturity-model', label: 'Maturity Model' },
      { id: 'framework-closing', label: 'Next Step' },
    ],
  },
  {
    page: '/ai-ready-website',
    items: [
      { id: 'ai-ready-title', label: 'Overview' },
      { id: 'ai-ready-problem-h2', label: 'The Problem' },
      { id: 'ai-ready-approach-h2', label: 'Approach' },
      { id: 'ai-ready-outcomes-h2', label: 'Outcomes' },
      { id: 'ai-ready-closing-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/ai-visibility',
    items: [
      { id: 'ai-visibility-hero-title', label: 'Overview' },
      { id: 'buyer-journey', label: 'Buyer Journey' },
      { id: 'ai-evolution-title', label: 'AI Search Evolution' },
      { id: 'entity-optimization', label: 'Entity Optimization' },
      { id: 'closing-cta-title', label: 'Next Step' },
    ],
  },
  {
    page: '/financial-advisors',
    items: [
      { id: 'financial-advisors-h1', label: 'Overview' },
      { id: 'advisory-reality-h2', label: 'The Reality' },
      { id: 'leakage-h2', label: 'Revenue Leakage' },
      { id: 'advisory-journey-h2', label: 'Journey' },
      { id: 'faq-h2', label: 'FAQ' },
      { id: 'closing-cta-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/insurance-agencies',
    items: [
      { id: 'insurance-hero-h1', label: 'Overview' },
      { id: 'problem-h2', label: 'The Problem' },
      { id: 'trust-h2', label: 'Trust' },
      { id: 'ai-discovery-h2', label: 'AI Discovery' },
      { id: 'faq-h2', label: 'FAQ' },
      { id: 'insurance-closing-cta', label: 'Next Step' },
    ],
  },
  {
    page: '/home-services',
    items: [
      { id: 'home-services-h1', label: 'Overview' },
      { id: 'problem-model-h2', label: 'The Problem' },
      { id: 'journey-h2', label: 'Journey' },
      { id: 'outcomes-h2', label: 'Outcomes' },
      { id: 'closing-cta-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/ai-visibility-call',
    items: [
      { id: 'ai-visibility-call-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/crm-automation',
    items: [
      { id: 'crm-hero-title', label: 'Overview' },
      { id: 'problem-section', label: 'The Problem' },
      { id: 'approach-h2', label: 'Approach' },
      { id: 'closing-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/solutions',
    items: [
      { id: 'solutions-hero-title', label: 'Overview' },
      { id: 'digital-presence-title', label: 'Digital Presence' },
      { id: 'lead-response-title', label: 'Lead Response' },
      { id: 'sales-operations-title', label: 'Sales Operations' },
      { id: 'revenue-intelligence-title', label: 'Revenue Intelligence' },
      { id: 'connected-system-title', label: 'Connected System' },
      { id: 'constraint-title', label: 'Diagnose First' },
      { id: 'outcomes-title', label: 'Outcomes' },
      { id: 'solutions-closing-cta', label: 'Next Step' },
    ],
  },
  {
    page: '/conversion-systems',
    items: [
      { id: 'conversion-systems-title', label: 'Overview' },
      { id: 'business-problem-h2', label: 'The Problem' },
      { id: 'gws-approach-h2', label: 'Approach' },
      { id: 'after-hours-cta-h2', label: 'After-Hours' },
      { id: 'closing-band-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/revenue-diagnostic',
    items: [
      { id: 'revenue-diagnostic-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/ai-visibility-review',
    items: [
      { id: 'ai-visibility-review-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/google-business-profile-optimization-review',
    items: [
      { id: 'gbp-review-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/diagnostic',
    items: [
      { id: 'questions', label: 'Questions' },
      { id: 'assessment-principles', label: 'Principles' },
      { id: 'methodology', label: 'Methodology' },
      { id: 'executive-scorecard', label: 'Scorecard' },
      { id: 'heat-map', label: 'Heat Map' },
      { id: 'prioritization-matrix', label: 'Prioritization' },
      { id: 'assessment-family', label: 'Assessments' },
      { id: 'improvement-roadmap', label: 'Roadmap' },
      { id: 'executive-report', label: 'Report' },
      { id: 'diagnostic-outputs', label: 'Outputs' },
      { id: 'begin-diagnostic', label: 'Get Started' },
    ],
  },
  {
    page: '/diagnostic-platform',
    items: [
      { id: 'questions', label: 'Questions' },
      { id: 'assessment-principles', label: 'Principles' },
      { id: 'methodology', label: 'Methodology' },
      { id: 'executive-scorecard', label: 'Scorecard' },
      { id: 'heat-map', label: 'Heat Map' },
      { id: 'prioritization-matrix', label: 'Prioritization' },
      { id: 'assessment-family', label: 'Assessments' },
      { id: 'improvement-roadmap', label: 'Roadmap' },
      { id: 'executive-report', label: 'Report' },
      { id: 'diagnostic-outputs', label: 'Outputs' },
      { id: 'begin-diagnostic', label: 'Get Started' },
    ],
  },
  {
    page: '/resources',
    items: [
      { id: 'platform-status', label: 'Platform Status' },
      { id: 'frameworks', label: 'Frameworks' },
      { id: 'research', label: 'Research' },
      { id: 'industry-guides', label: 'Industry Guides' },
      { id: 'case-studies', label: 'Case Studies' },
      { id: 'executive-briefs', label: 'Executive Briefs' },
      { id: 'whitepapers', label: 'Whitepapers' },
      { id: 'assessments', label: 'Assessments' },
    ],
  },
  {
    page: '/industries',
    items: [
      { id: 'industries-h1', label: 'Overview' },
      { id: 'industries-closing-cta', label: 'Next Step' },
    ],
  },
];

