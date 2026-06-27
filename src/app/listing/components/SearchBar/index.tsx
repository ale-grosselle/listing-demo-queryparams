'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import styles from './index.module.css';

interface SearchBarProps {
  initialValue?: string;
}

export function SearchBar({ initialValue = '' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('q', value.trim());
    } else {
      params.delete('q');
    }
    params.delete('page');
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      role="search"
      aria-label="Search listings"
    >
      <input
        type="search"
        name="q"
        className={styles.input}
        placeholder="Search by brand, model or keyword..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search query"
      />
      <button
        type="submit"
        className={styles.button}
        disabled={isPending}
        aria-label="Search"
      >
        {isPending ? '...' : 'Search'}
      </button>
    </form>
  );
}
