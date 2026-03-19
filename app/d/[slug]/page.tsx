import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDealer, getVehicles } from '@/lib/api';
import VehicleCard from '@/components/VehicleCard';

interface HomePageProps {
  params: { slug: string };
}

export default async function DealerHomePage({ params }: HomePageProps) {
  const { slug } = params;

  const [dealer, vehiclesData] = await Promise.all([
    getDealer(slug),
    getVehicles(slug, { pageSize: '6', sort: 'newest' }),
  ]);

  if (!dealer) notFound();

  const vehicles = vehiclesData?.vehicles ?? [];
  const totalCount = vehiclesData?.pagination.totalCount ?? dealer.vehicleCount;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        {dealer.bannerUrl ? (
          <Image
            src={dealer.bannerUrl}
            alt={`${dealer.name} banner`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, var(--primary, #2563eb) 0%, var(--secondary, #1e40af) 100%)' }}
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            {dealer.name}
          </h1>
          {dealer.description && (
            <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-xl mx-auto">
              {dealer.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/d/${slug}/inventory`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--primary, #2563eb)' }}
            >
              Browse Our Inventory
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`/d/${slug}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-white/20 backdrop-blur border border-white/30 hover:bg-white/30 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
            {[
              { value: totalCount.toString(), label: 'Vehicles in Stock' },
              { value: 'OBD', label: 'Verified Scans' },
              { value: 'NHTSA', label: 'Recall Checked' },
              { value: '100%', label: 'Smart Dealer Verified' },
            ].map((stat) => (
              <div key={stat.label} className="py-5 px-6 text-center">
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: 'var(--primary, #2563eb)' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trust Section ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Buy From Us?</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Every vehicle goes through our rigorous Smart Dealer inspection before hitting the lot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
                  </svg>
                ),
                title: 'OBD Inspected',
                desc: 'Every vehicle is electronically scanned for fault codes using professional-grade OBD-II diagnostics.',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: 'Condition Score',
                desc: 'Know exactly what you\'re buying with our transparent 0–100 condition score before you visit.',
                color: 'text-yellow-600',
                bg: 'bg-yellow-50',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'NHTSA Checked',
                desc: 'Every VIN is cross-referenced with the NHTSA recall database — no hidden safety issues.',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'Smart Dealer Verified',
                desc: 'Our certified process ensures every listing is accurate, transparent, and trustworthy.',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${item.bg} ${item.color} mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Inventory ── */}
      {vehicles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Browse Our Inventory</h2>
                <p className="mt-2 text-gray-500">
                  {totalCount} vehicle{totalCount !== 1 ? 's' : ''} available
                </p>
              </div>
              <Link
                href={`/d/${slug}/inventory`}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                style={{ color: 'var(--primary, #2563eb)' }}
              >
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  slug={slug}
                  showPricing={dealer.showPricing}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={`/d/${slug}/inventory`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white shadow-md transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--primary, #2563eb)' }}
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

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Next Vehicle?
          </h2>
          <p className="text-gray-500 mb-8">
            Contact us today or browse our full inventory. Our team is ready to help you find the perfect car.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/d/${slug}/inventory`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white shadow-md"
              style={{ backgroundColor: 'var(--primary, #2563eb)' }}
            >
              Browse Inventory
            </Link>
            <Link
              href={`/d/${slug}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-gray-700 border-2 border-gray-200 hover:border-gray-400 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
