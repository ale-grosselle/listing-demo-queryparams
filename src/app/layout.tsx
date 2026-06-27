import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Transactions App",
  description: "A simple transactions app",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
              Home
            </Link>
            <Link href="/?category=cars" className={styles.navLink}>
              Cars
            </Link>
            <Link href="/?category=real-estate" className={styles.navLink}>
              Real Estate
            </Link>
            <Link href="/?category=general" className={styles.navLink}>
              General
            </Link>
          </nav>
        </header>
        <div className={styles.content}>{children}</div>
      </body>
    </html>
  );
}
