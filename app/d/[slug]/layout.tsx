import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDealer } from '@/lib/api';
import type { Metadata } from 'next';
import MobileMenu from './MobileMenu';
import ChatWidget from '@/components/ChatWidget';
import DarkModeToggle from '@/components/DarkModeToggle';

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

  // Template-aware CSS variables
  const cfg = dealer.websiteConfig;
  const templateId = cfg?.templateId ?? 'classic';
  const primaryColor = cfg?.primaryColor ?? '#1d4ed8';
  const secondaryColor = cfg?.secondaryColor ?? '#1e40af';

  // Luxury template: fixed dark/gold palette
  const cssVars =
    templateId === 'luxury'
      ? `--primary: #c9a84c; --secondary: #a8852b; --primary-foreground: #0a0a0a; --bg: #0a0a0a; --surface: #1a1a1a; --text: #f5f5f5;`
      : templateId === 'modern'
      ? `--primary: ${primaryColor}; --secondary: ${secondaryColor}; --primary-foreground: #ffffff; --bg: #f8fafc; --surface: #ffffff; --text: #0f172a;`
      : `--primary: ${primaryColor}; --secondary: ${secondaryColor}; --primary-foreground: #ffffff; --bg: #ffffff; --surface: #f8fafc; --text: #0f172a;`;

  return (
    <>
      <style>{`:root { ${cssVars} }`}</style>

      {/* Luxury template: inject dark mode class immediately */}
      {templateId === 'luxury' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');`,
          }}
        />
      )}

      {/* ── Header ── */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-3">

            {/* Mobile hamburger (left) */}
            <MobileMenu slug={slug} navLinks={navLinks} phone={dealer.phone ?? null} />

            {/* Logo */}
            <Link href={`/d/${slug}`} className="flex items-center min-w-0 mr-auto lg:mr-0 flex-shrink-0">
              {dealer.logoUrl ? (
                <Image
                  src={dealer.logoUrl}
                  alt={dealer.name}
                  width={140}
                  height={44}
                  className="h-10 w-auto object-contain"
                  priority
                />
              ) : (
                <span className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-[200px]">
                  {dealer.name}
                </span>
              )}
            </Link>

            {/* Desktop nav — centered */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right: dark mode + phone + CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <DarkModeToggle />
              {dealer.phone && (
                <a
                  href={`tel:${dealer.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-900 transition-colors whitespace-nowrap"
                >
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {dealer.phone}
                </a>
              )}
              <Link
                href={`/d/${slug}/financing`}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-90 whitespace-nowrap"
                style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
              >
                Get Pre-Approved
              </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Dealer info */}
            <div>
              {dealer.logoUrl ? (
                <Image
                  src={dealer.logoUrl}
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

            {/* CTA */}
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
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget dealerName={dealer.name} slug={slug} />
    </>
  );
}
