import type { ListingResult } from '../../types';
import { ItemCard } from '../ItemCard';
import styles from './index.module.css';

interface ItemListProps {
  result: ListingResult;
}

export function ItemList({ result }: ItemListProps) {
  if (result.items.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <p>No listings match your filters.</p>
        <p>Try removing some filters to see more results.</p>
      </div>
    );
  }

  return (
    <section aria-label="Search results" aria-live="polite">
      <ul className={styles.grid} role="list">
        {result.items.map((item, index) => (
          <li key={item.id}>
            <ItemCard item={item} priority={index < 4} />
          </li>
        ))}
      </ul>
    </section>
  );
}
