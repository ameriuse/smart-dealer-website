import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDealer, getVehicles } from '@/lib/api';
import AnimatedVehicleGrid from '@/components/AnimatedVehicleGrid';

interface HomePageProps {
  params: { slug: string };
}

export const revalidate = 30;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return { title: 'Not Found' };
  return {
    title: `${dealer.name} | Quality Used Cars${dealer.city ? ` in ${dealer.city}` : ''}`,
    description: dealer.description
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

export default async function DealerHomePage({ params }: HomePageProps) {
  const { slug } = params;

  const [dealer, featuredData, recentData] = await Promise.all([
    getDealer(slug),
    getVehicles(slug, { pageSize: '6', sort: 'score_desc' }),
    getVehicles(slug, { pageSize: '4', sort: 'newest' }),
  ]);

  if (!dealer) notFound();

  const featuredVehicles = featuredData?.vehicles ?? [];
  const recentVehicles = recentData?.vehicles ?? [];
  const totalCount = featuredData?.pagination.totalCount ?? dealer.vehicleCount;

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="relative bg-gray-900 overflow-hidden">
        {dealer.bannerUrl ? (
          <Image
            src={dealer.bannerUrl}
            alt={dealer.name}
            fill
            className="object-cover opacity-40"
            priority
            quality={85}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            {dealer.logoUrl && (
              <Image
                src={dealer.logoUrl}
                alt={dealer.name}
                width={160}
                height={60}
                className="h-12 w-auto object-contain mb-6 brightness-0 invert"
              />
            )}
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
              {dealer.name}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Quality Used Cars{dealer.city ? ` in ${dealer.city}` : ''}
              {dealer.state ? `, ${dealer.state}` : ''}
            </p>

            {/* Hero search */}
            <div className="bg-white rounded-xl p-2 flex gap-2 max-w-xl shadow-lg">
              <Link
                href={`/d/${slug}/inventory`}
                className="flex-1 flex items-center gap-2 px-4 py-3 text-gray-400 text-sm rounded-lg hover:bg-gray-50 transition-colors"
              >
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

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-white/70 text-sm font-medium">
              <span className="text-white font-semibold">{totalCount} Vehicles in Stock</span>
              <span className="text-white/40">·</span>
              <span>Financing Available</span>
              <span className="text-white/40">·</span>
              <span>Trade-Ins Welcome</span>
              {dealer.phone && (
                <>
                  <span className="text-white/40">·</span>
                  <a href={`tel:${dealer.phone}`} className="hover:text-white transition-colors">{dealer.phone}</a>
                </>
              )}
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
              <Link
                key={chip.label}
                href={chip.href}
                className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 transition-colors whitespace-nowrap"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ LATEST ARRIVALS ══ */}
      {recentVehicles.length > 0 && (
        <section className="py-10 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Latest Arrivals</h2>
                <p className="text-sm text-gray-500 mt-0.5">Just added to our inventory</p>
              </div>
              <Link
                href={`/d/${slug}/inventory?sort=newest`}
                className="text-sm font-semibold hover:underline"
                style={{ color: 'var(--primary, #1d4ed8)' }}
              >
                View All →
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

      {/* ══ TRUST PILLARS ══ */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Every Vehicle Inspected',
                desc: 'Professional multi-point inspection on every car before it hits our lot.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Transparent Pricing',
                desc: 'No hidden fees. The price you see is the price you pay.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Financing for All Credit',
                desc: 'We work with multiple lenders to find you the best rate possible.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED INVENTORY ══ */}
      {featuredVehicles.length > 0 && (
        <section className="py-12 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Inventory</h2>
                <p className="text-sm text-gray-500 mt-0.5">{totalCount} vehicles available</p>
              </div>
              <Link
                href={`/d/${slug}/inventory`}
                className="text-sm font-semibold hover:underline"
                style={{ color: 'var(--primary, #1d4ed8)' }}
              >
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
            <div className="mt-8 text-center">
              <Link
                href={`/d/${slug}/inventory`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
              >
                Browse All {totalCount} Vehicles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ SHOP BY BUDGET ══ */}
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

      {/* ══ BROWSE BY TYPE ══ */}
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

      {/* ══ DEALER INFO ══ */}
      {(dealer.address || dealer.phone || dealer.description) && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit {dealer.name}</h2>
                {dealer.description && (
                  <p className="text-gray-500 leading-relaxed mb-5">{dealer.description}</p>
                )}
                <div className="space-y-3 text-sm">
                  {[dealer.address, dealer.city, dealer.state].filter(Boolean).length > 0 && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">{[dealer.address, dealer.city, dealer.state].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                  {dealer.phone && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
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
                  <Link
                    href={`/d/${slug}/contact`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: totalCount.toString(), label: 'Vehicles in Stock' },
                  { value: '100%', label: 'Transparent Pricing' },
                  { value: 'All Credit', label: 'Financing Options' },
                  { value: 'Free', label: 'Trade-In Appraisal' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#F8F9FA] rounded-xl p-5 text-center border border-gray-100">
                    <div className="text-2xl font-bold tabular-nums" style={{ color: 'var(--primary, #1d4ed8)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ FINAL CTA ══ */}
      <section className="py-14 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Find Your Next Car?</h2>
          <p className="text-gray-400 mb-8">
            Browse {totalCount} quality vehicles with transparent pricing and no-pressure sales.
          </p>
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {dealer.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
