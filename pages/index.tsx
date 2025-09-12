import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('home.title')}</h1>
          <p className={styles.heroSubtitle}>{t('home.subtitle')}</p>
          <Link href="/strategies" className={styles.ctaButton}>
            {t('home.cta')}
          </Link>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.card}>
          <Link href="/compare">
            <h2>{t('home.compare_title')}</h2>
            <p>{t('home.compare_desc')}</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link href="/builder">
            <h2>{t('home.builder_title')}</h2>
            <p>{t('home.builder_desc')}</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link href="/basics">
            <h2>{t('home.basics_title')}</h2>
            <p>{t('home.basics_desc')}</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="/disclaimer">{t('nav_disclaimer')}</Link>
      </footer>
    </div>
  );
}