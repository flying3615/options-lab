import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navLink = (path: string, label: string) => {
    const className = `nav-link${router.pathname === path ? ' active' : ''}`;
    return (
      <li onClick={() => setMenuOpen(false)}>
        <Link href={path} className={className}>{label}</Link>
      </li>
    );
  };

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-text">{t('app_title')}</span>
        </Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          {navLink('/', t('nav_home'))}
          {navLink('/basics', t('nav_basics'))}
          {navLink('/strategies', t('nav_strategies'))}
          {navLink('/wizard', t('nav_wizard'))}
          {navLink('/builder', t('nav_builder'))}
          {navLink('/compare', t('nav_compare'))}
          {navLink('/disclaimer', t('nav_disclaimer'))}
        </ul>
        <LanguageSwitcher />
      </nav>
      <main className="main">{children}</main>
    </div>
  );
}
