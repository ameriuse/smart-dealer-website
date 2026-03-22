/**
 * Template Registry — Single source of truth for all template-driven behavior.
 *
 * Each template defines its layout, CTA, and section config.
 * Pages consume this via resolveTemplate() — no scattered isLuxury/isModern booleans.
 *
 * DB IDs are stable: 'classic' | 'modern' | 'luxury' | 'finance-first'
 * Display names shown to end users: APEX | SHIFT | PRISM | Finance-First
 */

export type TemplateId = 'classic' | 'modern' | 'luxury' | 'finance-first';

export interface TemplateConfig {
  id: TemplateId;
  /** Public display name (shown in UI, not stored in DB) */
  name: string;

  theme: {
    /** Inject dark mode class onto <html> element */
    dark: boolean;
    /**
     * Full CSS variable string to override dealer colors.
     * null = use dealer's configured primaryColor/secondaryColor/accentColor.
     */
    cssVarsOverride: string | null;
    /**
     * Header background treatment:
     * - 'primary' = solid primary color (APEX: blue/branded header)
     * - 'white'   = white/gray header with light border (SHIFT, Finance-First)
     * - 'dark'    = dark/transparent header (PRISM: dark luxury header)
     */
    headerBg: 'primary' | 'white' | 'dark';
    /** Extra border class appended to the header (e.g., 'border-[#333333]') */
    headerExtraBorderClass: string;
    /**
     * Nav link color scheme:
     * - 'white-on-primary' = white text on colored header (APEX)
     * - 'gray-on-white'    = gray text on white header (SHIFT, Finance-First)
     * - 'gold-on-dark'     = gray/gold text on dark header (PRISM)
     */
    navStyle: 'white-on-primary' | 'gray-on-white' | 'gold-on-dark';
    /** Logo text color when no logo image is set */
    logoOnDark: boolean;
    /** Phone link text color treatment */
    phoneOnDark: boolean;
  };

  nav: {
    /** Header CTA button label */
    ctaLabel: string;
    /**
     * CTA button style:
     * - 'inverse'    = white bg, primary text (APEX)
     * - 'primary'    = primary bg, white text (SHIFT, PRISM)
     * - 'green-pulse'= primary bg, white text, pulse animation (Finance-First)
     */
    ctaVariant: 'inverse' | 'primary' | 'green-pulse';
    /** CTA links to this path (relative to /d/[slug]/) */
    ctaPath: 'financing' | 'contact';
  };

  homepage: {
    /** Hero section layout variant */
    heroVariant: 'search' | 'fullbleed' | 'finance';
    /** Where featured vehicles appear relative to trust pillars */
    featuredPosition: 'before-trust' | 'after-trust';
    /** Number of columns in the featured vehicle grid */
    featuredGridCols: 2 | 3;
    /** Show the "Shop by Budget" price-range grid */
    showBudget: boolean;
    /** Show the "Browse by Type" body style grid */
    showBrowseByType: boolean;
    /** Show the final dark "Ready to Find Your Next Car?" CTA section */
    showFinalCta: boolean;
  };

  srp: {
    /** Show the left filter sidebar on desktop */
    showSidebar: boolean;
    /** Number of vehicle card columns in the grid */
    gridCols: 2 | 3;
    /** Show a monthly budget filter bar above the vehicle grid */
    showBudgetBar: boolean;
  };

  vdp: {
    /**
     * Where the finance calculator widget appears in the desktop sidebar:
     * - 'top'    = before action buttons (Finance-First)
     * - 'bottom' = after action buttons (APEX, SHIFT)
     * - 'none'   = calculator hidden (PRISM — inquiry focused)
     */
    calculatorPosition: 'top' | 'bottom' | 'none';
    /**
     * CTA set shown in the action buttons block:
     * - 'full'         = financing + trade-in + call + text + email
     * - 'inquiry-only' = schedule + request info + call + email (PRISM)
     */
    ctaSet: 'full' | 'inquiry-only';
    /** Primary CTA button label (used in 'full' set) */
    primaryCtaLabel: string;
    /** Show the "Get Trade-In Value" button */
    showTradeInButton: boolean;
    /** Optional note shown above the lead form; null = no note */
    leadFormNote: string | null;
    /**
     * Mobile sticky bottom bar behavior:
     * - 'standard' = Call + Text (or Finance fallback) + Schedule
     * - 'inquiry'  = Call + Inquire (PRISM)
     */
    mobileBarVariant: 'standard' | 'inquiry';
  };
}

// PRISM gold color — referenced in CSS override and used in dark theme
const PRISM_GOLD = '#c9a84c';

