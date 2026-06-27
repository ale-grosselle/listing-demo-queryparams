import styles from './index.module.css';

export function ItemListSkeleton() {
  return (
    <ul className={styles.grid} aria-busy="true" aria-label="Loading results" role="list">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className={styles.card}>
          <div className={styles.imagePlaceholder} />
          <div className={styles.body}>
            <div className={styles.lineLong} />
            <div className={styles.lineShort} />
            <div className={styles.lineSpecs} />
          </div>
        </li>
      ))}
    </ul>
  );
}
