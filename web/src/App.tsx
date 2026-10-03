import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { trackVisit } from './lib/api'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!pathname.startsWith('/admin')) trackVisit(pathname)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
