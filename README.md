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

## File Map

```
src/app/listing/
├── page.tsx                    # Server Component — fetches data, composes page
├── api/
│   ├── fetchListings.ts        # React.cache() — filters + paginates
│   └── fetchFiltersConfig.ts   # React.cache() — config per category
└── components/
    ├── FilterControl/          # Client — select → router.push
    ├── RemoveFilterButton/     # Client — removes one filter
    ├── ResetFiltersButton/     # Client — clears all filters
    ├── SearchBar/              # Client — free-text → router.push
    ├── SortSelector/           # Client — sort → router.push
    ├── PaginationBar/          # Client — page → router.push
    └── ListingAnalytics/       # Client — fires window.dataLayer event
```
