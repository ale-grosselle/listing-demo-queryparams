import { cache } from 'react';
import { MOCK_LISTINGS } from '../data/mockListings';
import type { ListingResult, ListingSearchParams } from '../types';

const PAGE_SIZE = 6;

export const fetchListings = cache(
  async (params: ListingSearchParams): Promise<ListingResult> => {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 80));

    let results = [...MOCK_LISTINGS];

    if (params.q) {
      const q = params.q.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.model.toLowerCase().includes(q)
      );
    }

    if (params.brand) {
      results = results.filter((item) => item.brand === params.brand);
    }

    if (params.fuel) {
      results = results.filter((item) => item.fuel === params.fuel);
    }

    if (params.transmission) {
      results = results.filter(
        (item) => item.transmission === params.transmission
      );
    }

    if (params.condition) {
      results = results.filter((item) => item.condition === params.condition);
    }

    if (params.region) {
      results = results.filter((item) => item.region === params.region);
    }

    if (params.price_min) {
      const min = Number(params.price_min);
      results = results.filter((item) => item.price >= min);
    }

    if (params.price_max) {
      const max = Number(params.price_max);
      results = results.filter((item) => item.price <= max);
    }

    if (params.year_min) {
      const min = Number(params.year_min);
      results = results.filter((item) => item.year >= min);
    }

    if (params.year_max) {
      const max = Number(params.year_max);
      results = results.filter((item) => item.year <= max);
    }

    const order = params.order ?? 'date_desc';
    results.sort((a, b) => {
      switch (order) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'year_desc':
          return b.year - a.year;
        case 'date_desc':
        default:
          return (
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          );
      }
    });

    const total = results.length;
    const page = Math.max(1, Number(params.page ?? 1));
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const items = results.slice(start, start + PAGE_SIZE);

    return { items, total, page: safePage, pageSize: PAGE_SIZE, totalPages };
  }
);
