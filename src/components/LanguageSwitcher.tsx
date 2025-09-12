import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

const CNFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
    <rect width="30" height="20" fill="#de2910"/>
    <path d="M6,4.5 L3.8,6.2 4.7,3.5 2.5,2 5.3,2 6,0 6.7,2 9.5,2 7.3,3.5 8.2,6.2 Z" fill="#ff0"/>
    <path d="M12.5,2.5 L11.6,3.2 12.1,2.2 11,1.8 12,1.8 12.5,1 13,1.8 14,1.8 12.9,2.2 13.4,3.2 Z" fill="#ff0"/>
    <path d="M12.5,7.5 L11.6,6.8 12.1,7.8 11,8.2 12,8.2 12.5,9 13,8.2 14,8.2 12.9,7.8 13.4,6.8 Z" fill="#ff0" transform="rotate(45 12.5 7.5)"/>
    <path d="M10,9.5 L9.1,8.8 9.6,9.8 8.5,10.2 9.5,10.2 10,11 10.5,10.2 11.5,10.2 10.4,9.8 10.9,8.8 Z" fill="#ff0" transform="rotate(70 10 9.5)"/>
    <path d="M15,9.5 L14.1,8.8 14.6,9.8 13.5,10.2 14.5,10.2 15,11 15.5,10.2 16.5,10.2 15.4,9.8 15.9,8.8 Z" fill="#ff0" transform="rotate(25 15 9.5)"/>
  </svg>
);

const USFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
    <defs><path id="s" d="M0,-1 L0.58779,0.80902 L-0.95106,-0.30902 L0.95106,-0.30902 L-0.58779,0.80902 Z" fill="#fff"/></defs>
    <rect width="30" height="20" fill="#b22234"/>
    <rect width="30" height="18" y="1" fill="#fff"/>
    <rect width="30" height="16" y="2" fill="#b22234"/>
    <rect width="30" height="14" y="3" fill="#fff"/>
    <rect width="30" height="12" y="4" fill="#b22234"/>
    <rect width="30" height="10" y="5" fill="#fff"/>
    <rect width="30" height="8" y="6" fill="#b22234"/>
    <rect width="30" height="6" y="7" fill="#fff"/>
    <rect width="30" height="4" y="8" fill="#b22234"/>
    <rect width="30" height="2" y="9" fill="#fff"/>
    <rect width="12" height="10" fill="#3c3b6e"/>
    <g transform="translate(6,5) scale(0.8)">
      <use href="#s" x="0" y="0"/><use href="#s" x="2" y="0"/><use href="#s" x="4" y="0"/><use href="#s" x="6" y="0"/><use href="#s" x="8" y="0"/><use href="#s" x="10" y="0"/>
      <use href="#s" x="1" y="1"/><use href="#s" x="3" y="1"/><use href="#s" x="5" y="1"/><use href="#s" x="7" y="1"/><use href="#s" x="9" y="1"/>
      <use href="#s" x="0" y="2"/><use href="#s" x="2" y="2"/><use href="#s" x="4" y="2"/><use href="#s" x="6" y="2"/><use href="#s" x="8" y="2"/><use href="#s" x="10" y="2"/>
      <use href="#s" x="1" y="3"/><use href="#s" x="3" y="3"/><use href="#s" x="5" y="3"/><use href="#s" x="7" y="3"/><use href="#s" x="9" y="3"/>
      <use href="#s" x="0" y="4"/><use href="#s" x="2" y="4"/><use href="#s" x="4" y="4"/><use href="#s" x="6" y="4"/><use href="#s" x="8" y="4"/><use href="#s" x="10" y="4"/>
    </g>
  </svg>
);


export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? styles.active : ''}
        aria-label="Switch to English"
      >
        <USFlag />
      </button>
      <button
        onClick={() => changeLanguage('zh')}
        className={i18n.language === 'zh' ? styles.active : ''}
        aria-label="Switch to Chinese"
      >
        <CNFlag />
      </button>
    </div>
  );
}