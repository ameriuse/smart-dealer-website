import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDealer, getVehicle } from '@/lib/api';
import PhotoGallery from '@/components/PhotoGallery';
import FinanceCalculator from '@/components/FinanceCalculator';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

interface VDPProps {
  params: { slug: string; vehicleSlug: string };
}

export async function generateMetadata({ params }: VDPProps): Promise<Metadata> {
  const vehicle = await getVehicle(params.slug, params.vehicleSlug);
  if (!vehicle) return {};
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const price = vehicle.price ? ` | $${vehicle.price.toLocaleString()}` : '';
  return {
    title: `${title}${price}`,
    description: vehicle.description
      ?? `${title} for sale at ${vehicle.dealer.name}.${vehicle.odometer ? ` ${vehicle.odometer.toLocaleString()} miles.` : ''}${vehicle.inspection?.overallScore ? ` Condition score ${vehicle.inspection.overallScore}/100.` : ''}`,
    openGraph: {
      title: `${title}${price}`,
      images: vehicle.mainImageUrl ? [{ url: vehicle.mainImageUrl }] : [],
    },
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

const SEVERITY_STYLES: Record<string, string> = {
  critical: 'bg-red-50 text-red-700 border-red-200',
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-blue-50 text-blue-700 border-blue-200',
  info: 'bg-gray-50 text-gray-600 border-gray-200',
};

const SCORE_BREAKDOWN_LABELS: Record<string, string> = {
  mechanical: 'Mechanical',
  electrical: 'Electrical',
  interior: 'Interior',
  body: 'Body & Paint',
  tires: 'Tires & Wheels',
  safety: 'Safety Systems',
};

export default async function VehicleDetailPage({ params }: VDPProps) {
  const { slug, vehicleSlug } = params;

  const [dealer, vehicle] = await Promise.all([
    getDealer(slug),
    getVehicle(slug, vehicleSlug),
  ]);

  if (!dealer || !vehicle) notFound();

  const inspection = vehicle.inspection;
  const score = inspection?.overallScore;
  const obdCodes = inspection?.obd?.codes ?? [];
  const recalls = inspection?.recalls;
  const scoreBreakdown = inspection?.scoreBreakdown;
  const lastSix = vehicle.vin ? vehicle.vin.slice(-6) : null;

  const scoreColorMap = {
    green: '#16a34a',
    yellow: '#d97706',
    red: '#dc2626',
    gray: '#6b7280',
  };
  const scoreColor = inspection?.scoreColor ?? 'gray';
  const scoreHex = scoreColorMap[scoreColor];

  // Score label
  const scoreLabel = score != null
    ? score >= 75 ? 'Good Condition' : score >= 50 ? 'Fair Condition' : 'Needs Attention'
    : null;

  // Monthly payment (60mo @ 6.9% APR)
  const monthlyPayment = vehicle.price
    ? Math.round((vehicle.price * (0.069 / 12) * Math.pow(1 + 0.069 / 12, 60)) / (Math.pow(1 + 0.069 / 12, 60) - 1))
    : null;

  const allPhotos: Array<{ url: string; label?: string | null }> = [];
  if (vehicle.mainImageUrl) allPhotos.push({ url: vehicle.mainImageUrl, label: 'Main Photo' });
  vehicle.photos?.forEach((p) => {
    if (p.url !== vehicle.mainImageUrl) allPhotos.push(p);
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400">
            <Link href={`/d/${slug}`} className="hover:text-gray-700 transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href={`/d/${slug}/inventory`} className="hover:text-gray-700 transition-colors">Inventory</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-700 font-medium truncate">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <PhotoGallery photos={allPhotos} vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
            </div>

            {/* Vehicle title + price (mobile) */}
            <div className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h1 className="text-2xl font-bold text-gray-900">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              {dealer.showPricing && vehicle.price != null && (
                <div className="mt-2">
                  <div className="text-3xl font-bold tabular-nums" style={{ color: 'var(--primary, #1d4ed8)' }}>
                    {formatPrice(vehicle.price)}
                  </div>
                  {monthlyPayment && (
                    <p className="text-sm text-gray-500 mt-1">
                      Est. <span className="font-semibold">${monthlyPayment.toLocaleString()}/mo</span> for 60 months
                    </p>
                  )}
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                {vehicle.odometer != null && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    {formatMileage(vehicle.odometer)}
                  </span>
                )}
                {lastSix && <span className="font-mono text-xs text-gray-400">···{lastSix}</span>}
              </div>
            </div>

            {/* ── CONDITION REPORT ── */}
            {inspection && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-900">Vehicle Condition Report</h2>
                    {inspection.completedAt && (
                      <p className="text-xs text-gray-400">
                        Inspected {new Date(inspection.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  {/* Overall score bar */}
                  {score != null && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Overall Score</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold tabular-nums" style={{ color: scoreHex }}>{score}</span>
                          <span className="text-sm text-gray-400">/ 100</span>
                          {scoreLabel && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: scoreHex + '18', color: scoreHex }}>
                              {scoreLabel}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${score}%`, backgroundColor: scoreHex }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Category breakdown */}
                  {scoreBreakdown && Object.keys(scoreBreakdown).length > 0 && (
                    <div className="mb-5 space-y-3">
                      {Object.entries(scoreBreakdown).map(([key, val]) => {
                        const pct = Math.max(0, Math.min(100, val));
                        const barColor = pct >= 75 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626';
                        return (
                          <div key={key}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-medium text-gray-600">{SCORE_BREAKDOWN_LABELS[key] ?? key}</span>
                              <span className="font-bold tabular-nums" style={{ color: barColor }}>{pct}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* R/Y/G counts */}
                  {(inspection.greenCount != null || inspection.yellowCount != null || inspection.redCount != null) && (
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="text-center p-3 rounded-xl bg-green-50 border border-green-100">
                        <div className="text-2xl font-bold text-green-700">{inspection.greenCount ?? 0}</div>
                        <div className="text-xs text-green-600 font-medium mt-0.5">Good</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-amber-50 border border-amber-100">
                        <div className="text-2xl font-bold text-amber-700">{inspection.yellowCount ?? 0}</div>
                        <div className="text-xs text-amber-600 font-medium mt-0.5">Marginal</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-red-50 border border-red-100">
                        <div className="text-2xl font-bold text-red-700">{inspection.redCount ?? 0}</div>
                        <div className="text-xs text-red-600 font-medium mt-0.5">Attention</div>
                      </div>
                    </div>
                  )}

                  {/* Status checklist */}
                  <div className="space-y-2.5 border-t border-gray-100 pt-4">
                    <div className={`flex items-center gap-3 text-sm font-medium ${obdCodes.length === 0 ? 'text-green-700' : 'text-amber-700'}`}>
                      <span className="text-base">{obdCodes.length === 0 ? '✅' : '⚠️'}</span>
                      {obdCodes.length === 0 ? '0 Fault Codes Found' : `${obdCodes.length} Fault Code${obdCodes.length !== 1 ? 's' : ''} Found`}
                    </div>
                    <div className={`flex items-center gap-3 text-sm font-medium ${!recalls || recalls.count === 0 ? 'text-green-700' : 'text-red-700'}`}>
                      <span className="text-base">{!recalls || recalls.count === 0 ? '✅' : '⚠️'}</span>
                      {!recalls || recalls.count === 0 ? 'No Open Recalls (NHTSA)' : `${recalls.count} Open Recall${recalls.count !== 1 ? 's' : ''}`}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-green-700">
                      <span className="text-base">✅</span>
                      Inspection Completed
                    </div>
                    {inspection.inspectorName && (
                      <div className="flex items-center gap-3 text-sm font-medium text-green-700">
                        <span className="text-base">✅</span>
                        Inspected by {inspection.inspectorName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* OBD Codes */}
            {obdCodes.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 bg-amber-50">
                  <h2 className="text-base font-bold text-gray-900">
                    Diagnostic Fault Codes ({obdCodes.length})
                  </h2>
                </div>
                <div className="p-5 space-y-3">
                  {obdCodes.map((code, idx) => {
                    const sev = (code.severity ?? 'info').toLowerCase();
                    const style = SEVERITY_STYLES[sev] ?? SEVERITY_STYLES.info;
                    return (
                      <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border ${style}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold font-mono bg-white/60 px-2 py-0.5 rounded border border-current/20">
                              {code.code}
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wide opacity-70">{code.severity}</span>
                          </div>
                          <p className="text-sm font-medium">{code.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NHTSA Recalls */}
            {recalls && recalls.count > 0 && recalls.campaigns && recalls.campaigns.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-red-100 bg-red-50">
                  <h2 className="text-base font-bold text-red-900">
                    NHTSA Safety Recalls ({recalls.count})
                  </h2>
                </div>
                <div className="p-5 space-y-4">
                  {recalls.campaigns.map((campaign, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-red-50 border border-red-200">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-xs font-bold font-mono bg-white px-2 py-0.5 rounded border border-red-200 text-red-700">
                          {campaign.campaignNumber}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(campaign.reportDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-red-800 uppercase tracking-wide mb-1">{campaign.component}</p>
                      <p className="text-sm text-gray-700 mb-2">{campaign.summary}</p>
                      {campaign.remedy && (
                        <div className="text-xs text-gray-600 bg-white/60 rounded-lg p-2">
                          <span className="font-semibold">Remedy: </span>{campaign.remedy}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicle Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-900">Vehicle Details</h2>
              </div>
              <div className="p-5">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: 'Year', value: vehicle.year },
                    { label: 'Make', value: vehicle.make },
                    { label: 'Model', value: vehicle.model },
                    { label: 'Mileage', value: vehicle.odometer != null ? formatMileage(vehicle.odometer) : 'N/A' },
                    { label: 'VIN', value: vehicle.vin ?? 'N/A' },
                    ...(dealer.showPricing && vehicle.price != null ? [{ label: 'Price', value: formatPrice(vehicle.price) }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="pb-3 border-b border-gray-50">
                      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</dt>
                      <dd className="text-sm font-semibold text-gray-900 mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h2 className="text-base font-bold text-gray-900 mb-3">About This Vehicle</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
              </div>
            )}

            {/* Finance Calculator (mobile only) */}
            <div className="lg:hidden">
              {dealer.showPricing && vehicle.price != null && (
                <FinanceCalculator price={vehicle.price} slug={slug} />
              )}
            </div>

            {/* Lead Form (mobile only) */}
            <div className="lg:hidden pb-24">
              <LeadForm
                slug={slug}
                vehicleId={vehicle.id}
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />
            </div>
          </div>

          {/* ── RIGHT SIDEBAR (desktop only) ── */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-5">

              {/* Price + payment */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                {dealer.showPricing && vehicle.price != null ? (
                  <>
                    <div className="text-3xl font-bold tabular-nums mb-1" style={{ color: 'var(--primary, #1d4ed8)' }}>
                      {formatPrice(vehicle.price)}
                    </div>
                    {monthlyPayment && (
                      <p className="text-sm text-gray-500">
                        Est. <span className="font-semibold text-gray-700">${monthlyPayment.toLocaleString()}/mo</span> · 60 mo @ 6.9% APR
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">+ tax, title, license</p>
                  </>
                ) : (
                  <p className="text-gray-500 italic text-sm">Price on request</p>
                )}
                {vehicle.odometer != null && (
                  <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    {formatMileage(vehicle.odometer)}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-2.5">
                <Link
                  href={`/d/${slug}/financing`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Apply for Financing
                </Link>
                <Link
                  href={`/d/${slug}/trade-in`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  Get Trade-In Value
                </Link>
                {vehicle.dealer.phone && (
                  <a
                    href={`tel:${vehicle.dealer.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {vehicle.dealer.phone}
                  </a>
                )}
              </div>

              {/* Finance Calculator */}
              {dealer.showPricing && vehicle.price != null && (
                <FinanceCalculator price={vehicle.price} slug={slug} />
              )}

              {/* Lead Form */}
              <LeadForm
                slug={slug}
                vehicleId={vehicle.id}
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40 shadow-lg">
        <div className="flex gap-2 max-w-md mx-auto">
          {vehicle.dealer.phone && (
            <a
              href={`tel:${vehicle.dealer.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call
            </a>
          )}
          <Link
            href={`/d/${slug}/financing`}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Finance
          </Link>
          <a
            href="#lead-form-mobile"
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold border border-gray-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            Message
          </a>
        </div>
      </div>
    </div>
  );
}
