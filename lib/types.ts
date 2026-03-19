export type Dealer = {
  slug: string;
  name: string;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  showPricing: boolean;
  vehicleCount: number;
};

export type VehicleInspection = {
  overallScore?: number | null;
  disposition?: string | null;
  scoreColor: 'green' | 'yellow' | 'red' | 'gray';
  dispositionLabel?: string | null;
  greenCount?: number | null;
  yellowCount?: number | null;
  redCount?: number | null;
  naCount?: number | null;
  scoreBreakdown?: Record<string, number> | null;
  completedAt?: string | null;
  inspectorName?: string | null;
  obd?: {
    codes?: Array<{ code: string; description: string; severity: string }>;
    readingDate?: string;
  } | null;
  recalls?: {
    count: number;
    campaigns?: Array<{
      campaignNumber: string;
      component: string;
      summary: string;
      remedy: string;
      reportDate: string;
    }>;
    fetchedAt?: string;
    source?: string;
  } | null;
};

export type VehicleListItem = {
  id: string;
  slug: string;
  name: string;
  year: string;
  make: string;
  model: string;
  vin?: string | null;
  mainImageUrl?: string | null;
  price?: number | null;
  odometer?: number | null;
  publishedAt?: string | null;
  inspection?: VehicleInspection | null;
};

export type VehicleDetail = VehicleListItem & {
  description?: string | null;
  photos: Array<{ url: string; label?: string | null }>;
  dealer: {
    name: string;
    phone?: string | null;
    email?: string | null;
    logoUrl?: string | null;
  };
  inspection?: (VehicleInspection & { id?: string }) | null;
};

export type VehiclesResponse = {
  vehicles: VehicleListItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
  };
  filters: Record<string, unknown>;
};

export type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
  vehicleId?: string;
  type?: string;
};

export type LeadResponse = {
  id: string;
  message: string;
};
