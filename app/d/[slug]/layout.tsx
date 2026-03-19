import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDealer } from '@/lib/api';
import type { Metadata } from 'next';
import MobileMenu from './MobileMenu';

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
    { href: `/d/${slug}/contact`, label: 'Contact' },
  ];

  const fullAddress = [dealer.address, dealer.city, dealer.state]
    .filter(Boolean)
    .join(', ');

  return (
    <>
      <style>{`
        :root {
          --primary: #2563eb;
          --secondary: #1e40af;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <Link href={`/d/${slug}`} className="flex items-center gap-3 min-w-0">
              {dealer.logoUrl ? (
                <Image
                  src={dealer.logoUrl}
                  alt={dealer.name}
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span
                  className="text-xl font-bold truncate"
                  style={{ color: 'var(--primary, #2563eb)' }}
                >
                  {dealer.name}
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/d/${slug}/inventory`}
                className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: 'var(--primary, #2563eb)' }}
              >
                Browse Vehicles
              </Link>
            </nav>

            {/* Mobile menu button */}
            <MobileMenu slug={slug} navLinks={navLinks} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dealer Info */}
            <div>
              {dealer.logoUrl ? (
                <Image
                  src={dealer.logoUrl}
                  alt={dealer.name}
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain mb-3 brightness-0 invert"
                />
              ) : (
                <div className="text-xl font-bold text-white mb-2">{dealer.name}</div>
              )}
              {dealer.description && (
                <p className="text-sm text-gray-400 leading-relaxed">{dealer.description}</p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Contact
              </h3>
              {fullAddress && (
                <p className="text-sm mb-2 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {fullAddress}
                </p>
              )}
              {dealer.phone && (
                <a
                  href={`tel:${dealer.phone}`}
                  className="text-sm mb-2 flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {dealer.phone}
                </a>
              )}
              {dealer.email && (
                <a
                  href={`mailto:${dealer.email}`}
                  className="text-sm flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {dealer.email}
                </a>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} {dealer.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Powered by{' '}
              <span className="font-semibold text-gray-500">Smart Dealer</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
