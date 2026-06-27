# Listing Architecture Exercise

A production-quality Next.js example demonstrating that **a marketplace listing page does not need a state management library**.

Built as a reference implementation for migrating a listing page from Pages Router + Redux to App Router with URL search params as the sole source of truth.

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000/listing
```

---

## Why No State Management

Traditional marketplace implementations use Redux for the listing page. The store holds active filter values, filter configuration from the API, human-readable labels, and UI state like dialog open/closed. Components dispatch actions; a router-sync component watches the store and syncs it to the URL.

This creates two sources of truth that must be kept in sync, adds client-side JavaScript for state that the browser already manages natively, and makes server-side rendering harder because the server must pre-populate the store.

In Next.js App Router, the URL is the only source of truth. There is no store to hydrate, no actions to dispatch, no sync to maintain.

---

## How Filter State Works

Every filter value lives in the URL as a query parameter:

```
/listing?category=cars&brand=fiat&fuel=petrol&price_min=5000&region=lazio
```

The page receives these via `searchParams` — a plain object passed to every Server Component:

```ts
// src/app/listing/page.tsx
export default async function ListingPage({ searchParams }: ListingPageProps) {
  const params = await searchParams;
  // params.brand === 'fiat', params.fuel === 'petrol', etc.
}
```

→ [`src/app/listing/page.tsx`](src/app/listing/page.tsx)

When a user changes a filter, a Client Component reads the current params, mutates the relevant key, and pushes the new URL. No action, no reducer, no store:

```ts
// src/app/listing/components/FilterControl/index.tsx
const params = new URLSearchParams(searchParams.toString());
params.set(group.key, value);   // e.g. params.set('brand', 'fiat')
params.delete('page');          // reset to page 1 on filter change
router.push(`?${params.toString()}`, { scroll: false });
```

→ [`src/app/listing/components/FilterControl/index.tsx`](src/app/listing/components/FilterControl/index.tsx)

The same pattern applies to pagination:

```ts
// src/app/listing/components/PaginationBar/index.tsx
params.set('page', String(page));
router.push(`?${params.toString()}`, { scroll: true });
```

→ [`src/app/listing/components/PaginationBar/index.tsx`](src/app/listing/components/PaginationBar/index.tsx)

**Back/forward navigation works for free** — the browser owns the URL history. No store rehydration needed.

---

## How Filter Configuration Works (the "filtersStore" replacement)

In a traditional Pages Router implementation, the filter configuration (which filters to show, what options they have) is fetched client-side and stored in Redux.

Here, it is fetched **server-side** on every request and passed as props:

```ts
// src/app/listing/page.tsx
const [result, filtersConfig] = await Promise.all([
  fetchListings(params),
  fetchFiltersConfig(params.category), // returns the right filters for the category
]);
```

`filtersConfig` flows down as a plain prop to `<FilterSidebar>` and `<ActiveFilters>`. No client-side fetch, no store, no loading state to manage.

→ [`src/app/listing/api/fetchFiltersConfig.ts`](src/app/listing/api/fetchFiltersConfig.ts)  
→ [`src/app/listing/data/filterConfig.ts`](src/app/listing/data/filterConfig.ts)

`React.cache()` wraps both fetch functions so that if they are called multiple times within the same request (e.g. once in `generateMetadata` and once in the page), the underlying work runs only once.

---

## `useTransition` Instead of Loading State

Client Components use `useTransition` to mark URL updates as non-urgent. While the server is rendering the new results, the old UI stays visible and interactive. `isPending` is used to disable controls and signal that an update is in progress — no `isLoading` state in a store required:

```ts
const [isPending, startTransition] = useTransition();

startTransition(() => {
  router.push(`?${params.toString()}`, { scroll: false });
});
```

→ [`src/app/listing/components/FilterControl/index.tsx`](src/app/listing/components/FilterControl/index.tsx)

---

## GTM / Analytics — `window.dataLayer`

GTM events need to fire whenever the listing updates (filter change, pagination, initial load). The challenge: items come from the server, but `window.dataLayer` is client-only.

The solution is a single `<ListingAnalytics />` Client Component that receives the full state as props from the Server Component and fires a `listing_updated` event via `useEffect`:

```ts
// src/app/listing/page.tsx
<ListingAnalytics
  filters={params}       // full active filter params
  items={result.items}   // full rendered item objects
  total={result.total}
  page={result.page}
/>
```

```ts
// src/app/listing/components/ListingAnalytics/index.tsx
useEffect(() => {
  const key = JSON.stringify({ filters, total, page });
  if (key === lastKeyRef.current) return; // stable key — no duplicate events
  lastKeyRef.current = key;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: 'listing_updated',
    listing: { filters, items, total, page },
  });
}, [filters, items, total, page]);
```

→ [`src/app/listing/components/ListingAnalytics/index.tsx`](src/app/listing/components/ListingAnalytics/index.tsx)

**Why a stable key instead of raw dep comparison**: React compares effect dependencies by reference. A new `filters` object with the same values would still trigger the effect because `page.tsx` creates a new object on every render. The `JSON.stringify` key check prevents duplicate events when the user clicks an already-active filter or navigates to the same page.

**Why `items` is excluded from the key**: `filters + total + page` fully determines which items are shown. Including the items array in the key would be expensive to stringify and redundant.

The component renders `null` — it has no UI output.

---

## File Map

```
src/app/listing/
├── page.tsx                          # Server Component — fetches data, composes page
├── layout.tsx                        # Category nav header
├── types.ts                          # ListingItem, FilterGroup, ListingSearchParams, etc.
├── api/
│   ├── fetchListings.ts              # React.cache() wrapped — filters + paginates data
│   └── fetchFiltersConfig.ts         # React.cache() wrapped — returns config per category
├── data/
│   ├── mockListings.ts               # 20 realistic Italian car listings
│   └── filterConfig.ts               # FILTER_CONFIG_BY_CATEGORY — cars / real-estate / general
└── components/
    ├── FilterSidebar/                # Server Component — renders sidebar from config props
    ├── FilterControl/                # Client Component — select → router.push
    ├── ActiveFilters/                # Server Component — active filter chips
    ├── RemoveFilterButton/           # Client Component — removes one filter from URL
    ├── ResetFiltersButton/           # Client Component — clears all filters
    ├── SearchBar/                    # Client Component — free-text search → router.push
    ├── SortSelector/                 # Client Component — order → router.push
    ├── ItemList/                     # Server Component — renders result.items
    ├── ItemCard/                     # Server Component — single listing card
    ├── ItemListSkeleton/             # Server Component — Suspense fallback shimmer
    ├── PaginationBar/                # Client Component — page → router.push
    └── ListingAnalytics/             # Client Component — fires window.dataLayer event
```
