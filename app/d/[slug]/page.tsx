import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDealer, getFeaturedVehicles, getVehicles } from '@/lib/api';
import AnimatedVehicleGrid from '@/components/AnimatedVehicleGrid';
import type { TrustPillar } from '@/lib/types';
import { resolveTemplate } from '@/lib/templates/registry';

interface HomePageProps {
  params: { slug: string };
}

export const revalidate = 30;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return { title: 'Not Found' };
  const wc = dealer.websiteConfig;
  return {
    title: wc?.seoTitle
      ?? `${dealer.name} | Quality Used Cars${dealer.city ? ` in ${dealer.city}` : ''}`,
    description: wc?.seoDescription
      ?? dealer.description
      ?? `Browse ${dealer.vehicleCount} quality used vehicles at ${dealer.name}. Transparent pricing, financing available, trade-ins welcome.`,
    openGraph: {
      title: dealer.name,
      images: dealer.bannerUrl ? [{ url: dealer.bannerUrl }] : [],
    },
  };
}

const BODY_STYLES = [
  { label: 'SUVs', icon: '🚙', param: 'body=suv' },
  { label: 'Trucks', icon: '🛻', param: 'body=truck' },
  { label: 'Sedans', icon: '🚗', param: 'body=sedan' },
  { label: 'Minivans', icon: '🚐', param: 'body=van' },
  { label: 'Coupes', icon: '🏎️', param: 'body=coupe' },
  { label: 'Under $15k', icon: '💰', param: 'priceMax=15000' },
];

const BUDGET_RANGES = [
  { label: 'Under $10k', max: '10000' },
  { label: '$10k – $15k', min: '10000', max: '15000' },
  { label: '$15k – $20k', min: '15000', max: '20000' },
  { label: '$20k – $30k', min: '20000', max: '30000' },
  { label: '$30k+', min: '30000' },
];

const MONTHLY_BUDGETS = [
  { label: 'Under $200/mo', max: '12000' },
  { label: '$200–$350/mo', min: '12000', max: '21000' },
  { label: '$350–$500/mo', min: '21000', max: '30000' },
  { label: '$500–$700/mo', min: '30000', max: '42000' },
  { label: '$700+/mo', min: '42000' },
];

const DEFAULT_TRUST_PILLARS: TrustPillar[] = [
  { icon: 'shield', title: 'Every Vehicle Inspected', description: 'Professional multi-point inspection on every car before it hits our lot.' },
  { icon: 'dollar', title: 'Transparent Pricing', description: 'No hidden fees. The price you see is the price you pay.' },
  { icon: 'payment', title: 'Financing for All Credit', description: 'We work with multiple lenders to find you the best rate possible.' },
];

function TrustPillarIcon({ icon }: { icon: TrustPillar['icon'] }) {
  const paths: Record<TrustPillar['icon'], string> = {
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    dollar: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    payment: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    wrench: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    handshake: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    check: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  };
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={paths[icon]} />
    </svg>
  );
}

