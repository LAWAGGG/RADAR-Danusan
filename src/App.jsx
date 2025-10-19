import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Food from './pages/Food'
import FoodDetail from './pages/FoodDetail'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Routes>
          <Route path="/" element={<Food />} />
          <Route path="/product/:id" element={<FoodDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
