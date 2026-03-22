'use client';

import { useState, useCallback, useMemo } from 'react';
import { submitLead, submitAppointment } from '@/lib/api';

interface LeadFormProps {
  slug: string;
  vehicleId?: string;
  vehicleName?: string;
  /** Template ID — drives which tabs are shown and default messaging tone */
  templateId?: string;
  /** Dealer phone — enables direct call/text links inside the form */
  dealerPhone?: string;
}

type Tab = 'message' | 'testdrive' | 'offer';
type ContactPref = 'call' | 'text' | 'email';
type Status = 'idle' | 'submitting' | 'success' | 'error';

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

const IconMessage = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconTag = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconChat = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconMail = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

/**
 * Tabbed lead capture form: Message Dealer, Schedule Test Drive, Make an Offer.
 * - PRISM template: hides "Make Offer" tab (inquiry-only).
 * - Finance-First: pre-fills finance-oriented message.
 * - Submit label and contextual hints change with tab + contact preference.
 * - preferredContact is sent as a separate API field (not just embedded in notes).
 */
export default function LeadForm({ slug, vehicleId, vehicleName, templateId, dealerPhone }: LeadFormProps) {
  const isLuxury = templateId === 'luxury';
  const isFinanceFirst = templateId === 'finance-first';

  const [tab, setTab] = useState<Tab>('message');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Message form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(() => {
    if (isFinanceFirst && vehicleName) return `I'd like to get pre-approved for the ${vehicleName}.`;
    if (vehicleName) return `I'm interested in the ${vehicleName}.`;
    return '';
  });
  const [contactPref, setContactPref] = useState<ContactPref>('call');

  // Test drive form
  const [tdName, setTdName] = useState('');
  const [tdPhone, setTdPhone] = useState('');
  const [tdDate, setTdDate] = useState('');
  const [tdTime, setTdTime] = useState('');

  // Offer form
  const [offerName, setOfferName] = useState('');
  const [offerEmail, setOfferEmail] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [offerNote, setOfferNote] = useState('');

  // ── Dynamic submit label ───────────────────────────────────────────────────
  const submitLabel = useMemo(() => {
    if (tab === 'testdrive') return 'Schedule Test Drive';
    if (tab === 'offer') return 'Submit Offer';
    if (contactPref === 'call') return 'Request a Callback';
    if (contactPref === 'text') return 'Request a Text';
    return 'Send Message';
  }, [tab, contactPref]);

  // ── Contextual hint below preferred contact ────────────────────────────────
  const contactHint: Record<ContactPref, string> = {
    call: "We'll call you back as soon as possible",
    text: "We'll send you a text message",
    email: "We'll reply to your email address",
  };

  const handleMessageSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const result = await submitLead(slug, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: message.trim(),
        preferredContact: contactPref,
        vehicleId,
        type: 'GENERAL',
      });
      if (result) {
        setStatus('success');
      } else {
        throw new Error('No response from server');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try calling us directly.');
    }
  }, [slug, firstName, lastName, email, phone, message, contactPref, vehicleId]);

  const handleTestDriveSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const nameParts = tdName.trim().split(' ');
      const result = await submitAppointment(slug, {
        firstName: nameParts[0] ?? tdName,
        lastName: nameParts.slice(1).join(' ') || '',
        phone: tdPhone.trim(),
        preferredDate: tdDate,
        preferredTime: tdTime,
        vehicleId,
        type: 'TEST_DRIVE',
        notes: vehicleName ? `Test drive for ${vehicleName}` : undefined,
      });
      if (result) {
        setStatus('success');
      } else {
        throw new Error('No response');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Booking failed. Please call us to schedule.');
    }
  }, [slug, tdName, tdPhone, tdDate, tdTime, vehicleId, vehicleName]);

  const handleOfferSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const nameParts = offerName.trim().split(' ');
      const result = await submitLead(slug, {
        firstName: nameParts[0] ?? offerName,
        lastName: nameParts.slice(1).join(' ') || '',
        email: offerEmail.trim(),
        notes: `OFFER: $${offerPrice}. ${offerNote}`.trim(),
        vehicleId,
        type: 'OFFER',
      });
      if (result) {
        setStatus('success');
      } else {
        throw new Error('No response');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Failed to submit offer. Please try again.');
    }
  }, [slug, offerName, offerEmail, offerPrice, offerNote, vehicleId]);

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {tab === 'testdrive' ? 'Test Drive Requested!' : tab === 'offer' ? 'Offer Submitted!' : 'Request Sent!'}
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          {tab === 'testdrive'
            ? "We'll confirm your appointment within 2 hours."
            : tab === 'offer'
            ? "We'll review your offer and get back to you soon."
            : contactPref === 'call'
            ? "We'll call you back as soon as possible."
            : contactPref === 'text'
            ? "We'll send you a text message shortly."
            : "We'll be in touch within a few hours."}
        </p>
        <button
          type="button"
          onClick={() => { setStatus('idle'); setErrorMsg(''); }}
          className="text-sm font-semibold hover:underline"
          style={{ color: 'var(--primary)' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // ── Tab list — PRISM hides "Make Offer" (inquiry-only template) ─────────────
  const availableTabs: Array<{ id: Tab; label: string; Icon: () => JSX.Element }> = [
    { id: 'message',   label: isFinanceFirst ? 'Get Approved' : 'Message',    Icon: isFinanceFirst ? IconPhone : IconMessage },
    { id: 'testdrive', label: 'Test Drive',  Icon: IconCalendar },
    ...(!isLuxury ? [{ id: 'offer' as Tab, label: 'Make Offer', Icon: IconTag }] : []),
  ];

  const inputClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors";
  const labelClass = "block text-xs font-semibold text-gray-500 mb-1";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Tab navigation */}
      <div className="flex border-b border-gray-100">
        {availableTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => { setTab(t.id); setStatus('idle'); setErrorMsg(''); }}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors border-b-2 ${
              tab === t.id
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            style={tab === t.id ? { borderBottomColor: 'var(--primary)', color: 'var(--primary)' } : {}}
          >
            <t.Icon />
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {/* ── Message / Get Approved Tab ── */}
        {tab === 'message' && (
          <form onSubmit={handleMessageSubmit} className="space-y-3">
            {isFinanceFirst && (
              <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-sm font-medium text-green-800">
                ✓ No hard credit pull required — takes 60 seconds
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor="firstName">First Name *</label>
                <input id="firstName" type="text" required value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} className={inputClass} placeholder="Jane" />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">Last Name *</label>
                <input id="lastName" type="text" required value={lastName}
                  onChange={(e) => setLastName(e.target.value)} className={inputClass} placeholder="Smith" />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="email">Email *</label>
              <input id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="jane@example.com" />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">Phone</label>
              <input id="phone" type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="(555) 000-0000" />
            </div>

            <div>
              <label className={labelClass} htmlFor="message">Message</label>
              <textarea id="message" rows={3} value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-none`} placeholder="I'm interested in this vehicle..." />
            </div>

            {/* Preferred Contact — now with action links when dealer phone is available */}
            <div>
              <label className={labelClass}>How should we contact you?</label>
              <div className="flex gap-2">
                {([
                  { pref: 'call' as ContactPref, label: 'Call Me',  Icon: IconPhone },
                  { pref: 'text' as ContactPref, label: 'Text Me',  Icon: IconChat },
                  { pref: 'email' as ContactPref, label: 'Email Me', Icon: IconMail },
                ]).map(({ pref, label, Icon }) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setContactPref(pref)}
                    className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      contactPref === pref
                        ? 'text-white border-transparent shadow-sm'
                        : 'text-gray-600 border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    style={contactPref === pref ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : {}}
                  >
                    <Icon />
                    {label}
                  </button>
                ))}
              </div>
              {/* Contextual hint */}
              <p className="text-xs text-gray-400 mt-1.5 text-center">{contactHint[contactPref]}</p>
            </div>

            {/* Direct action shortcuts when dealer phone is known */}
            {dealerPhone && (contactPref === 'call' || contactPref === 'text') && (
              <div className="flex gap-2 pt-1">
                {contactPref === 'call' && (
                  <a
                    href={`tel:${dealerPhone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    <IconPhone />
                    Call Now: {dealerPhone}
                  </a>
                )}
                {contactPref === 'text' && (
                  <a
                    href={`sms:${dealerPhone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <IconChat />
                    Text Now: {dealerPhone}
                  </a>
                )}
              </div>
            )}

            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{errorMsg}</p>
            )}

            <button type="submit" disabled={status === 'submitting'}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--primary)' }}>
              {status === 'submitting' ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>Sending...</>
              ) : submitLabel}
            </button>

            <p className="text-xs text-gray-400 text-center">
              By submitting, you agree to be contacted by {vehicleName ? 'the dealer' : 'us'} about this inquiry.
            </p>
          </form>
        )}

        {/* ── Test Drive Tab ── */}
        {tab === 'testdrive' && (
          <form onSubmit={handleTestDriveSubmit} className="space-y-3">
            {vehicleName && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-sm font-medium text-blue-800">
                {vehicleName}
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor="tdName">Full Name *</label>
              <input id="tdName" type="text" required value={tdName}
                onChange={(e) => setTdName(e.target.value)} className={inputClass} placeholder="Jane Smith" />
            </div>

            <div>
              <label className={labelClass} htmlFor="tdPhone">Phone *</label>
              <input id="tdPhone" type="tel" required value={tdPhone}
                onChange={(e) => setTdPhone(e.target.value)} className={inputClass} placeholder="(555) 000-0000" />
            </div>

            <div>
              <label className={labelClass} htmlFor="tdDate">Preferred Date *</label>
              <input id="tdDate" type="date" required value={tdDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTdDate(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Preferred Time</label>
              <div className="grid grid-cols-3 gap-1.5 max-h-32 overflow-y-auto">
                {TIME_SLOTS.map((slot) => (
                  <button key={slot} type="button" onClick={() => setTdTime(slot)}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      tdTime === slot ? 'text-white border-transparent' : 'text-gray-600 border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                    style={tdTime === slot ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : {}}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{errorMsg}</p>
            )}

            <button type="submit" disabled={status === 'submitting'}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--primary)' }}>
              {status === 'submitting' ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>Booking...</>
              ) : 'Schedule Test Drive'}
            </button>
          </form>
        )}

        {/* ── Make Offer Tab — hidden for PRISM ── */}
        {tab === 'offer' && !isLuxury && (
          <form onSubmit={handleOfferSubmit} className="space-y-3">
            {vehicleName && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-sm font-medium text-amber-800">
                Making offer on: {vehicleName}
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor="offerName">Full Name *</label>
              <input id="offerName" type="text" required value={offerName}
                onChange={(e) => setOfferName(e.target.value)} className={inputClass} placeholder="Jane Smith" />
            </div>

            <div>
              <label className={labelClass} htmlFor="offerEmail">Email *</label>
              <input id="offerEmail" type="email" required value={offerEmail}
                onChange={(e) => setOfferEmail(e.target.value)} className={inputClass} placeholder="jane@example.com" />
            </div>

            <div>
              <label className={labelClass} htmlFor="offerPrice">Your Offer Price *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">$</span>
                <input id="offerPrice" type="number" required value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className={`${inputClass} pl-7`} placeholder="18,500" min="0" />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="offerNote">Additional Notes</label>
              <textarea id="offerNote" rows={2} value={offerNote}
                onChange={(e) => setOfferNote(e.target.value)}
                className={`${inputClass} resize-none`} placeholder="Any conditions or questions..." />
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{errorMsg}</p>
            )}

            <button type="submit" disabled={status === 'submitting'}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--primary)' }}>
              {status === 'submitting' ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>Submitting...</>
              ) : 'Submit Offer'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
