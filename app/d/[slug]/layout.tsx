import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDealer } from '@/lib/api';
import type { Metadata } from 'next';
import MobileMenu from './MobileMenu';
import ChatWidget from '@/components/ChatWidget';
import DarkModeToggle from '@/components/DarkModeToggle';
import { resolveTemplate } from '@/lib/templates/registry';

interface DealerLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return { title: 'Dealer Not Found' };
  return {
    title: {
      default: dealer.name,
      template: `%s | ${dealer.name}`,
    },
    description: dealer.description ?? `Browse inventory at ${dealer.name}`,
  };
}

export default async function DealerLayout({ children, params }: DealerLayoutProps) {
  const dealer = await getDealer(params.slug);

  if (!dealer) {
    notFound();
  }

  const slug = params.slug;

  const navLinks = [
    { href: `/d/${slug}/inventory`, label: 'Inventory' },
    { href: `/d/${slug}/financing`, label: 'Financing' },
    { href: `/d/${slug}/trade-in`, label: 'Trade-In Value' },
    { href: `/d/${slug}/contact`, label: 'Contact' },
  ];

  const fullAddress = [dealer.address, dealer.city, dealer.state]
    .filter(Boolean)
    .join(', ');

  // ── Template resolution (single source of truth) ──────────────────────────
  const cfg = dealer.websiteConfig;
  const template = resolveTemplate(cfg?.templateId);

  const primaryColor = cfg?.primaryColor ?? '#1d4ed8';
  const secondaryColor = cfg?.secondaryColor ?? '#1e40af';
  const accentColor = cfg?.accentColor ?? '#3B82F6';
  const displayLogoUrl = cfg?.logoUrl || dealer.logoUrl;
  const isDemoDealer = slug === 'demo-dealership';
  const dealerPrimaryColor = isDemoDealer ? '#2f6bff' : primaryColor;
  const dealerSecondaryColor = isDemoDealer ? '#2458d8' : secondaryColor;
  const dealerAccentColor = isDemoDealer ? '#2dd4ff' : accentColor;

  // CSS variables: use template override (PRISM fixed gold) or dealer config colors
  const cssVars =
    isDemoDealer
      ? `--primary: ${dealerPrimaryColor}; --secondary: ${dealerSecondaryColor}; --accent: ${dealerAccentColor}; --primary-foreground: #ffffff; --bg: #ffffff; --surface: #f8fafc; --text: #0f172a;`
      : template.theme.cssVarsOverride ??
        `--primary: ${dealerPrimaryColor}; --secondary: ${dealerSecondaryColor}; --accent: ${dealerAccentColor}; --primary-foreground: #ffffff; --bg: #ffffff; --surface: #f8fafc; --text: #0f172a;`;

  // ── Header class resolution ────────────────────────────────────────────────
  const headerClass =
    isDemoDealer
      ? 'border-b border-white/10 bg-[#08111f]/95 backdrop-blur sticky top-0 z-50 shadow-sm'
      : template.theme.headerBg === 'dark'
      ? `border-b sticky top-0 z-50 ${template.theme.headerExtraBorderClass}`
      : template.theme.headerBg === 'primary'
      ? `sticky top-0 z-50 shadow-sm ${template.theme.headerExtraBorderClass}`
      : `bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm ${template.theme.headerExtraBorderClass}`.trim();

  // ── Nav/logo/phone styling ─────────────────────────────────────────────────
  const navLinkClass =
    isDemoDealer
      ? 'px-4 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors'
      : template.theme.navStyle === 'white-on-primary'
      ? 'px-4 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors'
      : template.theme.navStyle === 'gold-on-dark'
      ? 'px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-[#c9a84c] transition-colors'
      : 'px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors';

  const logoTextClass = isDemoDealer || template.theme.logoOnDark
    ? 'text-lg font-bold text-white truncate max-w-[200px]'
    : 'text-lg font-bold text-gray-900 dark:text-white truncate max-w-[200px]';

  const phoneClass = isDemoDealer || template.theme.phoneOnDark
    ? 'flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors whitespace-nowrap'
    : 'flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-900 transition-colors whitespace-nowrap';

  const phoneIconClass = `w-4 h-4 flex-shrink-0 ${isDemoDealer || template.theme.phoneOnDark ? 'text-white/60' : 'text-gray-400'}`;

  return (
    <div className={`template-${template.id}`}>
      <style>{`:root { ${cssVars} }`}</style>

      {/* Dark mode injection (PRISM only) */}
      {template.theme.dark && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');`,
          }}
        />
      )}

      {/* ── Header ── */}
      <header
        className={headerClass}
        style={!isDemoDealer && template.theme.headerBg === 'primary' ? { backgroundColor: 'var(--primary)' } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-3">

            {/* Mobile hamburger (left) */}
            <MobileMenu slug={slug} navLinks={navLinks} phone={dealer.phone ?? null} darkHeader={isDemoDealer} />

            {/* Logo */}
            <Link href={`/d/${slug}`} className="flex items-center min-w-0 mr-auto lg:mr-0 flex-shrink-0">
              {displayLogoUrl ? (
                <Image
                  src={displayLogoUrl}
                  alt={dealer.name}
                  width={140}
                  height={44}
                  className={`h-10 w-auto object-contain ${isDemoDealer ? 'brightness-0 invert drop-shadow-[0_1px_8px_rgba(255,255,255,0.18)]' : ''}`}
                  priority
                />
              ) : (
                <span className={logoTextClass}>{dealer.name}</span>
              )}
            </Link>

            {/* Desktop nav — centered */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right: dark mode + phone + CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <DarkModeToggle />
              {dealer.phone && (
                <a href={`tel:${dealer.phone}`} className={phoneClass}>
                  <svg className={phoneIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {dealer.phone}
                </a>
              )}

              {/* Header CTA — driven by template.nav */}
              {template.nav.ctaVariant === 'inverse' ? (
                <Link
                  href={`/d/${slug}/${template.nav.ctaPath}`}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-white transition-all hover:bg-gray-100 whitespace-nowrap"
                  style={{ color: 'var(--primary)' }}
                >
                  {template.nav.ctaLabel}
                </Link>
              ) : template.nav.ctaVariant === 'green-pulse' ? (
                <Link
                  href={`/d/${slug}/${template.nav.ctaPath}`}
                  className="px-4 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:brightness-90 whitespace-nowrap"
                  style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                >
                  {template.nav.ctaLabel}
                </Link>
              ) : (
                <Link
                  href={`/d/${slug}/${template.nav.ctaPath}`}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-90 whitespace-nowrap"
                  style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                >
                  {template.nav.ctaLabel}
                </Link>
              )}
            </div>

            {/* Mobile: dark mode + call button (right) */}
            <div className="lg:hidden flex items-center gap-2">
              <DarkModeToggle />
              {dealer.phone && (
                <a
                  href={`tel:${dealer.phone}`}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors flex-shrink-0"
                  aria-label={`Call ${dealer.name}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="min-h-screen bg-white dark:bg-gray-950">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`grid grid-cols-1 gap-10 ${dealer.businessHours && dealer.businessHours.length > 0 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>

            {/* Dealer info + social links */}
            <div>
              {displayLogoUrl ? (
                <Image
                  src={displayLogoUrl}
                  alt={dealer.name}
                  width={130}
                  height={44}
                  className="h-10 w-auto object-contain mb-4 brightness-0 invert opacity-70"
                />
              ) : (
                <div className="text-lg font-bold text-white mb-3">{dealer.name}</div>
              )}
              <div className="space-y-1.5 text-sm text-gray-400">
                {fullAddress && <p>{fullAddress}</p>}
                {dealer.phone && (
                  <a href={`tel:${dealer.phone}`} className="hover:text-white transition-colors block">
                    {dealer.phone}
                  </a>
                )}
                {dealer.email && (
                  <a href={`mailto:${dealer.email}`} className="hover:text-white transition-colors block">
                    {dealer.email}
                  </a>
                )}
              </div>
              {/* Social links */}
              {cfg?.socialLinks && (
                <div className="flex gap-3 mt-4">
                  {cfg.socialLinks.facebook && (
                    <a href={cfg.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {cfg.socialLinks.instagram && (
                    <a href={cfg.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  )}
                  {cfg.socialLinks.twitter && (
                    <a href={cfg.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="Twitter / X">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                  {cfg.socialLinks.youtube && (
                    <a href={cfg.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  )}
                  {cfg.socialLinks.google && (
                    <a href={cfg.socialLinks.google} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="Google">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Hours */}
            {dealer.businessHours && dealer.businessHours.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Hours</h3>
                <ul className="space-y-1.5">
                  {dealer.businessHours.map((bh) => {
                    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    const day = dayNames[bh.dayOfWeek] ?? `Day ${bh.dayOfWeek}`;
                    return (
                      <li key={bh.dayOfWeek} className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-gray-400 w-8">{day}</span>
                        {bh.isOpen && bh.openTime && bh.closeTime ? (
                          <span className="text-gray-300 text-xs">{bh.openTime} – {bh.closeTime}</span>
                        ) : (
                          <span className="text-gray-600 text-xs">Closed</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Footer CTA */}
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Get Started</h3>
              <div className="space-y-2.5">
                <Link
                  href={`/d/${slug}/inventory`}
                  className="block text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Browse Inventory
                </Link>
                <Link
                  href={`/d/${slug}/financing`}
                  className="block text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                >
                  Get Pre-Approved
                </Link>
                {dealer.phone && (
                  <a
                    href={`tel:${dealer.phone}`}
                    className="block text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-green-400 border border-green-800/50 hover:bg-green-900/30 transition-colors"
                  >
                    Call Us Now
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} {dealer.name}. All rights reserved.
                    {isDemoDealer && (
                      <>
                        {' '}
                        Powered by Smart Dealer - an Ameriuse product.
                      </>
                    )}
            </p>
            {cfg?.footerText && (
              <p className="text-xs text-gray-600">{cfg.footerText}</p>
            )}
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget dealerName={dealer.name} slug={slug} />
    </div>
  );
}
