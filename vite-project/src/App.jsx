import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Products from './pages/Products'
import About from './pages/About'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import CategoryProduct from './pages/CategoryProduct'
import SingleProduct from './pages/SingleProduct'

// Context Providers
import { CartProvider } from './context/CartContext'
import { DataProvider } from './context/DataContext'

const App = () => {
  const [location, setLocation] = useState()

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
      } catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <DataProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar location={location} />
          <main className="min-h-screen">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<SingleProduct />} />
              <Route path='/category/:category' element={<CategoryProduct />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </DataProvider>
  )
}

export default App