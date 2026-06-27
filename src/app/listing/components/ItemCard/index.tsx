import Image from 'next/image';
import type { ListingItem } from '../../types';
import styles from './index.module.css';

interface ItemCardProps {
  item: ListingItem;
  priority?: boolean;
}

const FUEL_LABELS: Record<string, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  electric: 'Electric',
};

const TRANSMISSION_LABELS: Record<string, string> = {
  manual: 'Manual',
  automatic: 'Automatic',
};

export function ItemCard({ item, priority = false }: ItemCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={400}
          height={280}
          className={styles.image}
          priority={priority}
        />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.price}>€{item.price.toLocaleString('it-IT')}</p>
        <ul className={styles.specs} aria-label="Specifications">
          <li>{item.year}</li>
          <li>{item.mileage.toLocaleString('it-IT')} km</li>
          <li>{FUEL_LABELS[item.fuel] ?? item.fuel}</li>
          <li>{TRANSMISSION_LABELS[item.transmission] ?? item.transmission}</li>
        </ul>
        <p className={styles.location}>
          {item.city},{' '}
          {item.region.charAt(0).toUpperCase() + item.region.slice(1)}
        </p>
      </div>
    </article>
  );
}
