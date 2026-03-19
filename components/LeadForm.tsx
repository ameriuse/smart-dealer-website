'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { submitLead } from '@/lib/api';

interface LeadFormProps {
  slug: string;
  vehicleId?: string;
  vehicleName?: string;
  type?: string;
  customTitle?: string;
  customSubtitle?: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_STATE: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notes: '',
};

/**
 * Lead capture form that POSTs to the public dealer leads API.
 * Shows loading/success/error states with user feedback.
 */
export default function LeadForm({
  slug,
  vehicleId,
  vehicleName,
  type = 'inquiry',
  customTitle,
  customSubtitle,
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>({
    ...INITIAL_STATE,
    notes: vehicleName ? `I am interested in the ${vehicleName}.` : '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.firstName.trim() || !form.lastName.trim()) {
        setErrorMsg('Please enter your first and last name.');
        setStatus('error');
        return;
      }
      if (!form.email.trim()) {
        setErrorMsg('Please enter your email address.');
        setStatus('error');
        return;
      }

      setStatus('submitting');
      setErrorMsg('');

      const result = await submitLead(slug, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        notes: form.notes.trim() || undefined,
        vehicleId,
        type,
      });

      if (result) {
        setStatus('success');
        setForm({
          ...INITIAL_STATE,
          notes: vehicleName ? `I am interested in the ${vehicleName}.` : '',
        });
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again or call us directly.');
      }
    },
    [form, slug, vehicleId, vehicleName, type]
  );

  const title = customTitle ?? (vehicleName && vehicleName !== 'General Inquiry' && vehicleName !== 'Financing Inquiry'
    ? 'Interested in This Vehicle?'
    : 'Send Us a Message');
  const subtitle = customSubtitle ?? 'Fill out the form and we\'ll get back to you as soon as possible.';

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Thank you! We have received your inquiry and will be in touch shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-semibold hover:underline"
          style={{ color: 'var(--primary, #2563eb)' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Phone <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="notes" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Message
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            placeholder="Tell us about yourself or what you're looking for..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Error */}
        {status === 'error' && errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--primary, #2563eb)' }}
        >
          {status === 'submitting' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          We respect your privacy. Your information is never shared.
        </p>
      </form>
    </div>
  );
}
