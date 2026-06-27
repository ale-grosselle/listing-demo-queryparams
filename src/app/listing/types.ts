export interface ListingItem {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  brand: string;
  model: string;
  condition: 'new' | 'used';
  region: string;
  city: string;
  imageUrl: string;
  postedAt: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  type: 'select' | 'range-min' | 'range-max';
  options?: FilterOption[];
}

export type ListingCategory = 'cars' | 'real-estate' | 'general';

export interface ListingSearchParams {
  category?: ListingCategory;
  q?: string;
  brand?: string;
  model?: string;
  price_min?: string;
  price_max?: string;
  year_min?: string;
  year_max?: string;
  fuel?: string;
  transmission?: string;
  condition?: string;
  region?: string;
  order?: string;
  page?: string;
}

export interface ListingResult {
  items: ListingItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
