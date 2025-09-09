import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Strategies from './pages/Strategies'
import StrategyDetail from './pages/StrategyDetail'
import Compare from './pages/Compare'
import Disclaimer from './pages/Disclaimer'
import Basics from './pages/Basics'
import Volatility from './pages/Volatility'
import Premium from './pages/Premium'
import Calendar from './pages/Calendar'

function App() {
  return (
    <div className="container">
      <nav className="nav">
        <div className="brand">Options Lab</div>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/strategies">策略库</Link></li>
          <li><Link to="/compare">对比</Link></li>
          <li><Link to="/disclaimer">声明</Link></li>
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
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
