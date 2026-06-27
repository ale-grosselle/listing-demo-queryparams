import { cache } from 'react';
import { FILTER_CONFIG_BY_CATEGORY } from '../data/filterConfig';
import type { FilterGroup, ListingCategory } from '../types';

export const fetchFiltersConfig = cache(
  async (category: ListingCategory = 'cars'): Promise<FilterGroup[]> => {
    await new Promise((r) => setTimeout(r, 20));
    return FILTER_CONFIG_BY_CATEGORY[category] ?? FILTER_CONFIG_BY_CATEGORY['cars'];
  }
);
