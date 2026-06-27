'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import styles from './index.module.css';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationBar({ currentPage, totalPages }: PaginationBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: true });
    });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.nav} aria-label="Search results pages">
      <button
        className={styles.arrow}
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        aria-label="Previous page"
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
          onClick={() => goTo(page)}
          disabled={isPending}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrow}
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}
