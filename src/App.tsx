import './App.css'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Strategies from './pages/Strategies'
import StrategyDetail from './pages/StrategyDetail'
import Compare from './pages/Compare'
import Disclaimer from './pages/Disclaimer'
import Basics from './pages/Basics'
import Volatility from './pages/Volatility'
import Premium from './pages/Premium'
import Calendar from './pages/Calendar'
import Builder from './pages/Builder'

function App() {
  return (
    <div className="container">
      <nav className="nav">
        <Link to="/" className="brand">
          <span className="brand-text">Options Lab</span>
        </Link>
        <ul className="menu">
          <li>
            <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>首页</NavLink>
          </li>
          <li>
            <NavLink to="/strategies" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>策略库</NavLink>
          </li>
          <li>
            <NavLink to="/builder" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>构建</NavLink>
          </li>
          <li>
            <NavLink to="/compare" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>对比</NavLink>
          </li>
          <li>
            <NavLink to="/disclaimer" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>声明</NavLink>
          </li>
        </ul>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/volatility" element={<Volatility />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/strategies/:id" element={<StrategyDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
