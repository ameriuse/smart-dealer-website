import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDealer, getVehicles } from '@/lib/api';
import VehicleCard from '@/components/VehicleCard';
import type { Metadata } from 'next';

interface SRPProps {
  params: { slug: string };
  searchParams: {
    make?: string;
    model?: string;
    sort?: string;
    page?: string;
    scoreMin?: string;
    priceMin?: string;
    priceMax?: string;
    yearMin?: string;
    yearMax?: string;
  };
}

export async function generateMetadata({ params }: SRPProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return {};
  return {
    title: 'Inventory',
    description: `Browse ${dealer.vehicleCount} vehicles at ${dealer.name}`,
  };
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'score_desc', label: 'Best Score First' },
];

export default async function InventoryPage({ params, searchParams }: SRPProps) {
  const { slug } = params;

  const apiParams: Record<string, string> = {
    pageSize: '12',
    page: searchParams.page ?? '1',
    sort: searchParams.sort ?? 'newest',
  };
  if (searchParams.make) apiParams.make = searchParams.make;
  if (searchParams.model) apiParams.model = searchParams.model;
  if (searchParams.priceMin) apiParams.priceMin = searchParams.priceMin;
  if (searchParams.priceMax) apiParams.priceMax = searchParams.priceMax;
  if (searchParams.yearMin) apiParams.yearMin = searchParams.yearMin;
  if (searchParams.yearMax) apiParams.yearMax = searchParams.yearMax;
  if (searchParams.scoreMin) apiParams.scoreMin = searchParams.scoreMin;

  const [dealer, vehiclesData] = await Promise.all([
    getDealer(slug),
    getVehicles(slug, apiParams),
  ]);

  if (!dealer) notFound();

  const vehicles = vehiclesData?.vehicles ?? [];
  const pagination = vehiclesData?.pagination;
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const totalCount = pagination?.totalCount ?? 0;

  // Collect unique makes from returned results for filter
  const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();

  function buildUrl(overrides: Record<string, string | undefined>) {
    const merged: Record<string, string> = {};
    if (searchParams.make) merged.make = searchParams.make;
    if (searchParams.model) merged.model = searchParams.model;
    if (searchParams.sort) merged.sort = searchParams.sort;
    if (searchParams.page) merged.page = searchParams.page;
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === undefined || v === '') {
        delete merged[k];
      } else {
        merged[k] = v;
      }
    });
    const qs = new URLSearchParams(merged).toString();
    return `/d/${slug}/inventory${qs ? '?' + qs : ''}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Available Inventory</h1>
          <p className="text-gray-500 mt-1">
            {totalCount} vehicle{totalCount !== 1 ? 's' : ''} found
            {searchParams.make ? ` · ${searchParams.make}` : ''}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <form method="GET" className="flex flex-wrap gap-3 items-end">
            {/* Make Filter */}
            <div className="flex flex-col gap-1 min-w-[140px]">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Make</label>
              <select
                name="make"
                defaultValue={searchParams.make ?? ''}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-1 min-w-[170px]">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sort By</label>
              <select
                name="sort"
                defaultValue={searchParams.sort ?? 'newest'}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Min */}
            <div className="flex flex-col gap-1 min-w-[120px]">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Min Price</label>
              <input
                type="number"
                name="priceMin"
                placeholder="$ Min"
                defaultValue={searchParams.priceMin ?? ''}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Max */}
            <div className="flex flex-col gap-1 min-w-[120px]">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price</label>
              <input
                type="number"
                name="priceMax"
                placeholder="$ Max"
                defaultValue={searchParams.priceMax ?? ''}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: 'var(--primary, #2563eb)' }}
              >
                Apply Filters
              </button>
              {(searchParams.make || searchParams.model || searchParams.priceMin || searchParams.priceMax) && (
                <Link
                  href={`/d/${slug}/inventory`}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Clear
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Grid */}
        {vehicles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🚗</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No vehicles found</h2>
            <p className="text-gray-400 mb-6">Try adjusting your filters or check back soon.</p>
            <Link
              href={`/d/${slug}/inventory`}
              className="inline-flex px-6 py-3 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--primary, #2563eb)' }}
            >
              Clear All Filters
            </Link>
          </div>
        ) : (
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={buildUrl({ page: String(currentPage - 1) })}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Link>
            )}

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let page: number;
                if (totalPages <= 7) {
                  page = i + 1;
                } else if (currentPage <= 4) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  page = totalPages - 6 + i;
                } else {
                  page = currentPage - 3 + i;
                }
                const isActive = page === currentPage;
                return (
                  <Link
                    key={page}
                    href={buildUrl({ page: String(page) })}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white shadow-sm'
                        : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                    style={isActive ? { backgroundColor: 'var(--primary, #2563eb)' } : {}}
                  >
                    {page}
                  </Link>
                );
              })}
            </div>

            {currentPage < totalPages && (
              <Link
                href={buildUrl({ page: String(currentPage + 1) })}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        )}

        {pagination && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Showing {(currentPage - 1) * (pagination.pageSize) + 1}–
            {Math.min(currentPage * pagination.pageSize, totalCount)} of {totalCount} vehicles
          </p>
        )}
      </div>
    </div>
  );
}
