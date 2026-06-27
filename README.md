# Listing Architecture Exercise

A Next.js example showing that **a listing page does not need Redux** — the URL is the only source of truth.

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000/listing
```

---

## Why No Redux

Redux adds two sources of truth (store + URL) that must be kept in sync, extra client-side JavaScript, and SSR complexity.

In Next.js App Router, the URL is the only source of truth. No store to hydrate, no actions to dispatch, no sync to maintain.

---

## How It Works

Every filter value lives in the URL:

```
/listing?category=cars&brand=fiat&fuel=petrol&price_min=5000
```

The page reads them via `searchParams` in a Server Component. When a user changes a filter, a Client Component mutates the relevant key and pushes the new URL:

```ts
const params = new URLSearchParams(searchParams.toString());
params.set(group.key, value);
params.delete('page');
router.push(`?${params.toString()}`, { scroll: false });
```

`useTransition` keeps the old UI visible while the server renders new results — no `isLoading` state needed.

Back/forward navigation works for free — the browser owns the URL history.

---

## Key Files

- **Filters** — [`FilterControl/index.tsx`](src/app/listing/components/FilterControl/index.tsx), [`RemoveFilterButton/index.tsx`](src/app/listing/components/RemoveFilterButton/index.tsx), [`ResetFiltersButton/index.tsx`](src/app/listing/components/ResetFiltersButton/index.tsx)
- **Pagination** — [`PaginationBar/index.tsx`](src/app/listing/components/PaginationBar/index.tsx)
- **Google Tag Manager** — [`ListingAnalytics/index.tsx`](src/app/listing/components/ListingAnalytics/index.tsx)
