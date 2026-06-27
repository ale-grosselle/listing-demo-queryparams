'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import styles from './index.module.css';

interface RemoveFilterButtonProps {
  filterKey: string;
}

export function RemoveFilterButton({ filterKey }: RemoveFilterButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleRemove = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(filterKey);
    params.delete('page');
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <button
      className={styles.button}
      onClick={handleRemove}
      aria-label={`Remove ${filterKey} filter`}
      title="Remove filter"
    >
      ×
    </button>
  );
}
