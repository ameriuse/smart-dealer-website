import { notFound } from 'next/navigation';
import { getDealer } from '@/lib/api';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

interface TradeInPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: TradeInPageProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return {};
  return {
    title: 'Trade-In Value',
    description: `Get a free trade-in appraisal at ${dealer.name}. Find out what your vehicle is worth today.`,
  };
}

export default async function TradeInPage({ params }: TradeInPageProps) {
  const { slug } = params;
  const dealer = await getDealer(slug);
  if (!dealer) notFound();

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What&apos;s Your Car Worth?
          </h1>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Get a free, no-obligation trade-in appraisal from {dealer.name}.
            We&apos;ll respond within 1 business hour.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '⚡', title: 'Fast Response', desc: 'Hear back within 1 hour' },
            { icon: '💰', title: 'Fair Market Value', desc: 'Competitive appraisals' },
            { icon: '🤝', title: 'No Obligation', desc: 'Free appraisal, no pressure' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Info column */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">How It Works</h2>
              <ol className="space-y-4">
                {[
                  { step: '1', title: 'Tell us about your vehicle', desc: 'Year, make, model, mileage, and condition.' },
                  { step: '2', title: 'We appraise your trade', desc: 'Our team reviews your info and checks current market data.' },
                  { step: '3', title: 'Get your offer', desc: 'We contact you with a fair trade-in value — usually within 1 hour.' },
                ].map((item) => (
                  <li key={item.step} className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="text-sm font-bold text-blue-900 mb-2">Why trade in with us?</h3>
              <ul className="space-y-1.5 text-xs text-blue-800">
                {[
                  'Apply your trade-in value directly to any vehicle',
                  'Skip the hassle of selling privately',
                  'We accept vehicles in any condition',
                  'Financing and trade-in handled in one place',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {dealer.phone && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center">
                <p className="text-sm text-gray-500 mb-3">Prefer to talk in person?</p>
                <a
                  href={`tel:${dealer.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {dealer.phone}
                </a>
              </div>
            )}
          </div>

          {/* Form */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Get Your Trade-In Value</h2>
              <LeadForm slug={slug} vehicleName="Trade-In Inquiry" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
