import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDealer, getVehicles } from '@/lib/api';
import VehicleCard from '@/components/VehicleCard';
import FilterSidebar from '@/components/FilterSidebar';
import { resolveTemplate } from '@/lib/templates/registry';

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
    body?: string;
    fuel?: string;
  };
}

export async function generateMetadata({ params, searchParams }: SRPProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return {};
  const makeLabel = searchParams.make ? ` ${searchParams.make}` : '';
  return {
    title: `${dealer.vehicleCount} Used${makeLabel} Cars`,
    description: `Browse ${dealer.vehicleCount} OBD-verified${makeLabel} vehicles at ${dealer.name}. Real inspection scores, transparent pricing.`,
  };
}

function buildUrl(slug: string, searchParams: Record<string, string | undefined>, overrides: Record<string, string | undefined>): string {
  const merged: Record<string, string> = {};
  Object.entries(searchParams).forEach(([k, v]) => { if (v) merged[k] = v; });
  Object.entries(overrides).forEach(([k, v]) => {
    if (v === undefined || v === '') delete merged[k];
    else merged[k] = v;
  });
  const qs = new URLSearchParams(merged).toString();
  return `/d/${slug}/inventory${qs ? '?' + qs : ''}`;
}

// Monthly budget ranges used by the Finance-First budget bar above the grid
const MONTHLY_BUDGETS = [
  { label: 'Under $200/mo', priceMax: '12000' },
  { label: '$200–$350/mo', priceMin: '12000', priceMax: '21000' },
  { label: '$350–$500/mo', priceMin: '21000', priceMax: '30000' },
  { label: '$500–$700/mo', priceMin: '30000', priceMax: '42000' },
  { label: '$700+/mo', priceMin: '42000' },
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

  // ── Template resolution ────────────────────────────────────────────────────
  const template = resolveTemplate(dealer.websiteConfig?.templateId);

  const vehicles = vehiclesData?.vehicles ?? [];
  const pagination = vehiclesData?.pagination;
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const totalCount = pagination?.totalCount ?? 0;

  // Active filters display
  const activeFilters: Array<{ label: string; clearKey: string }> = [];
  if (searchParams.make) activeFilters.push({ label: `Make: ${searchParams.make}`, clearKey: 'make' });
  if (searchParams.priceMin || searchParams.priceMax) {
    const label = [
      searchParams.priceMin ? `$${Number(searchParams.priceMin).toLocaleString()}` : '',
      searchParams.priceMax ? `$${Number(searchParams.priceMax).toLocaleString()}` : '',
    ].filter(Boolean).join(' – ');
    activeFilters.push({ label: `Price: ${label}`, clearKey: 'price' });
  }
  if (searchParams.yearMin || searchParams.yearMax) {
    activeFilters.push({ label: `Year: ${searchParams.yearMin ?? ''}–${searchParams.yearMax ?? ''}`, clearKey: 'year' });
  }
  if (searchParams.scoreMin) activeFilters.push({ label: 'OBD Verified', clearKey: 'scoreMin' });

  // Grid class: 2-col (PRISM, SHIFT) or 3-col (APEX, Finance-First)
  const gridClass = template.srp.gridCols === 2
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link href={`/d/${slug}`} className="hover:text-gray-600 transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-600 font-medium">Inventory</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {totalCount > 0
                  ? `${totalCount} ${searchParams.make ? searchParams.make + ' ' : ''}Vehicle${totalCount !== 1 ? 's' : ''}`
                  : 'Search Inventory'}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {dealer.name}
                {searchParams.sort === 'score_desc' && ' · sorted by condition score'}
                {searchParams.sort === 'price_asc' && ' · price: low to high'}
                {searchParams.sort === 'price_desc' && ' · price: high to low'}
              </p>
            </div>

            {/* Desktop sort pills */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
              <span>Sort:</span>
              {(['newest', 'price_asc', 'price_desc', 'score_desc'] as const).map((s) => (
                <Link
                  key={s}
                  href={buildUrl(slug, searchParams as Record<string, string | undefined>, { sort: s, page: undefined })}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    (searchParams.sort ?? 'newest') === s
                      ? 'text-white'
                      : 'text-gray-600 bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                  style={(searchParams.sort ?? 'newest') === s ? { backgroundColor: 'var(--primary)' } : {}}
                >
                  {s === 'newest' ? 'Newest' : s === 'price_asc' ? 'Price ↑' : s === 'price_desc' ? 'Price ↓' : 'Score'}
                </Link>
              ))}
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((f) => (
                <span
                  key={f.clearKey}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {f.label}
                  <Link
                    href={buildUrl(slug, searchParams as Record<string, string | undefined>, {
                      [f.clearKey]: undefined,
                      ...(f.clearKey === 'price' ? { priceMin: undefined, priceMax: undefined } : {}),
                      ...(f.clearKey === 'year' ? { yearMin: undefined, yearMax: undefined } : {}),
                      page: undefined,
                    })}
                    className="text-blue-400 hover:text-blue-700 transition-colors ml-0.5"
                    aria-label={`Remove ${f.label} filter`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Link>
                </span>
              ))}
              <Link
                href={`/d/${slug}/inventory`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Clear All
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Finance-First: Monthly Budget Bar above grid ── */}
      {template.srp.showBudgetBar && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Monthly Budget:</span>
              {MONTHLY_BUDGETS.map((range) => {
                const isActive =
                  (searchParams.priceMin ?? '') === (range.priceMin ?? '') &&
                  (searchParams.priceMax ?? '') === (range.priceMax ?? '');
                const overrides: Record<string, string | undefined> = {
                  priceMin: range.priceMin,
                  priceMax: range.priceMax,
                  page: undefined,
                };
                return (
                  <Link
                    key={range.label}
                    href={isActive
                      ? buildUrl(slug, searchParams as Record<string, string | undefined>, { priceMin: undefined, priceMax: undefined, page: undefined })
                      : buildUrl(slug, searchParams as Record<string, string | undefined>, overrides)
                    }
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      isActive
                        ? 'text-white border-transparent'
                        : 'text-gray-600 bg-white border-gray-200 hover:border-green-400 hover:text-green-700'
                    }`}
                    style={isActive ? { backgroundColor: 'var(--primary, #1d4ed8)' } : {}}
                  >
                    {range.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Main content: sidebar + grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">

          {/* Filter Sidebar — shown per template.srp.showSidebar */}
          {template.srp.showSidebar && <FilterSidebar slug={slug} totalCount={totalCount} />}

          {/* Vehicle Grid */}
          <div className="flex-1 min-w-0">
            {vehicles.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                <div className="text-6xl mb-5">🔍</div>
                <h2 className="text-xl font-bold text-gray-700 mb-2">No vehicles found</h2>
                <p className="text-gray-400 mb-6 text-sm">Try adjusting your filters or search criteria</p>
                <Link
                  href={`/d/${slug}/inventory`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Clear All Filters
                </Link>
              </div>
            ) : (
              <>
                {/* Vehicle grid — cols driven by template.srp.gridCols */}
                <div className={gridClass}>
                  {vehicles.map((vehicle, i) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      slug={slug}
                      showPricing={dealer.showPricing}
                      priority={i < 6}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    {currentPage > 1 && (
                      <Link
                        href={buildUrl(slug, searchParams as Record<string, string | undefined>, { page: String(currentPage - 1) })}
                        className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Prev
                      </Link>
                    )}

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        let page: number;
                        if (totalPages <= 7) page = i + 1;
                        else if (currentPage <= 4) page = i + 1;
                        else if (currentPage >= totalPages - 3) page = totalPages - 6 + i;
                        else page = currentPage - 3 + i;
                        const isActive = page === currentPage;
                        return (
                          <Link
                            key={page}
                            href={buildUrl(slug, searchParams as Record<string, string | undefined>, { page: String(page) })}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                              isActive
                                ? 'text-white shadow-sm'
                                : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                            }`}
                            style={isActive ? { backgroundColor: 'var(--primary)' } : {}}
                          >
                            {page}
                          </Link>
                        );
                      })}
                    </div>

                    {currentPage < totalPages && (
                      <Link
                        href={buildUrl(slug, searchParams as Record<string, string | undefined>, { page: String(currentPage + 1) })}
                        className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        Next
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}

                {pagination && totalCount > 0 && (
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Showing {(currentPage - 1) * pagination.pageSize + 1}–
                    {Math.min(currentPage * pagination.pageSize, totalCount)} of {totalCount} vehicles
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
