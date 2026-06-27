import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchListings } from './listing/api/fetchListings';
import { fetchFiltersConfig } from './listing/api/fetchFiltersConfig';
import { FilterSidebar } from './listing/components/FilterSidebar';
import { ItemList } from './listing/components/ItemList';
import { ItemListSkeleton } from './listing/components/ItemListSkeleton';
import { ActiveFilters } from './listing/components/ActiveFilters';
import { SortSelector } from './listing/components/SortSelector';
import { PaginationBar } from './listing/components/PaginationBar';
import { SearchBar } from './listing/components/SearchBar';
import { ListingAnalytics } from './listing/components/ListingAnalytics';
import type { ListingSearchParams } from './listing/types';
import styles from './page.module.css';

interface ListingPageProps {
  searchParams: Promise<ListingSearchParams>;
}

export async function generateMetadata({
  searchParams,
}: ListingPageProps): Promise<Metadata> {
  const params = await searchParams;
  const result = await fetchListings(params);

  const parts: string[] = ['Used Cars for Sale'];
  if (params.brand) {
    parts[0] = `${params.brand.charAt(0).toUpperCase() + params.brand.slice(1)} Cars for Sale`;
  }
  if (params.region) {
    parts.push(`in ${params.region.charAt(0).toUpperCase() + params.region.slice(1)}`);
  }

  const title = `${parts.join(' ')} — ${result.total} listings`;
  const description = `Browse ${result.total} used cars${params.brand ? ` from ${params.brand}` : ''}${params.region ? ` in ${params.region}` : ''}. Find your next car on Shop.`;

  return {
    title,
    description,
    robots: result.total === 0 ? 'noindex,nofollow' : 'index,follow',
  };
}

export default async function ListingPage({ searchParams }: ListingPageProps) {
  const params = await searchParams;

  const [result, filtersConfig] = await Promise.all([
    fetchListings(params),
    fetchFiltersConfig(params.category),
  ]);

  return (
    <div className={styles.page}>
      <ListingAnalytics
        filters={params}
        items={result.items}
        total={result.total}
        page={result.page}
      />
      <div className={styles.searchRow}>
        <SearchBar initialValue={params.q} />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <FilterSidebar config={filtersConfig} activeParams={params} />
        </aside>

        <main className={styles.main}>
          <div className={styles.topBar}>
            <span className={styles.resultCount}>
              <strong>{result.total}</strong> {result.total === 1 ? 'listing' : 'listings'} found
            </span>
            <Suspense fallback={null}>
              <SortSelector currentOrder={params.order} />
            </Suspense>
          </div>

          <ActiveFilters params={params} config={filtersConfig} />

          <Suspense fallback={<ItemListSkeleton />}>
            <ItemList result={result} />
          </Suspense>

          <Suspense fallback={null}>
            <PaginationBar
              currentPage={result.page}
              totalPages={result.totalPages}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
