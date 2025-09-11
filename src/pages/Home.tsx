import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>期权策略实验室</h1>
        <p className={styles.heroSubtitle}>一个用于学习、比较和构建期权策略的可视化工具</p>
        <Link to="/strategies" className={styles.ctaButton}>
          探索策略库
        </Link>
      </div>

      <main className={styles.main}>
        <div className={styles.card}>
          <Link to="/compare">
            <h2>策略比较 &rarr;</h2>
            <p>并排比较不同策略，找到最适合市场预期的那一个。</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/builder">
            <h2>策略构建器 &rarr;</h2>
            <p>从零开始，或基于现有策略，构建你自己的期权组合。</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/basics">
            <h2>基础知识 &rarr;</h2>
            <p>学习期权交易的核心概念，为深入学习打下坚实基础。</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link to="/disclaimer">免责声明</Link>
      </footer>
    </div>
  );
}