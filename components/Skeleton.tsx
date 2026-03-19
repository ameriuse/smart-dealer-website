/**
 * Skeleton loading components for progressive loading states.
 */

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 bg-gray-100 rounded-full w-20" />
          <div className="h-6 bg-gray-100 rounded-full w-24" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-2">
          <div className="h-7 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded-lg w-24" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonVDP() {
  return (
    <div className="animate-pulse space-y-6 max-w-7xl mx-auto px-4 py-8">
      <div className="aspect-[16/9] bg-gray-200 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-10 bg-gray-200 rounded w-2/3" />
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-40 bg-gray-100 rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="h-48 bg-gray-100 rounded-2xl" />
          <div className="h-64 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="animate-pulse min-h-[560px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
      <div className="text-center space-y-4 w-full max-w-2xl px-4">
        <div className="h-16 bg-white/30 rounded-xl w-3/4 mx-auto" />
        <div className="h-6 bg-white/20 rounded w-1/2 mx-auto" />
        <div className="h-14 bg-white/30 rounded-2xl w-full mx-auto mt-8" />
      </div>
    </div>
  );
}
