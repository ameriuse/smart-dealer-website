import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDealer, getVehicles } from '@/lib/api';
import VehicleCard from '@/components/VehicleCard';
import SearchBar from '@/components/SearchBar';

interface HomePageProps {
  params: { slug: string };
}

export const revalidate = 30;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return { title: 'Not Found' };
  return {
    title: dealer.name,
    description: dealer.description ?? `Browse ${dealer.vehicleCount} OBD-verified vehicles at ${dealer.name}. Transparent pricing, real inspection data, zero guesswork.`,
    openGraph: {
      title: dealer.name,
      description: dealer.description ?? `Browse vehicles at ${dealer.name}`,
      images: dealer.bannerUrl ? [{ url: dealer.bannerUrl }] : [],
    },
  };
}

const BODY_STYLES = [
  { label: 'SUVs', icon: '🚙', param: 'body=suv' },
  { label: 'Trucks', icon: '🛻', param: 'body=truck' },
  { label: 'Sedans', icon: '🚗', param: 'body=sedan' },
  { label: 'Vans', icon: '🚐', param: 'body=van' },
  { label: 'Electric', icon: '⚡', param: 'fuel=electric' },
  { label: 'Sports', icon: '🏎️', param: 'body=sports' },
];

const BUDGET_RANGES = [
  { label: 'Under $10k', max: '10000', color: 'from-blue-500 to-blue-600' },
  { label: '$10k–$15k', min: '10000', max: '15000', color: 'from-indigo-500 to-indigo-600' },
  { label: '$15k–$20k', min: '15000', max: '20000', color: 'from-violet-500 to-violet-600' },
  { label: '$20k–$30k', min: '20000', max: '30000', color: 'from-purple-500 to-purple-600' },
  { label: '$30k+', min: '30000', color: 'from-pink-500 to-pink-600' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Browse with Confidence',
    desc: 'Every vehicle shows a real OBD scan score, fault codes, and recall status. No surprises.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Get Transparent Pricing',
    desc: 'See market comparison data, estimated monthly payments, and financing options upfront.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Drive Home Happy',
    desc: 'Full inspection history, OBD data, and recall status — all disclosed before you sign.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const TRUST_PILLARS = [
  {
    emoji: '🔬',
    title: 'OBD Verified',
    desc: 'Real scanner data from professional OBD-II diagnostics — not just a visual inspection.',
    stat: '40+ Sensors Read',
    color: 'bg-blue-50 border-blue-100',
    titleColor: 'text-blue-900',
  },
  {
    emoji: '📍',
    title: 'GPS Confirmed',
    desc: 'Know where this car has been. GPS history shows location patterns and unusual trips.',
    stat: 'Full History',
    color: 'bg-purple-50 border-purple-100',
    titleColor: 'text-purple-900',
  },
  {
    emoji: '🏛️',
    title: 'NHTSA Checked',
    desc: 'Every VIN cross-referenced with the National Highway Traffic Safety Administration database.',
    stat: 'All Recalls Verified',
    color: 'bg-green-50 border-green-100',
    titleColor: 'text-green-900',
  },
  {
    emoji: '🤖',
    title: 'AI Inspected',
    desc: 'Predictive diagnostics from Mode 06 OBD data catch issues before they become problems.',
    stat: '200+ Point Check',
    color: 'bg-amber-50 border-amber-100',
    titleColor: 'text-amber-900',
  },
];

export default async function DealerHomePage({ params }: HomePageProps) {
  const { slug } = params;

  const [dealer, featuredData, recentData] = await Promise.all([
    getDealer(slug),
    getVehicles(slug, { pageSize: '6', sort: 'score_desc' }),
    getVehicles(slug, { pageSize: '6', sort: 'newest' }),
  ]);

  if (!dealer) notFound();

  const featuredVehicles = featuredData?.vehicles ?? [];
  const recentVehicles = recentData?.vehicles ?? [];
  const totalCount = featuredData?.pagination.totalCount ?? dealer.vehicleCount;

  return (
    <>
      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        {dealer.bannerUrl ? (
          <Image
            src={dealer.bannerUrl}
            alt={`${dealer.name} showroom`}
            fill
            className="object-cover"
            priority
            quality={85}
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto pt-8">
          {dealer.logoUrl && (
            <div className="mb-6 flex justify-center">
              <Image
                src={dealer.logoUrl}
                alt={dealer.name}
                width={160}
                height={60}
                className="h-14 w-auto object-contain drop-shadow-lg brightness-0 invert"
              />
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {dealer.name}
          </h1>

          {dealer.description && (
            <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
              {dealer.description}
            </p>
          )}

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar slug={slug} />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'All Vehicles', href: `/d/${slug}/inventory` },
              { label: 'Under $10k', href: `/d/${slug}/inventory?priceMax=10000` },
              { label: 'Under $20k', href: `/d/${slug}/inventory?priceMax=20000` },
              { label: 'SUVs', href: `/d/${slug}/inventory?body=suv` },
              { label: 'Trucks', href: `/d/${slug}/inventory?body=truck` },
              { label: 'OBD Verified', href: `/d/${slug}/inventory?scoreMin=1` },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white glass hover:bg-white/25 transition-all duration-200"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Trust Bar at bottom of hero */}
        <div className="relative z-10 w-full mt-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/90 text-sm font-medium">
              {[
                { icon: '🔬', label: 'OBD Verified' },
                { icon: '📍', label: 'GPS Tracked' },
                { icon: '🏛️', label: 'NHTSA Checked' },
                { icon: '🤖', label: 'AI Inspected' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — LIVE INVENTORY COUNTER
      ══════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {[
              {
                value: totalCount.toString(),
                label: 'Vehicles in Stock',
                icon: '🚗',
              },
              {
                value: 'OBD',
                label: 'Scan Verified',
                icon: '🔬',
              },
              {
                value: 'NHTSA',
                label: 'Recall Checked',
                icon: '🏛️',
              },
              {
                value: '100%',
                label: 'Transparency',
                icon: '✅',
              },
            ].map((stat) => (
              <div key={stat.label} className="py-5 px-4 sm:px-6 text-center group">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold tabular-nums"
                  style={{ color: 'var(--primary, #2563eb)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 3 — FEATURED INVENTORY (Best Score)
      ══════════════════════════════════════════ */}
      {featuredVehicles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--primary)' }}>
                  ⭐ Top Rated
                </p>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Featured Inventory
                </h2>
                <p className="text-gray-500 mt-1 text-sm">
                  {totalCount} vehicle{totalCount !== 1 ? 's' : ''} available · sorted by condition score
                </p>
              </div>
              <Link
                href={`/d/${slug}/inventory`}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold hover:underline transition-colors"
                style={{ color: 'var(--primary, #2563eb)' }}
              >
                View All {totalCount}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile: horizontal scroll, Desktop: 3-col grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle, i) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  slug={slug}
                  showPricing={dealer.showPricing}
                  priority={i < 3}
                />
              ))}
            </div>

            {/* Mobile scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden -mx-4 px-4 snap-x snap-mandatory">
              {featuredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex-shrink-0 w-72 snap-start">
                  <VehicleCard vehicle={vehicle} slug={slug} showPricing={dealer.showPricing} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href={`/d/${slug}/inventory`}
                className="btn-primary"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                View All {totalCount} Vehicles
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          SECTION 4 — TRUST & TRANSPARENCY (why us)
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Our Difference</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Why Buy From {dealer.name}?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              We&apos;re the only dealer with real OBD scanner data on every vehicle. No guesswork. Just facts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-2xl border p-6 ${pillar.color} hover:shadow-md transition-shadow duration-200`}
              >
                <div className="text-4xl mb-4">{pillar.emoji}</div>
                <h3 className={`text-base font-bold mb-2 ${pillar.titleColor}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{pillar.desc}</p>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{pillar.stat}</div>
              </div>
            ))}
          </div>

          {/* OBD Explainer banner */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
            <div className="text-4xl mb-3">🔬</div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              What is an OBD Scan?
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto text-sm leading-relaxed">
              OBD-II (On-Board Diagnostics) is a professional diagnostic system built into every car since 1996.
              We connect a professional scanner to read 40+ sensors, check for fault codes, and generate a
              transparent condition score — so you know exactly what you&apos;re buying.
            </p>
            <Link
              href={`/d/${slug}/inventory?scoreMin=1`}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Browse OBD-Verified Vehicles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
                )}

                <div className="relative z-10">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                  >
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Step {step.step}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — RECENTLY ADDED
      ══════════════════════════════════════════ */}
      {recentVehicles.length > 0 && recentVehicles.some(v => v.publishedAt && (Date.now() - new Date(v.publishedAt).getTime()) < 14 * 24 * 60 * 60 * 1000) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span style={{ color: 'var(--primary)' }}>Just Arrived</span>
                </p>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Recently Added
                </h2>
              </div>
              <Link
                href={`/d/${slug}/inventory?sort=newest`}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                style={{ color: 'var(--primary)' }}
              >
                View All New
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {recentVehicles.slice(0, 6).map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  slug={slug}
                  showPricing={dealer.showPricing}
                />
              ))}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden -mx-4 px-4 snap-x snap-mandatory">
              {recentVehicles.slice(0, 6).map((vehicle) => (
                <div key={vehicle.id} className="flex-shrink-0 w-72 snap-start">
                  <VehicleCard vehicle={vehicle} slug={slug} showPricing={dealer.showPricing} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          SECTION 7 — SHOP BY BUDGET
      ══════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Shop by Budget
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Find vehicles that fit your price range</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BUDGET_RANGES.map((range) => {
              const budgetParams = new URLSearchParams();
              if (range.min) budgetParams.set('priceMin', range.min);
              if (range.max) budgetParams.set('priceMax', range.max);
              return (
                <Link
                  key={range.label}
                  href={`/d/${slug}/inventory?${budgetParams.toString()}`}
                  className={`group relative rounded-2xl bg-gradient-to-br ${range.color} p-5 text-white text-center overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-200`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                  <div className="relative">
                    <div className="text-base font-bold">{range.label}</div>
                    <div className="text-xs text-white/80 mt-1">Browse →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — SHOP BY CATEGORY
      ══════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Browse by Type
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {BODY_STYLES.map((style) => (
              <Link
                key={style.label}
                href={`/d/${slug}/inventory?${style.param}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 text-center"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {style.icon}
                </span>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700">
                  {style.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 9 — DEALER STORY
      ══════════════════════════════════════════ */}
      {dealer.description && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 text-center">
              {dealer.logoUrl && (
                <Image
                  src={dealer.logoUrl}
                  alt={dealer.name}
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain mx-auto mb-6"
                />
              )}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                About {dealer.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base max-w-2xl mx-auto">
                {dealer.description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/d/${slug}/inventory`}
                  className="btn-primary"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Browse Our Inventory
                </Link>
                <Link href={`/d/${slug}/contact`} className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          SECTION 10 — CONTACT BAR
      ══════════════════════════════════════════ */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {dealer.name}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {dealer.address && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {[dealer.address, dealer.city, dealer.state].filter(Boolean).join(', ')}
                  </span>
                )}
                {dealer.phone && (
                  <a href={`tel:${dealer.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {dealer.phone}
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {dealer.phone && (
                <a
                  href={`tel:${dealer.phone}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors min-h-[48px]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              )}
              <Link
                href={`/d/${slug}/contact`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors min-h-[48px]"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 11 — FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🚗</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to Find Your Next Vehicle?
          </h2>
          <p className="text-gray-500 mb-8 text-lg leading-relaxed">
            Browse {totalCount} OBD-verified vehicles with transparent pricing and real inspection data.
            No pressure, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/d/${slug}/inventory`}
              className="btn-primary text-base px-8 py-4"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Browse All {totalCount} Vehicles
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`/d/${slug}/contact`}
              className="btn-secondary text-base px-8 py-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
