'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import styles from './index.module.css';

export function ResetFiltersButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(() => {
      router.push('/listing', { scroll: false });
    });
  };

  return (
    <button
      className={styles.button}
      onClick={handleReset}
      disabled={isPending}
      aria-label="Clear all filters"
    >
      Clear all
    </button>
  );
}