export default async function DealerHomePage({ params }: HomePageProps) {
  const { slug } = params;

  const [dealer, featuredData, recentData] = await Promise.all([
    getDealer(slug),
    getFeaturedVehicles(slug),
    getVehicles(slug, { pageSize: '4', sort: 'newest' }),
  ]);

  if (!dealer) notFound();

  const wc = dealer.websiteConfig;

  // ── Single registry lookup — no scattered booleans ─────────────────────────
  const template = resolveTemplate(wc?.templateId);

  // Section visibility: null homepageSections means all enabled
  const sections = wc?.homepageSections;
  const show = (key: keyof NonNullable<typeof sections>) =>
    sections == null || sections[key] !== false;

  const featuredVehicles = featuredData?.vehicles ?? [];
  const recentVehicles = recentData?.vehicles ?? [];
  const totalCount = recentData?.pagination.totalCount ?? dealer.vehicleCount;

  const trustPillars =
    (wc?.trustPillars && wc.trustPillars.length > 0) ? wc.trustPillars : DEFAULT_TRUST_PILLARS;

  const heroHeadline = wc?.heroHeadline || dealer.name;
  const heroSubheadline = wc?.heroSubheadline
    || `Quality Used Cars${dealer.city ? ` in ${dealer.city}` : ''}${dealer.state ? `, ${dealer.state}` : ''}`;

  const hasMap = !!(dealer.lotLat && dealer.lotLng);
  const logoSrc = wc?.logoUrl || dealer.logoUrl;

  // ─── PRISM TEMPLATE (fullbleed hero) ────────────────────────────────────
  if (template.homepage.heroVariant === 'fullbleed') {
    return (
      <>
        {/* PRISM Hero — full bleed dark, no search bar */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
          {dealer.bannerUrl ? (
            <Image src={dealer.bannerUrl} alt={dealer.name} fill className="object-cover opacity-25" priority quality={90} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black" />
          )}
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            {logoSrc && (
              <Image src={logoSrc} alt={dealer.name} width={160} height={60} className="h-14 w-auto object-contain mx-auto mb-8 brightness-0 invert opacity-90" />
            )}
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {dealer.city ? `${dealer.city} · ` : ''}{dealer.vehicleCount} Vehicles
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-5 tracking-tight">
              {heroHeadline}
            </h1>
            <p className="text-lg text-white/60 mb-10 font-light">{heroSubheadline}</p>
            <Link
              href={`/d/${slug}/inventory`}
              className="inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold text-black transition-all hover:brightness-90"
              style={{ backgroundColor: '#c9a84c' }}
            >
              Explore Our Collection
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {dealer.phone && (
              <p className="mt-6 text-sm text-white/30">
                Private inquiries:{' '}
                <a href={`tel:${dealer.phone}`} className="text-white/60 hover:text-white transition-colors">
                  {dealer.phone}
                </a>
              </p>
            )}
          </div>
        </section>

        {/* PRISM Featured — 2-col large, curated framing */}
        {show('featuredInventory') && featuredVehicles.length > 0 && (
          <section className="py-20 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Curated Selection</p>
                <h2 className="text-3xl font-bold text-white">Featured Vehicles</h2>
              </div>
              <AnimatedVehicleGrid
                vehicles={featuredVehicles}
                slug={slug}
                showPricing={dealer.showPricing}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                priorityCount={2}
              />
              <div className="text-center mt-12">
                <Link
                  href={`/d/${slug}/inventory`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-90"
                  style={{ backgroundColor: '#c9a84c' }}
                >
                  View Full Collection
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* PRISM Trust — minimal centered text, no icons */}
        {show('trustPillars') && (
          <section className="py-16 bg-[#111111] border-y border-[#1f1f1f]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                {trustPillars.map((pillar) => (
                  <div key={pillar.title}>
                    <div className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase mb-2">{pillar.title}</div>
                    <p className="text-sm text-white/40 leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PRISM Latest Arrivals */}
        {show('latestArrivals') && recentVehicles.length > 0 && (
          <section className="py-16 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-2">New Arrivals</p>
                  <h2 className="text-2xl font-bold text-white">Recently Added</h2>
                </div>
                <Link href={`/d/${slug}/inventory?sort=newest`} className="text-sm text-white/40 hover:text-[#c9a84c] transition-colors">
                  View all →
                </Link>
              </div>
              <AnimatedVehicleGrid
                vehicles={recentVehicles}
                slug={slug}
                showPricing={dealer.showPricing}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                priorityCount={4}
              />
            </div>
          </section>
        )}

        {/* PRISM Dealer Info — centered, minimal */}
        {show('dealerInfo') && (dealer.address || dealer.phone) && (
          <section className="py-16 bg-[#111111] border-t border-[#1f1f1f]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Visit Us</p>
              <h2 className="text-2xl font-bold text-white mb-6">{dealer.name}</h2>
              <div className="space-y-2 text-sm text-white/40 mb-8">
                {[dealer.address, dealer.city, dealer.state].filter(Boolean).length > 0 && (
                  <p>{[dealer.address, dealer.city, dealer.state].filter(Boolean).join(', ')}</p>
                )}
                {dealer.phone && (
                  <a href={`tel:${dealer.phone}`} className="block hover:text-[#c9a84c] transition-colors">
                    {dealer.phone}
                  </a>
                )}
              </div>
              <Link
                href={`/d/${slug}/contact`}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-black"
                style={{ backgroundColor: '#c9a84c' }}
              >
                Schedule a Viewing
              </Link>
            </div>
          </section>
        )}
      </>
    );
  }

  // ─── FINANCE-FIRST TEMPLATE (finance hero) ───────────────────────────────
  if (template.homepage.heroVariant === 'finance') {
    return (
      <>
        {/* Finance-First Hero */}
        <section className="relative bg-gray-900 overflow-hidden">
          {dealer.bannerUrl ? (
            <Image src={dealer.bannerUrl} alt={dealer.name} fill className="object-cover opacity-30" priority quality={85} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
          )}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="max-w-2xl">
              {logoSrc && (
                <Image src={logoSrc} alt={dealer.name} width={160} height={60} className="h-12 w-auto object-contain mb-6 brightness-0 invert" />
              )}
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-4 py-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 text-xs font-semibold">All Credit Types Approved · Bad Credit Welcome</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
                {wc?.heroHeadline || 'Drive Today, Finance Your Way'}
              </h1>
              <p className="text-lg text-white/75 mb-8">
                {wc?.heroSubheadline || `${totalCount} vehicles available. We work with every credit situation.`}
              </p>
              <div className="bg-white rounded-xl p-2 flex gap-2 max-w-xl shadow-lg">
                <Link href={`/d/${slug}/inventory`} className="flex-1 flex items-center gap-2 px-4 py-3 text-gray-400 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search by make, model, or year...
                </Link>
                <Link
                  href={`/d/${slug}/inventory`}
                  className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                >
                  Search
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-white/60 text-sm">
                <span className="text-white font-semibold">{totalCount} Vehicles</span>
                <span className="text-white/30">·</span>
                <span>No credit check to browse</span>
                <span className="text-white/30">·</span>
                <Link href={`/d/${slug}/financing`} className="text-green-400 font-semibold hover:text-green-300 transition-colors">
                  Apply in 60 seconds →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly payment budget selector — above fold */}
        {show('shopByBudget') && (
          <section className="py-10 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">What&apos;s your monthly budget?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {MONTHLY_BUDGETS.map((range) => {
                  const bp = new URLSearchParams();
                  if (range.min) bp.set('priceMin', range.min);
                  if (range.max) bp.set('priceMax', range.max);
                  return (
                    <Link
                      key={range.label}
                      href={`/d/${slug}/inventory?${bp.toString()}`}
                      className="block p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-center transition-all group"
                    >
                      <div className="text-sm font-bold text-gray-800 group-hover:text-blue-700">{range.label}</div>
                      <div className="text-xs text-gray-400 group-hover:text-blue-500 mt-0.5">Browse →</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Quick chips */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
              {[
                { label: 'All Inventory', href: `/d/${slug}/inventory` },
                { label: 'Under $10k', href: `/d/${slug}/inventory?priceMax=10000` },
                { label: 'Under $15k', href: `/d/${slug}/inventory?priceMax=15000` },
                { label: 'SUVs', href: `/d/${slug}/inventory?body=suv` },
                { label: 'Trucks', href: `/d/${slug}/inventory?body=truck` },
                { label: 'Apply Now', href: `/d/${slug}/financing` },
              ].map((chip) => (
                <Link key={chip.label} href={chip.href} className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 transition-colors whitespace-nowrap">
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Arrivals */}
        {show('latestArrivals') && recentVehicles.length > 0 && (
          <section className="py-10 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Latest Arrivals</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Just added to our inventory</p>
                </div>
                <Link href={`/d/${slug}/inventory?sort=newest`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary, #1d4ed8)' }}>
                  View All →
                </Link>
              </div>
              <AnimatedVehicleGrid vehicles={recentVehicles} slug={slug} showPricing={dealer.showPricing} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" priorityCount={4} />
            </div>
          </section>
        )}

        {/* Financing CTA banner */}
        <section className="py-10 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-8 text-white text-center" style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}>
              <h2 className="text-2xl font-bold mb-2">Ready to Drive? Financing is Easier Than You Think.</h2>
              <p className="text-white/80 text-sm mb-6">Bad credit, no credit, bankruptcy — we have lenders for every situation. Get pre-approved in 60 seconds, no hard credit pull.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/d/${slug}/financing`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:bg-gray-100"
                  style={{ color: 'var(--primary, #1d4ed8)' }}
                >
                  ✓ Apply for Financing
                </Link>
                <Link
                  href={`/d/${slug}/inventory`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  Browse All {totalCount} Vehicles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Pillars */}
        {show('trustPillars') && (
          <section className="py-12 bg-gray-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {trustPillars.map((pillar) => (
                  <div key={pillar.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}>
                      <TrustPillarIcon icon={pillar.icon} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">{pillar.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Inventory */}
        {show('featuredInventory') && featuredVehicles.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Featured Vehicles</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{totalCount} vehicles available</p>
                </div>
                <Link href={`/d/${slug}/inventory`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary, #1d4ed8)' }}>
                  View All {totalCount} →
                </Link>
              </div>
              <AnimatedVehicleGrid
                vehicles={featuredVehicles}
                slug={slug}
                showPricing={dealer.showPricing}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                priorityCount={3}
              />
            </div>
          </section>
        )}

        {/* Dealer Info */}
        {show('dealerInfo') && (dealer.address || dealer.phone || dealer.description || hasMap) && (
          <section className="py-12 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit {dealer.name}</h2>
                  {dealer.description && <p className="text-gray-500 leading-relaxed mb-5">{dealer.description}</p>}
                  <div className="space-y-3 text-sm">
                    {[dealer.address, dealer.city, dealer.state].filter(Boolean).length > 0 && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-gray-600">{[dealer.address, dealer.city, dealer.state].filter(Boolean).join(', ')}</span>
                      </div>
                    )}
                    {dealer.phone && (
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <a href={`tel:${dealer.phone}`} className="text-gray-600 hover:text-gray-900 font-medium">{dealer.phone}</a>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Link
                      href={`/d/${slug}/financing`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                    >
                      Apply for Financing
                    </Link>
                    <Link href={`/d/${slug}/inventory`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                      Browse Vehicles
                    </Link>
                  </div>
                </div>
                {hasMap ? (
                  <div className="rounded-xl overflow-hidden border border-gray-200 h-64 lg:h-80">
                    <iframe
                      title="Dealership Location"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${dealer.lotLng! - 0.012}%2C${dealer.lotLat! - 0.008}%2C${dealer.lotLng! + 0.012}%2C${dealer.lotLat! + 0.008}&layer=mapnik&marker=${dealer.lotLat}%2C${dealer.lotLng}`}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: totalCount.toString(), label: 'Vehicles' },
                      { value: 'All Credit', label: 'Financing' },
                      { value: '60s', label: 'Pre-Approval' },
                      { value: 'Free', label: 'Trade-In' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-xl p-5 text-center border border-gray-100">
                        <div className="text-2xl font-bold tabular-nums" style={{ color: 'var(--primary, #1d4ed8)' }}>{stat.value}</div>
                        <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  // ─── APEX + SHIFT TEMPLATES (search hero) ───────────────────────────────
  // template.homepage.heroVariant === 'search'
  // Differentiated by: featuredPosition, featuredGridCols, showBudget, showBrowseByType, showFinalCta
  return (
    <>
      {/* ══ HERO ══ */}
      <section className="relative bg-gray-900 overflow-hidden">
        {dealer.bannerUrl ? (
          <Image src={dealer.bannerUrl} alt={dealer.name} fill className="object-cover opacity-40" priority quality={85} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            {logoSrc && (
              <Image src={logoSrc} alt={dealer.name} width={160} height={60} className="h-12 w-auto object-contain mb-6 brightness-0 invert" />
            )}
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">{heroHeadline}</h1>
            <p className="text-xl text-white/80 mb-8">{heroSubheadline}</p>
            <div className="bg-white rounded-xl p-2 flex gap-2 max-w-xl shadow-lg">
              <Link href={`/d/${slug}/inventory`} className="flex-1 flex items-center gap-2 px-4 py-3 text-gray-400 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search by make, model, or year...
              </Link>
              <Link
                href={`/d/${slug}/inventory`}
                className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
              >
                Search
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-white/70 text-sm font-medium">
              <span className="text-white font-semibold">{totalCount} Vehicles in Stock</span>
              {wc?.showFinancing !== false && (<><span className="text-white/40">·</span><span>Financing Available</span></>)}
              {wc?.showTradeIn && (<><span className="text-white/40">·</span><span>Trade-Ins Welcome</span></>)}
              {dealer.phone && (<><span className="text-white/40">·</span><a href={`tel:${dealer.phone}`} className="hover:text-white transition-colors">{dealer.phone}</a></>)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUICK FILTER CHIPS ══ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {[
              { label: 'All Inventory', href: `/d/${slug}/inventory` },
              { label: 'Under $15k', href: `/d/${slug}/inventory?priceMax=15000` },
              { label: 'Under $20k', href: `/d/${slug}/inventory?priceMax=20000` },
              { label: 'SUVs', href: `/d/${slug}/inventory?body=suv` },
              { label: 'Trucks', href: `/d/${slug}/inventory?body=truck` },
              { label: 'Best Condition', href: `/d/${slug}/inventory?sort=score_desc` },
            ].map((chip) => (
              <Link key={chip.label} href={chip.href} className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 transition-colors whitespace-nowrap">
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ LATEST ARRIVALS ══ */}
      {show('latestArrivals') && recentVehicles.length > 0 && (
        <section className="py-10 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Latest Arrivals</h2>
                <p className="text-sm text-gray-500 mt-0.5">Just added to our inventory</p>
              </div>
              <Link href={`/d/${slug}/inventory?sort=newest`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary, #1d4ed8)' }}>
                View All →
              </Link>
            </div>
            <AnimatedVehicleGrid vehicles={recentVehicles} slug={slug} showPricing={dealer.showPricing} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" priorityCount={4} />
          </div>
        </section>
      )}

      {/* ══ SHIFT: Featured (2-col large) appears BEFORE trust pillars ══ */}
      {template.homepage.featuredPosition === 'before-trust' && show('featuredInventory') && featuredVehicles.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Vehicles</h2>
                <p className="text-sm text-gray-500 mt-0.5">{totalCount} vehicles available</p>
              </div>
              <Link href={`/d/${slug}/inventory`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary, #1d4ed8)' }}>
                View All {totalCount} →
              </Link>
            </div>
            <AnimatedVehicleGrid
              vehicles={featuredVehicles}
              slug={slug}
              showPricing={dealer.showPricing}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              priorityCount={2}
            />
          </div>
        </section>
      )}

      {/* ══ TRUST PILLARS ══ */}
      {show('trustPillars') && (
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {trustPillars.map((pillar) => (
                <div key={pillar.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}>
                    <TrustPillarIcon icon={pillar.icon} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{pillar.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ APEX: Featured (3-col) appears AFTER trust pillars ══ */}
      {template.homepage.featuredPosition === 'after-trust' && show('featuredInventory') && featuredVehicles.length > 0 && (
        <section className="py-12 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Inventory</h2>
                <p className="text-sm text-gray-500 mt-0.5">{totalCount} vehicles available</p>
              </div>
              <Link href={`/d/${slug}/inventory`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary, #1d4ed8)' }}>
                View All {totalCount} →
              </Link>
            </div>
            <AnimatedVehicleGrid
              vehicles={featuredVehicles}
              slug={slug}
              showPricing={dealer.showPricing}
              className={`grid grid-cols-1 sm:grid-cols-2 ${template.homepage.featuredGridCols === 3 ? 'lg:grid-cols-3' : ''} gap-5`}
              priorityCount={template.homepage.featuredGridCols === 3 ? 3 : 2}
            />
            <div className="mt-8 text-center">
              <Link
                href={`/d/${slug}/inventory`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
              >
                Browse All {totalCount} Vehicles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ SHOP BY BUDGET — registry-controlled (APEX only) ══ */}
      {template.homepage.showBudget && show('shopByBudget') && (
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Budget</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {BUDGET_RANGES.map((range) => {
                const bp = new URLSearchParams();
                if (range.min) bp.set('priceMin', range.min);
                if (range.max) bp.set('priceMax', range.max);
                return (
                  <Link
                    key={range.label}
                    href={`/d/${slug}/inventory?${bp.toString()}`}
                    className="block p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-center transition-all group"
                  >
                    <div className="text-sm font-bold text-gray-800 group-hover:text-blue-700">{range.label}</div>
                    <div className="text-xs text-gray-400 group-hover:text-blue-500 mt-0.5">Browse →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ BROWSE BY TYPE — registry-controlled (APEX only) ══ */}
      {template.homepage.showBrowseByType && show('browseByType') && (
        <section className="py-12 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Type</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {BODY_STYLES.map((style) => (
                <Link
                  key={style.label}
                  href={`/d/${slug}/inventory?${style.param}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center group"
                >
                  <span className="text-3xl">{style.icon}</span>
                  <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900">{style.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ DEALER INFO ══ */}
      {show('dealerInfo') && (dealer.address || dealer.phone || dealer.description || hasMap) && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit {dealer.name}</h2>
                {dealer.description && <p className="text-gray-500 leading-relaxed mb-5">{dealer.description}</p>}
                <div className="space-y-3 text-sm">
                  {[dealer.address, dealer.city, dealer.state].filter(Boolean).length > 0 && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-gray-600">{[dealer.address, dealer.city, dealer.state].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                  {dealer.phone && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <a href={`tel:${dealer.phone}`} className="text-gray-600 hover:text-gray-900 font-medium">{dealer.phone}</a>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <Link
                    href={`/d/${slug}/inventory`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                  >
                    Browse Inventory
                  </Link>
                  <Link href={`/d/${slug}/contact`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
              {hasMap ? (
                <div className="rounded-xl overflow-hidden border border-gray-200 h-64 lg:h-80">
                  <iframe
                    title="Dealership Location"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${dealer.lotLng! - 0.012}%2C${dealer.lotLat! - 0.008}%2C${dealer.lotLng! + 0.012}%2C${dealer.lotLat! + 0.008}&layer=mapnik&marker=${dealer.lotLat}%2C${dealer.lotLng}`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: totalCount.toString(), label: 'Vehicles in Stock' },
                    { value: '100%', label: 'Transparent Pricing' },
                    { value: 'All Credit', label: 'Financing Options' },
                    { value: 'Free', label: 'Trade-In Appraisal' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#F8F9FA] rounded-xl p-5 text-center border border-gray-100">
                      <div className="text-2xl font-bold tabular-nums" style={{ color: 'var(--primary, #1d4ed8)' }}>{stat.value}</div>
                      <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ FINAL CTA — registry-controlled (APEX + SHIFT) ══ */}
      {template.homepage.showFinalCta && show('finalCta') && (
        <section className="py-14 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to Find Your Next Car?</h2>
            <p className="text-gray-400 mb-8">Browse {totalCount} quality vehicles with transparent pricing and no-pressure sales.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/d/${slug}/inventory`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
              >
                View All {totalCount} Vehicles
              </Link>
              {dealer.phone && (
                <a
                  href={`tel:${dealer.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {dealer.phone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
