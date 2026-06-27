'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import styles from './index.module.css';

const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Most Recent' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'year_desc', label: 'Newest Year' },
];

interface SortSelectorProps {
  currentOrder?: string;
}

export function SortSelector({ currentOrder = 'date_desc' }: SortSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('order', value);
    params.delete('page');
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>Sort by</span>
      <select
        className={styles.select}
        value={currentOrder}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        aria-label="Sort results by"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
