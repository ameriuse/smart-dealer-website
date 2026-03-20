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

const SCORE_COLOR: Record<string, string> = {
  green: '#16a34a',
  yellow: '#d97706',
  red: '#dc2626',
  gray: '#6b7280',
};

const SCORE_LABEL: Record<string, string> = {
  green: 'Good',
  yellow: 'Fair',
  red: 'Poor',
  gray: 'N/A',
};

export default function VehicleCard({ vehicle, slug, showPricing, priority = false }: VehicleCardProps) {
  const inspection = vehicle.inspection;
  const score = inspection?.overallScore;
  const scoreColor = inspection?.scoreColor ?? 'gray';
  const scoreHex = SCORE_COLOR[scoreColor];
  const href = `/d/${slug}/inventory/${vehicle.slug}`;

  // Monthly payment (60mo @ 6.9%)
  const monthlyPayment = vehicle.price
    ? Math.round((vehicle.price * (0.069 / 12) * Math.pow(1 + 0.069 / 12, 60)) / (Math.pow(1 + 0.069 / 12, 60) - 1))
    : null;

  return (
    <Link href={href} className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl">
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 h-full flex flex-col">

        {/* Image — 16:9 */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden flex-shrink-0">
          {vehicle.mainImageUrl ? (
            <Image
              src={vehicle.mainImageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.odometer != null ? ` — ${formatMileage(vehicle.odometer)}` : ''} for sale`}
              fill
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <svg className="w-14 h-14 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* OBD badge */}
          {inspection && (
            <div className="absolute top-2.5 right-2.5">
              <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold bg-white/95 text-blue-700 shadow-sm backdrop-blur-sm border border-white/50">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Inspected
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-bold text-gray-900 text-[0.95rem] leading-snug group-hover:text-blue-700 transition-colors">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>

          {/* Mileage */}
          {vehicle.odometer != null && (
            <p className="text-sm text-gray-500 mt-0.5">{formatMileage(vehicle.odometer)}</p>
          )}

          {/* Condition score dots */}
          {score != null && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < Math.round(score / 20);
                  return (
                    <span
                      key={i}
                      className="inline-block w-3 h-3 rounded-full border"
                      style={{
                        backgroundColor: filled ? scoreHex : 'transparent',
                        borderColor: filled ? scoreHex : '#d1d5db',
                      }}
                    />
                  );
                })}
              </div>
              <span className="text-xs font-semibold" style={{ color: scoreHex }}>
                {SCORE_LABEL[scoreColor]} ({score}/100)
              </span>
            </div>
          )}

          <div className="flex-1" />

          {/* Price */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            {showPricing && vehicle.price != null ? (
              <>
                <div className="text-xl font-extrabold tabular-nums text-gray-900">
                  {formatPrice(vehicle.price)}
                </div>
                {monthlyPayment && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Est. <span className="font-semibold text-gray-500">${monthlyPayment.toLocaleString()}/mo</span>
                  </p>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-400 italic">Price on request</span>
            )}

            <div
              className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold text-center text-white transition-all group-hover:brightness-90"
              style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
            >
              View Details
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
