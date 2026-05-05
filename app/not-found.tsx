import Link from 'next/link';
import BrandLockup from './_components/brand-lockup';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <Link href="/" aria-label="Ameriuse home">
          <BrandLockup mode="hub" />
        </Link>
        <p className="mt-14 text-sm font-black uppercase tracking-[0.24em] text-cyan-200">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
          This page is not available.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
          Use one of the product paths below to continue through the Ameriuse ecosystem.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="https://ameriuse.com"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2f6bff] px-6 py-3 text-sm font-black text-white transition hover:bg-[#2458d8]"
          >
            Back to Ameriuse
          </Link>
          <a
            href="https://smartdealer.ameriuse.com"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/12"
          >
            Open Smart Dealer
          </a>
          <a
            href="https://smartcan.ameriuse.com"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/12"
          >
            Try SmartCAN Pro
          </a>
        </div>
      </div>
    </main>
  );
}
