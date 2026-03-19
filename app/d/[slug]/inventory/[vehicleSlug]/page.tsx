import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDealer, getVehicle } from '@/lib/api';
import PhotoGallery from '@/components/PhotoGallery';
import ConditionScoreRing from '@/components/ConditionScoreRing';
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
  const description = vehicle.description
    ?? `${title} for sale at ${vehicle.dealer.name}. ${vehicle.odometer ? vehicle.odometer.toLocaleString() + ' miles.' : ''}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-blue-100 text-blue-700 border-blue-200',
  info: 'bg-gray-100 text-gray-600 border-gray-200',
};

const SCORE_BREAKDOWN_LABELS: Record<string, string> = {
  mechanical: 'Mechanical',
  electrical: 'Electrical',
  interior: 'Interior',
  body: 'Body & Paint',
  tires: 'Tires & Wheels',
  safety: 'Safety',
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

  // Build photo list: mainImage + additional photos
  const allPhotos: Array<{ url: string; label?: string | null }> = [];
  if (vehicle.mainImageUrl) {
    allPhotos.push({ url: vehicle.mainImageUrl, label: 'Main Photo' });
  }
  vehicle.photos?.forEach((p) => {
    if (p.url !== vehicle.mainImageUrl) {
      allPhotos.push(p);
    }
  });

  const scoreColorMap = {
    green: '#16a34a',
    yellow: '#d97706',
    red: '#dc2626',
    gray: '#6b7280',
  };
  const scoreColor = inspection?.scoreColor ?? 'gray';
  const scoreHex = scoreColorMap[scoreColor];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href={`/d/${slug}`} className="hover:text-gray-900 transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/d/${slug}/inventory`} className="hover:text-gray-900 transition-colors">Inventory</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left Column: Photos + Details ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Photo Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <PhotoGallery photos={allPhotos} vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
            </div>

            {/* Vehicle Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h1>
                  {lastSix && (
                    <p className="text-sm text-gray-400 mt-1 font-mono">VIN: •••••••••{lastSix}</p>
                  )}
                  {vehicle.odometer != null && (
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatMileage(vehicle.odometer)}
                    </p>
                  )}
                </div>
                {dealer.showPricing && vehicle.price != null && (
                  <div className="text-right">
                    <div className="text-3xl font-extrabold" style={{ color: 'var(--primary, #2563eb)' }}>
                      {formatPrice(vehicle.price)}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">+ tax, title, license</p>
                  </div>
                )}
              </div>
            </div>

            {/* ══ TRUST BLOCK ══ */}
            {inspection && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Smart Dealer Inspection Report</h2>
                    {inspection.completedAt && (
                      <p className="text-xs text-gray-400">
                        Inspected {new Date(inspection.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        {inspection.inspectorName ? ` by ${inspection.inspectorName}` : ''}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* Score + Badges Row */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                    {/* Score Ring */}
                    <div className="flex flex-col items-center">
                      <ConditionScoreRing score={score} size={140} />
                      {inspection.dispositionLabel && (
                        <span
                          className="mt-3 px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: scoreHex + '1a',
                            color: scoreHex,
                          }}
                        >
                          {inspection.dispositionLabel}
                        </span>
                      )}
                    </div>

                    {/* Trust Badges */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-3 w-full">
                      {/* OBD Badge */}
                      <div className={`flex items-center gap-3 p-3 rounded-xl border ${obdCodes.length === 0 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                        <div className={`text-xl leading-none ${obdCodes.length === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {obdCodes.length === 0 ? '✅' : '⚠️'}
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${obdCodes.length === 0 ? 'text-green-800' : 'text-yellow-800'}`}>
                            {obdCodes.length === 0 ? '0 Fault Codes' : `${obdCodes.length} Fault Code${obdCodes.length !== 1 ? 's' : ''} Found`}
                          </div>
                          <div className={`text-xs ${obdCodes.length === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                            OBD-II Diagnostic Scan
                          </div>
                        </div>
                      </div>

                      {/* Recalls Badge */}
                      <div className={`flex items-center gap-3 p-3 rounded-xl border ${!recalls || recalls.count === 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className={`text-xl leading-none ${!recalls || recalls.count === 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {!recalls || recalls.count === 0 ? '✅' : '⚠️'}
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${!recalls || recalls.count === 0 ? 'text-green-800' : 'text-red-800'}`}>
                            {!recalls || recalls.count === 0 ? 'No Open Recalls' : `${recalls.count} Open Recall${recalls.count !== 1 ? 's' : ''}`}
                          </div>
                          <div className={`text-xs ${!recalls || recalls.count === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            NHTSA Database Check
                          </div>
                        </div>
                      </div>

                      {/* Smart Dealer Badge */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                        <div className="text-xl leading-none text-blue-600">🛡️</div>
                        <div>
                          <div className="text-sm font-bold text-blue-800">Smart Dealer Verified</div>
                          <div className="text-xs text-blue-600">Professional multi-point inspection</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown Bars */}
                  {scoreBreakdown && Object.keys(scoreBreakdown).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Score Breakdown</h3>
                      <div className="space-y-3">
                        {Object.entries(scoreBreakdown).map(([key, val]) => {
                          const pct = Math.max(0, Math.min(100, val));
                          const barColor = pct >= 75 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626';
                          return (
                            <div key={key}>
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span className="font-medium">{SCORE_BREAKDOWN_LABELS[key] ?? key}</span>
                                <span className="font-bold" style={{ color: barColor }}>{pct}/100</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{ width: `${pct}%`, backgroundColor: barColor }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* R/Y/G Counts */}
                  {(inspection.greenCount != null || inspection.yellowCount != null || inspection.redCount != null) && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 rounded-xl bg-green-50 border border-green-100">
                        <div className="text-2xl font-extrabold text-green-700">{inspection.greenCount ?? 0}</div>
                        <div className="text-xs text-green-600 font-medium mt-1">Good</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-yellow-50 border border-yellow-100">
                        <div className="text-2xl font-extrabold text-yellow-700">{inspection.yellowCount ?? 0}</div>
                        <div className="text-xs text-yellow-600 font-medium mt-1">Marginal</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-red-50 border border-red-100">
                        <div className="text-2xl font-extrabold text-red-700">{inspection.redCount ?? 0}</div>
                        <div className="text-xs text-red-600 font-medium mt-1">Needs Attention</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OBD Report */}
            {obdCodes.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">OBD-II Diagnostic Report</h2>
                    <p className="text-xs text-gray-400">{obdCodes.length} trouble code{obdCodes.length !== 1 ? 's' : ''} detected</p>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {obdCodes.map((code, idx) => {
                    const sev = (code.severity ?? 'info').toLowerCase();
                    const style = SEVERITY_STYLES[sev] ?? SEVERITY_STYLES.info;
                    return (
                      <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border ${style}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold font-mono bg-white/60 px-2 py-0.5 rounded">
                              {code.code}
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                              {code.severity}
                            </span>
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">NHTSA Safety Recalls</h2>
                    <p className="text-xs text-gray-400">{recalls.count} open recall{recalls.count !== 1 ? 's' : ''} on file</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
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

            {/* Vehicle Details Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-900">Vehicle Details</h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: 'Year', value: vehicle.year },
                    { label: 'Make', value: vehicle.make },
                    { label: 'Model', value: vehicle.model },
                    { label: 'Mileage', value: vehicle.odometer != null ? formatMileage(vehicle.odometer) : 'N/A' },
                    { label: 'VIN', value: vehicle.vin ?? 'N/A' },
                    ...(dealer.showPricing && vehicle.price != null ? [{ label: 'Price', value: formatPrice(vehicle.price) }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="border-b border-gray-50 pb-3">
                      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</dt>
                      <dd className="text-sm font-medium text-gray-900 mt-1 font-mono">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">About This Vehicle</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
              </div>
            )}
          </div>

          {/* ── Right Column: Finance + Lead Form ── */}
          <div className="space-y-6">

            {/* Quick Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">Questions About This Vehicle?</h2>
              {vehicle.dealer.phone && (
                <a
                  href={`tel:${vehicle.dealer.phone}`}
                  className="flex items-center gap-3 w-full py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors mb-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Call Dealer</div>
                    <div className="text-sm font-bold text-gray-900">{vehicle.dealer.phone}</div>
                  </div>
                </a>
              )}
              <div className="text-xs text-gray-400 text-center">or send a message below</div>
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
  );
}
