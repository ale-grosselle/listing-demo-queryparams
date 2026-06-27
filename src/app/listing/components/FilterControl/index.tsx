'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import type { FilterGroup } from '../../types';
import styles from './index.module.css';

interface FilterControlProps {
  group: FilterGroup;
  currentValue: string;
}

export function FilterControl({ group, currentValue }: FilterControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(group.key, value);
    } else {
      params.delete(group.key);
    }
    params.delete('page');
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <select
      id={`filter-${group.key}`}
      className={styles.select}
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      disabled={isPending}
      aria-label={group.label}
    >
      <option value="">All</option>
      {group.options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
