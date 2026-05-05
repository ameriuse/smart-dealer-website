type BrandLockupProps = {
  mode: 'hub' | 'dealer';
  className?: string;
};

export default function BrandLockup({ mode, className = '' }: BrandLockupProps) {
  const isDealer = mode === 'dealer';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/favicon.svg?v=202605"
        alt=""
        className="h-9 w-9 flex-shrink-0 rounded-xl"
        aria-hidden="true"
      />
      <div className="min-w-0 leading-none">
        <div className="text-base font-black tracking-tight text-white sm:text-lg">
          {isDealer ? 'Smart Dealer' : 'Ameriuse'}
        </div>
        <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200/80">
          {isDealer ? 'by Ameriuse' : 'vehicle ecosystem'}
        </div>
      </div>
    </div>
  );
}
