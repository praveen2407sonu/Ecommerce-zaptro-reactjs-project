import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from "react-icons/io5"
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import { HiMenuAlt3, HiX } from "react-icons/hi"
import { useCart } from '../context/CartContext'

const Navbar = ({ location }) => {

  const [openNav, setOpenNav] = useState(false)
  const { cartItem } = useCart()

  // ✅ TOTAL CART QUANTITY
  const totalCartItems = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // prevent background scroll when menu open (mobile)
  useEffect(() => {
    document.body.style.overflow = openNav ? "hidden" : "auto";
  }, [openNav])

  return (
    <div className='bg-white py-3 shadow-2xl relative z-50'>
      <div className='max-w-6xl mx-auto flex justify-between items-center px-4'>

        {/* LOGO + LOCATION */}
        <div className='flex gap-7 items-center'>
          <Link to="/">
            <h1 className='font-bold text-3xl'>
              <span className='text-red-500 font-serif'>A</span>zptro
            </h1>
          </Link>

          {/* LOCATION */}
          <div className='hidden md:flex gap-1 cursor-pointer items-center text-gray-700'>
            <MapPin className="text-red-500" />
            <span className='font-semibold'>
              {location ? (
                <div className='-space-y-2'>
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : "Add Address"}
            </span>
            <FaCaretDown />
          </div>
        </div>

        {/* HAMBURGER */}
        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <HiX /> : <HiMenuAlt3 />}
        </div>

        {/* MENU */}
        <nav
          className={`
            md:flex md:items-center
            fixed md:static left-0 w-full md:w-auto
            bg-white md:bg-transparent
            transition-all duration-300 z-50
            ${openNav ? "top-16 opacity-100" : "top-[-100%] opacity-0 md:opacity-100"}
          `}
        >
          <ul className='flex flex-col md:flex-row items-center gap-7 font-semibold text-xl py-6 md:py-0'>
            <NavLink to="/" className={({ isActive }) => `${isActive ? "border-b-2 border-red-500" : "text-black"}`}>
              <li onClick={() => setOpenNav(false)}>Home</li>
            </NavLink>

            <NavLink to="/products" className={({ isActive }) => `${isActive ? "border-b-2 border-red-500" : "text-black"}`}>
              <li onClick={() => setOpenNav(false)}>Products</li>
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `${isActive ? "border-b-2 border-red-500" : "text-black"}`}>
              <li onClick={() => setOpenNav(false)}>About</li>
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => `${isActive ? "border-b-2 border-red-500" : "text-black"}`}>
              <li onClick={() => setOpenNav(false)}>Contact</li>
            </NavLink>
          </ul>

          {/* CART + AUTH */}
          <div className='flex md:flex-row flex-col items-center gap-6 md:ml-6 pb-4 md:pb-0'>
            <Link to="/cart" className="relative">
              <IoCartOutline className="h-7 w-7" />
              <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>
                {totalCartItems}
              </span>
            </Link>

            <div>
              <SignedOut>
                <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </nav>

      </div>
    </div>
  )
}

export default Navbar
