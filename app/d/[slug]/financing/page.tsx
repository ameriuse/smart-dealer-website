import { notFound } from 'next/navigation';
import { getDealer } from '@/lib/api';
import FinanceCalculator from '@/components/FinanceCalculator';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

interface FinancingPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: FinancingPageProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return {};
  return {
    title: 'Financing',
    description: `Apply for auto financing at ${dealer.name}. Get pre-approved quickly with competitive rates.`,
  };
}

export default async function FinancingPage({ params }: FinancingPageProps) {
  const { slug } = params;
  const dealer = await getDealer(slug);
  if (!dealer) notFound();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Auto Financing</h1>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Calculate your estimated monthly payment and apply for financing. We work with multiple lenders to find the best rate for you.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: '⚡',
              title: 'Quick Pre-Approval',
              desc: 'Get a decision in minutes, not days',
            },
            {
              icon: '💳',
              title: 'All Credit Welcome',
              desc: 'We work with all credit backgrounds',
            },
            {
              icon: '🔒',
              title: 'Secure Application',
              desc: 'Your information is always protected',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Calculator */}
          <div>
            <FinanceCalculator slug={slug} price={25000} />
          </div>

          {/* Application Form */}
          <div>
            <LeadForm
              slug={slug}
              vehicleName="Financing Inquiry"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-4 bg-gray-100 rounded-xl">
          <p className="text-xs text-gray-500 text-center">
            Monthly payment estimates are for illustrative purposes only and do not constitute a loan offer.
            Actual rates and terms depend on creditworthiness, vehicle, and lender. Taxes, title, and fees not included.
          </p>
        </div>
      </div>
    </div>
  );
}
