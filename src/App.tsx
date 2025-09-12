import './App.css'
import { useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Strategies from './pages/Strategies'
import StrategyDetail from './pages/StrategyDetail'
import Compare from './pages/Compare'
import Disclaimer from './pages/Disclaimer'
import Basics from './pages/Basics'
import Calendar from './pages/Calendar'
import Builder from './pages/Builder'
import Box from './pages/Box'
import Wizard from './pages/Wizard'
import LanguageSwitcher from './components/LanguageSwitcher'

function App() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="container">
      <nav className="nav">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-text">{t('app_title')}</span>
        </Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{t('nav_home')}</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/basics" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{t('nav_basics')}</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/strategies" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{t('nav_strategies')}</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/wizard" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{t('nav_wizard')}</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/builder" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{t('nav_builder')}</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/compare" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{t('nav_compare')}</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/disclaimer" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{t('nav_disclaimer')}</NavLink>
          </li>
        </ul>
        <LanguageSwitcher />
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/strategies/:id" element={<StrategyDetail />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/box" element={<Box />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App