import Image from 'next/image';
import Link from 'next/link';
import type { VehicleListItem } from '@/lib/types';

interface VehicleCardProps {
  vehicle: VehicleListItem;
  slug: string;
  showPricing: boolean;
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

const SCORE_COLOR_MAP = {
  green: { bg: 'bg-green-100', text: 'text-green-700', hex: '#16a34a' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', hex: '#d97706' },
  red: { bg: 'bg-red-100', text: 'text-red-700', hex: '#dc2626' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-500', hex: '#6b7280' },
};

/**
 * Reusable vehicle listing card component for SRP and home page grids.
 */
export default function VehicleCard({ vehicle, slug, showPricing }: VehicleCardProps) {
  const inspection = vehicle.inspection;
  const score = inspection?.overallScore;
  const scoreColor = inspection?.scoreColor ?? 'gray';
  const scoreStyle = SCORE_COLOR_MAP[scoreColor];
  const href = `/d/${slug}/inventory/${vehicle.slug}`;

  return (
    <Link href={href} className="group block">
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200 h-full flex flex-col">

        {/* Image */}
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          {vehicle.mainImageUrl ? (
            <Image
              src={vehicle.mainImageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-5xl">🚗</span>
            </div>
          )}

          {/* OBD Badge Overlay */}
          {inspection && (
            <div className="absolute top-2 right-2">
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur shadow-sm border border-white/50">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-700">Inspected</span>
              </span>
            </div>
          )}

          {/* Score Badge Overlay */}
          {score != null && (
            <div className="absolute top-2 left-2">
              <span
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-extrabold ${scoreStyle.bg} ${scoreStyle.text} shadow-sm`}
              >
                {score}/100
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {vehicle.odometer != null && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {formatMileage(vehicle.odometer)}
              </span>
            )}
          </div>

          {/* Score + Disposition */}
          {inspection && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {score != null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${scoreStyle.bg} ${scoreStyle.text}`}
                >
                  Score: {score}/100
                </span>
              )}
              {inspection.dispositionLabel && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {inspection.dispositionLabel}
                </span>
              )}
            </div>
          )}

          <div className="flex-1" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            {showPricing && vehicle.price != null ? (
              <span className="text-xl font-extrabold" style={{ color: 'var(--primary, #2563eb)' }}>
                {formatPrice(vehicle.price)}
              </span>
            ) : (
              <span className="text-sm text-gray-400 italic">Price on request</span>
            )}

            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all group-hover:shadow-md"
              style={{ backgroundColor: 'var(--primary, #2563eb)' }}
            >
              View Details
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
