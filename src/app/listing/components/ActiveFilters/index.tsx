import type { FilterGroup, ListingSearchParams } from '../../types';
import { RemoveFilterButton } from '../RemoveFilterButton';
import styles from './index.module.css';

interface ActiveFiltersProps {
  params: ListingSearchParams;
  config: FilterGroup[];
}

export function ActiveFilters({ params, config }: ActiveFiltersProps) {
  const active = config.flatMap((group) => {
    const value = params[group.key as keyof ListingSearchParams];
    if (!value) return [];

    const label =
      group.options?.find((o) => o.value === value)?.label ?? value;

    return [{ key: group.key, label: `${group.label}: ${label}` }];
  });

  if (active.length === 0) return null;

  return (
    <div className={styles.wrapper} aria-label="Active filters">
      {active.map(({ key, label }) => (
        <div key={key} className={styles.chip}>
          <span>{label}</span>
          <RemoveFilterButton filterKey={key} />
        </div>
      ))}
    </div>
  );
}
