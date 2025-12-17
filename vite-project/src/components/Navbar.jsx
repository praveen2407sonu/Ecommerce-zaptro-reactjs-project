import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {MapPin} from 'lucide-react'
import {FaCaretDown} from 'react-icons/fa'
import { IoCartOutline } from "react-icons/io5";
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar = ({location}) => {
   
  return (
    <div className='bg-white py-3 shadow-2xl'>
     <div className='max-w-6xl mx-auto flex justify-between items-center'>

        {/* logo section */}
       <div className='flex gap-7 items-center'>
         <Link to={'/'}> <h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>Z</span>aptro</h1>
         </Link>
       <div className='flex gap-1 cursor-pointer items-center text-gray-700'>
         <MapPin className="text-red-500" />
         <span className='font-semibold'>{location ?<div className='-space-y-2'>
            <p>{location.county}</p>
            <p>{location.state}</p>
         </div>:"Add Address"}
        </span>
        <FaCaretDown/>
       </div>
       </div>

       {/* menu section */}
        <nav className='flex'>
            <ul className='flex items-center gap-7 font-semibold text-2xl'>
               
             <NavLink to={'/'} className={({isActive})=>`${isActive ?"border-b-2 border-red-500  transition-all":"text-black"}cursor-pointer`}><li>Home</li></NavLink>

             <NavLink to={'/Products'} className={({isActive})=>`${isActive ?"border-b-2 border-red-500  transition-all":"text-black"}cursor-pointer`}><li>Products</li></NavLink> 

              <NavLink to={'/about'} className={({isActive})=>`${isActive ?"border-b-2 border-red-500  transition-all":"text-black"}cursor-pointer`}><li>About</li></NavLink>

              <NavLink to={'/contact'} className={({isActive})=>`${isActive ?"border-b-2 border-red-500  transition-all":"text-black"}cursor-pointer`}><li>Contact</li></NavLink> 
           </ul>
          <Link to={'/cart'} className='relative ml-6'>
          <IoCartOutline className= "h-7 w-7"/>
          <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3  text-white'>0</span>
          </Link>

          <div className='ml-6'>
             <SignedOut>
                <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"/>
           </SignedOut>
            <SignedIn>
           <UserButton />
          </SignedIn>
          </div>

        </nav>
 
     </div>
    </div> 
  )
}   

export default Navbar