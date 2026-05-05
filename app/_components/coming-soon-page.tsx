import Link from 'next/link';
import BrandLockup from './brand-lockup';

type ComingSoonPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ComingSoonPage({ eyebrow, title, description }: ComingSoonPageProps) {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" aria-label="Ameriuse home">
          <BrandLockup mode="hub" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 md:flex">
          <a href="https://smartdealer.ameriuse.com" className="transition hover:text-white">Smart Dealer</a>
          <a href="https://smartcan.ameriuse.com" className="transition hover:text-white">SmartCAN Pro</a>
        </nav>
      </header>
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-5 py-16 sm:px-8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
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
        </div>
      </section>
    </main>
  );
}
