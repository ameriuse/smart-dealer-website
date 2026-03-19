import { notFound } from 'next/navigation';
import { getDealer } from '@/lib/api';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

interface ContactPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const dealer = await getDealer(params.slug);
  if (!dealer) return {};
  return {
    title: 'Contact Us',
    description: `Get in touch with ${dealer.name}. Call, email, or send us a message.`,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { slug } = params;
  const dealer = await getDealer(slug);
  if (!dealer) notFound();

  const fullAddress = [dealer.address, dealer.city, dealer.state].filter(Boolean).join(', ');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            We would love to hear from you. Reach out with any questions about our inventory, financing, or services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Dealer Info Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">{dealer.name}</h2>

              <div className="space-y-4">
                {fullAddress && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                      <p className="text-sm text-gray-700">{fullAddress}</p>
                    </div>
                  </div>
                )}

                {dealer.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                      <a
                        href={`tel:${dealer.phone}`}
                        className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {dealer.phone}
                      </a>
                    </div>
                  </div>
                )}

                {dealer.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                      <a
                        href={`mailto:${dealer.email}`}
                        className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all"
                      >
                        {dealer.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Block */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                {[
                  { icon: '🚗', text: 'Ask about any vehicle in our inventory' },
                  { icon: '💰', text: 'Get a personalized financing quote' },
                  { icon: '📅', text: 'Schedule a test drive appointment' },
                  { icon: '🔧', text: 'Learn more about our inspection process' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <LeadForm slug={slug} vehicleName="General Inquiry" />
          </div>
        </div>
      </div>
    </div>
  );
}
