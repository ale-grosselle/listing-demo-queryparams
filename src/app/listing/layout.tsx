import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function ListingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Home
          </Link>
          <Link href="/listing?category=cars" className={styles.navLink}>
            Cars
          </Link>
          <Link href="/listing?category=real-estate" className={styles.navLink}>
            Real Estate
          </Link>
          <Link href="/listing?category=general" className={styles.navLink}>
            General
          </Link>
        </nav>
      </header>
      <div className={styles.content}>{children}</div>
    </>
  );
}
