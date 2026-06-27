'use client';

import { useEffect, useRef } from 'react';
import type { ListingItem, ListingSearchParams } from '../../types';

interface ListingAnalyticsProps {
  filters: ListingSearchParams;
  items: ListingItem[];
  total: number;
  page: number;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function ListingAnalytics({ filters, items, total, page }: ListingAnalyticsProps) {
  const lastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const key = JSON.stringify({ filters, total, page });
    if (key === lastKeyRef.current) return;
    lastKeyRef.current = key;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: 'listing_updated',
      listing: { filters, items, total, page },
    });
  }, [filters, items, total, page]);

  return null;
}
