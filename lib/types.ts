export type BusinessHour = {
  dayOfWeek: number; // 0=Sun, 1=Mon, ... 6=Sat
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
};

export type TrustPillar = {
  icon: 'shield' | 'dollar' | 'payment' | 'star' | 'wrench' | 'handshake' | 'clock' | 'check';
  title: string;
  description: string;
};

export type HomepageSections = {
  latestArrivals: boolean;
  featuredInventory: boolean;
  trustPillars: boolean;
  shopByBudget: boolean;
  browseByType: boolean;
  dealerInfo: boolean;
  finalCta: boolean;
};

export type SocialLinks = {
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  google?: string | null;
  youtube?: string | null;
};

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
  lotLat?: number | null;
  lotLng?: number | null;
  showPricing: boolean;
  vehicleCount: number;
  businessHours?: BusinessHour[];
  websiteConfig?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string | null;
    logoUrl?: string | null;
    templateId: string;
    heroHeadline?: string | null;
    heroSubheadline?: string | null;
    footerText?: string | null;
    showFinancing?: boolean;
    showTestDrive?: boolean;
    showTradeIn?: boolean;
    showInsurance?: boolean;
    chatWidgetEnabled?: boolean;
    homepageSections?: HomepageSections | null;
    featuredVehicleIds?: string[] | null;
    trustPillars?: TrustPillar[] | null;
    socialLinks?: SocialLinks | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  } | null;
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
  spinFrames?: Array<{ url: string; frameIndex: number }> | null;
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

export type FeaturedVehiclesResponse = {
  vehicles: VehicleListItem[];
  pinned: boolean;
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
