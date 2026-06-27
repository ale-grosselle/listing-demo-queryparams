import type { FilterGroup, ListingSearchParams } from '../../types';
import { FilterControl } from '../FilterControl';
import { ResetFiltersButton } from '../ResetFiltersButton';
import styles from './index.module.css';

interface FilterSidebarProps {
  config: FilterGroup[];
  activeParams: ListingSearchParams;
}

export function FilterSidebar({ config, activeParams }: FilterSidebarProps) {
  const hasActiveFilters = config.some(
    (group) => activeParams[group.key as keyof ListingSearchParams]
  );

  return (
    <aside className={styles.sidebar} aria-label="Search filters">
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        {hasActiveFilters && <ResetFiltersButton />}
      </div>
      <div className={styles.groups}>
        {config.map((group) => (
          <div key={group.key} className={styles.group}>
            <label className={styles.groupLabel} htmlFor={`filter-${group.key}`}>
              {group.label}
            </label>
            <FilterControl
              group={group}
              currentValue={
                activeParams[group.key as keyof ListingSearchParams] ?? ''
              }
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
