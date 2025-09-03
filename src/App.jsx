import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Monday from './pages/Monday.jsx'
import Tuesday from './pages/Tuesday.jsx'
import Wednesday from './pages/Wednesday.jsx'
import Thursday from './pages/Thursday.jsx'
import Friday from './pages/Friday.jsx'
import Saturday from './pages/Saturday.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day/monday" element={<Monday />} />
      <Route path="/day/tuesday" element={<Tuesday />} />
      <Route path="/day/wednesday" element={<Wednesday />} />
      <Route path="/day/thursday" element={<Thursday />} />
      <Route path="/day/friday" element={<Friday />} />
      <Route path="/day/saturday" element={<Saturday />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