const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  /**
   * APEX (classic) — Volume Retail
   * Trust-first homepage, sidebar + 3-col SRP, full CTA set VDP.
   * Branded primary-color header.
   */
  classic: {
    id: 'classic',
    name: 'APEX',
    theme: {
      dark: false,
      cssVarsOverride: null,
      headerBg: 'primary',
      headerExtraBorderClass: '',
      navStyle: 'white-on-primary',
      logoOnDark: true,
      phoneOnDark: true,
    },
    nav: {
      ctaLabel: 'Get Pre-Approved',
      ctaVariant: 'inverse',
      ctaPath: 'financing',
    },
    homepage: {
      heroVariant: 'search',
      featuredPosition: 'after-trust',
      featuredGridCols: 3,
      showBudget: true,
      showBrowseByType: true,
      showFinalCta: true,
    },
    srp: {
      showSidebar: true,
      gridCols: 3,
      showBudgetBar: false,
    },
    vdp: {
      calculatorPosition: 'bottom',
      ctaSet: 'full',
      primaryCtaLabel: 'Apply for Financing',
      showTradeInButton: true,
      leadFormNote: null,
      mobileBarVariant: 'standard',
    },
  },

  /**
   * SHIFT (modern) — Contemporary Clean
   * Featured-first homepage (before trust), sidebar + 2-col SRP, full CTA set VDP.
   * Clean white header. No budget/browse sections.
   */
  modern: {
    id: 'modern',
    name: 'SHIFT',
    theme: {
      dark: false,
      cssVarsOverride: null,
      headerBg: 'white',
      headerExtraBorderClass: '',
      navStyle: 'gray-on-white',
      logoOnDark: false,
      phoneOnDark: false,
    },
    nav: {
      ctaLabel: 'Get Pre-Approved',
      ctaVariant: 'primary',
      ctaPath: 'financing',
    },
    homepage: {
      heroVariant: 'search',
      featuredPosition: 'before-trust',
      featuredGridCols: 2,
      showBudget: false,
      showBrowseByType: false,
      showFinalCta: true,
    },
    srp: {
      showSidebar: true,
      gridCols: 2,
      showBudgetBar: false,
    },
    vdp: {
      calculatorPosition: 'bottom',
      ctaSet: 'full',
      primaryCtaLabel: 'Get Pre-Approved',
      showTradeInButton: true,
      leadFormNote: 'Schedule a test drive or ask us anything about this vehicle.',
      mobileBarVariant: 'standard',
    },
  },

  /**
   * PRISM (luxury) — Premium & Sophisticated
   * Full-bleed dark hero, no search bar. No sidebar, 2-col SRP.
   * Inquiry-only VDP: no calculator, no financing link, no trade-in.
   * Schedule + Inquire CTAs only. Gold accent throughout.
   */
  luxury: {
    id: 'luxury',
    name: 'PRISM',
    theme: {
      dark: true,
      cssVarsOverride: `--primary: ${PRISM_GOLD}; --secondary: #a8852b; --accent: ${PRISM_GOLD}; --primary-foreground: #0a0a0a; --bg: #0a0a0a; --surface: #1a1a1a; --text: #f5f5f5;`,
      headerBg: 'dark',
      headerExtraBorderClass: 'border-[#333333]',
      navStyle: 'gold-on-dark',
      logoOnDark: true,
      phoneOnDark: true,
    },
    nav: {
      ctaLabel: 'Private Inquiries',
      ctaVariant: 'primary',
      ctaPath: 'contact',
    },
    homepage: {
      heroVariant: 'fullbleed',
      featuredPosition: 'after-trust',
      featuredGridCols: 2,
      showBudget: false,
      showBrowseByType: false,
      showFinalCta: false,
    },
    srp: {
      showSidebar: false,
      gridCols: 2,
      showBudgetBar: false,
    },
    vdp: {
      calculatorPosition: 'none',
      ctaSet: 'inquiry-only',
      primaryCtaLabel: 'Schedule a Showing',
      showTradeInButton: false,
      leadFormNote: 'Request more information about this vehicle from our team.',
      mobileBarVariant: 'inquiry',
    },
  },

  /**
   * Finance-First — Credit-Forward
   * Finance-hero with monthly budget selector. Budget bar above SRP grid.
   * Calculator-first VDP, "Apply in 60 Seconds" CTA.
   */
  'finance-first': {
    id: 'finance-first',
    name: 'Finance-First',
    theme: {
      dark: false,
      cssVarsOverride: null,
      headerBg: 'white',
      headerExtraBorderClass: 'border-b-2',
      navStyle: 'gray-on-white',
      logoOnDark: false,
      phoneOnDark: false,
    },
    nav: {
      ctaLabel: '✓ Apply in 60s',
      ctaVariant: 'green-pulse',
      ctaPath: 'financing',
    },
    homepage: {
      heroVariant: 'finance',
      featuredPosition: 'after-trust',
      featuredGridCols: 3,
      showBudget: true,
      showBrowseByType: false,
      showFinalCta: false,
    },
    srp: {
      showSidebar: true,
      gridCols: 3,
      showBudgetBar: true,
    },
    vdp: {
      calculatorPosition: 'top',
      ctaSet: 'full',
      primaryCtaLabel: '✓ Apply in 60 Seconds',
      showTradeInButton: true,
      leadFormNote: 'Get pre-approved in 60 seconds — no hard credit pull required.',
      mobileBarVariant: 'standard',
    },
  },
};

/**
 * Resolve a TemplateConfig from a raw templateId string (from DB/websiteConfig).
 * Falls back to APEX (classic) for unknown or missing IDs.
 */
export function resolveTemplate(templateId: string | null | undefined): TemplateConfig {
  const id = (templateId ?? 'classic') as TemplateId;
  return TEMPLATES[id] ?? TEMPLATES.classic;
}
