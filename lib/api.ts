import type { Dealer, VehiclesResponse, VehicleDetail, LeadPayload, LeadResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://smart-dealer-saas.vercel.app';

/**
 * Fetches dealer public profile by slug.
 */
export async function getDealer(slug: string): Promise<Dealer | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/${slug}/dealer`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<Dealer>;
  } catch {
    return null;
  }
}

/**
 * Fetches paginated vehicle list for a dealer.
 */
export async function getVehicles(
  slug: string,
  params?: Record<string, string>
): Promise<VehiclesResponse | null> {
  try {
    const query = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    const res = await fetch(`${API_URL}/api/public/${slug}/vehicles${query}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<VehiclesResponse>;
  } catch {
    return null;
  }
}

/**
 * Fetches a single vehicle's detail page data.
 */
export async function getVehicle(
  slug: string,
  vehicleSlug: string
): Promise<VehicleDetail | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/public/${slug}/vehicles/${vehicleSlug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json() as Promise<VehicleDetail>;
  } catch {
    return null;
  }
}

/**
 * Submits a lead (contact/inquiry) for a dealer.
 */
export async function submitLead(
  slug: string,
  data: LeadPayload
): Promise<LeadResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/${slug}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json() as Promise<LeadResponse>;
  } catch {
    return null;
  }
}

/**
 * Submits an appointment request for a dealer.
 */
export async function submitAppointment(
  slug: string,
  data: Record<string, unknown>
): Promise<{ id: string; message: string } | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/${slug}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json() as Promise<{ id: string; message: string }>;
  } catch {
    return null;
  }
}
