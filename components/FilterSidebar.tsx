'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
  slug: string;
  totalCount: number;
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'score_desc', label: 'Best Condition Score' },
  { value: 'mileage_asc', label: 'Lowest Mileage' },
];

const SCORE_OPTIONS = [
  { value: '', label: 'All Vehicles' },
  { value: '75', label: '🟢 Excellent (75–100)' },
  { value: '60', label: '🟡 Good (60–74)' },
  { value: '40', label: '🟠 Fair (40–59)' },
];

const PRICE_PRESETS = [
  { label: 'Under $10k', max: '10000' },
  { label: 'Under $15k', max: '15000' },
  { label: 'Under $20k', max: '20000' },
  { label: 'Under $30k', max: '30000' },
];

export default function FilterSidebar({ slug, totalCount }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const get = useCallback((key: string) => searchParams.get(key) ?? '', [searchParams]);

  const [sort, setSort] = useState(get('sort') || 'newest');
  const [make, setMake] = useState(get('make'));
  const [priceMin, setPriceMin] = useState(get('priceMin'));
  const [priceMax, setPriceMax] = useState(get('priceMax'));
  const [yearMin, setYearMin] = useState(get('yearMin'));
  const [yearMax, setYearMax] = useState(get('yearMax'));
  const [scoreMin, setScoreMin] = useState(get('scoreMin'));
  const [obdOnly, setObdOnly] = useState(get('scoreMin') === '1');

  const activeFilterCount = [make, priceMin, priceMax, yearMin, yearMax, scoreMin]
    .filter(Boolean).length;

  function applyFilters() {
    const params = new URLSearchParams();
    if (sort && sort !== 'newest') params.set('sort', sort);
    if (make) params.set('make', make);
    if (priceMin) params.set('priceMin', priceMin);
    if (priceMax) params.set('priceMax', priceMax);
    if (yearMin) params.set('yearMin', yearMin);
    if (yearMax) params.set('yearMax', yearMax);
    if (scoreMin) params.set('scoreMin', scoreMin);
    router.push(`/d/${slug}/inventory${params.toString() ? '?' + params.toString() : ''}`);
    setMobileOpen(false);
  }

  function clearAll() {
    setSort('newest');
    setMake('');
    setPriceMin('');
    setPriceMax('');
    setYearMin('');
    setYearMax('');
    setScoreMin('');
    setObdOnly(false);
    router.push(`/d/${slug}/inventory`);
    setMobileOpen(false);
  }

  function setPricePreset(min: string | undefined, max: string | undefined) {
    setPriceMin(min ?? '');
    setPriceMax(max ?? '');
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Sort By</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* OBD Verified Only */}
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
        <div>
          <div className="text-sm font-semibold text-blue-900">🔬 OBD Verified Only</div>
          <div className="text-xs text-blue-600">Show vehicles with inspection data</div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={obdOnly}
          onClick={() => {
            const next = !obdOnly;
            setObdOnly(next);
            setScoreMin(next ? '1' : '');
          }}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${obdOnly ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
          <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${obdOnly ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Condition Score */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Condition Score</label>
        <div className="space-y-1.5">
          {SCORE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setScoreMin(opt.value);
                setObdOnly(opt.value === '1');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                scoreMin === opt.value
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={scoreMin === opt.value ? { backgroundColor: 'var(--primary)' } : {}}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Make</label>
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="e.g. Toyota, Honda..."
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder:text-gray-400"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price Range</label>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="Min $"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max $"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setPricePreset(undefined, preset.max)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                priceMax === preset.max && !priceMin
                  ? 'text-white border-transparent'
                  : 'text-gray-600 border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
              style={priceMax === preset.max && !priceMin ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : {}}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Year Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={yearMin}
            onChange={(e) => setYearMin(e.target.value)}
            placeholder="From"
            min="1990"
            max="2025"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
          <input
            type="number"
            value={yearMax}
            onChange={(e) => setYearMax(e.target.value)}
            placeholder="To"
            min="1990"
            max="2025"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={applyFilters}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-95"
          style={{ backgroundColor: 'var(--primary, #2563eb)' }}
        >
          Apply Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-y-auto filter-scroll max-h-[calc(100vh-7rem)]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-gray-900">Filters</h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
              >
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile: sticky filter bar + drawer */}
      <div className="lg:hidden">
        <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 flex items-center justify-center rounded-full text-white text-xs font-bold" style={{ backgroundColor: 'var(--primary)' }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              const params = new URLSearchParams(searchParams.toString());
              params.set('sort', e.target.value);
              router.push(`/d/${slug}/inventory?${params.toString()}`);
            }}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="text-xs text-gray-400 font-medium whitespace-nowrap">
            {totalCount} found
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl overflow-y-auto animate-slide-down">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-900">Filters &amp; Sort</h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Close filters"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-5">
                {filterContent}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
