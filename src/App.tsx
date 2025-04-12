import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import OrderSummaryPage from './pages/OrderSummary'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order-summary" element={<OrderSummaryPage />} />
    </Routes>
  )
}

export default App
