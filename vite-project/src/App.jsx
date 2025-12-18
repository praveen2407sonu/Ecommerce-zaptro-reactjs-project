 import React from 'react'
import  { useState, useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import  Contact  from './pages/Contact'
import Products from './pages/Products'
import About from './pages/About'
import Cart from './pages/Cart'
import axios from 'axios'

const App = () => {
  const [location, setLocation] = useState()

    
    const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      // console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        // setOpenDropdown(false)
        //  console.log(exactLocation);

      } catch (error) {
        console.log(error);

      }

    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    
     <BrowserRouter>
     <Navbar location={location}/>
       <Routes>
           
           <Route path='/' element={<Home/>}></Route>
           <Route path='/Products' element={<Products/>}></Route>
            <Route path='/about' element={<About/>}></Route>
             <Route path='/contact' element={<Contact/>}></Route>
             <Route path='/cart' element={<Cart/>}></Route>
             
       </Routes>

    </BrowserRouter>

  )
}

export default App