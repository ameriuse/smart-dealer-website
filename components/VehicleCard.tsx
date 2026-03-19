import Image from 'next/image';
import Link from 'next/link';
import type { VehicleListItem } from '@/lib/types';

interface VehicleCardProps {
  vehicle: VehicleListItem;
  slug: string;
  showPricing: boolean;
  priority?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

function getDaysOnLot(publishedAt: string | null | undefined): number | null {
  if (!publishedAt) return null;
  const diff = Date.now() - new Date(publishedAt).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const SCORE_COLOR_MAP = {
  green: { bg: 'bg-green-500', text: 'text-white', label: 'Great', ring: '#16a34a' },
  yellow: { bg: 'bg-amber-500', text: 'text-white', label: 'Good', ring: '#d97706' },
  red: { bg: 'bg-red-500', text: 'text-white', label: 'Fair', ring: '#dc2626' },
  gray: { bg: 'bg-gray-400', text: 'text-white', label: 'N/A', ring: '#6b7280' },
};

/**
 * Premium vehicle listing card with trust badges, score, and pricing.
 */
export default function VehicleCard({ vehicle, slug, showPricing, priority = false }: VehicleCardProps) {
  const inspection = vehicle.inspection;
  const score = inspection?.overallScore;
  const scoreColor = inspection?.scoreColor ?? 'gray';
  const scoreStyle = SCORE_COLOR_MAP[scoreColor];
  const href = `/d/${slug}/inventory/${vehicle.slug}`;
  const daysOnLot = getDaysOnLot(vehicle.publishedAt);
  const obdCodes = inspection?.obd?.codes ?? [];
  const hasRecalls = (inspection?.recalls?.count ?? 0) > 0;
  const isNewArrival = daysOnLot !== null && daysOnLot <= 7;

  // Monthly payment estimate (60mo @ 7.9% APR)
  const monthlyPayment = vehicle.price
    ? Math.round((vehicle.price * (0.079 / 12) * Math.pow(1 + 0.079 / 12, 60)) / (Math.pow(1 + 0.079 / 12, 60) - 1))
    : null;

  return (
    <Link href={href} className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl">
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-card-hover hover:border-gray-200 transition-all duration-250 h-full flex flex-col">

        {/* ── Image ── */}
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden flex-shrink-0">
          {vehicle.mainImageUrl ? (
            <Image
              src={vehicle.mainImageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              priority={priority}
              className="object-cover group-hover:scale-[1.04] transition-transform duration-400 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          )}

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Score Badge — top left */}
          {score != null && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-sm font-extrabold ${scoreStyle.bg} ${scoreStyle.text} shadow-md tabular-nums`}>
                <span className="text-xs opacity-80">Score</span>
                <span>{score}</span>
              </div>
            </div>
          )}

          {/* OBD/Status badges — top right */}
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
            {inspection && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-white/95 text-blue-700 shadow-sm border border-white/50 backdrop-blur-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                OBD
              </span>
            )}
            {hasRecalls && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-red-500/90 text-white shadow-sm backdrop-blur-sm">
                ⚠️ Recall
              </span>
            )}
          </div>

          {/* New Arrival ribbon */}
          {isNewArrival && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-3 px-3">
              <span className="text-xs font-bold text-white/90 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                New Arrival
              </span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug text-[0.95rem]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>

          {/* Stats row */}
          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
            {vehicle.odometer != null && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {formatMileage(vehicle.odometer)}
              </span>
            )}
            {daysOnLot !== null && daysOnLot > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {daysOnLot}d on lot
              </span>
            )}
          </div>

          {/* Trust indicators */}
          {inspection && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {obdCodes.length === 0 ? (
                <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  ✓ 0 Codes
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  ⚠ {obdCodes.length} Code{obdCodes.length > 1 ? 's' : ''}
                </span>
              )}
              {!hasRecalls && (
                <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  ✓ No Recalls
                </span>
              )}
            </div>
          )}

          <div className="flex-1" />

          {/* Price + CTA */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            {showPricing && vehicle.price != null ? (
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold tabular-nums" style={{ color: 'var(--primary, #2563eb)' }}>
                    {formatPrice(vehicle.price)}
                  </span>
                </div>
                {monthlyPayment && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Est. <span className="font-semibold text-gray-500">${monthlyPayment.toLocaleString()}/mo</span> for 60 mo
                  </p>
                )}
              </div>
            ) : (
              <span className="text-sm text-gray-400 italic">Price on request</span>
            )}

            <div
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all group-hover:shadow-md group-hover:brightness-95"
              style={{ backgroundColor: 'var(--primary, #2563eb)' }}
            >
              View Details
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
