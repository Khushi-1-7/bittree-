"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname=usePathname()
  const showNavbar=["/","/generate"].includes(pathname)
  return (<>
    {showNavbar &&<nav className='bg-white flex justify-between w-[80vw] fixed top-10 right-[10vw] rounded-full py-4 px-7'>
        <div className='logo flex gap-20 items-center'>
            <Link href="/"><img className='h-8 flex gap-4' src="/logo.svg"/></Link>
            <ul className='flex gap-10'>
              <Link href="/"><li>Products</li></Link>
              <Link href="/"><li>Templates</li></Link>
              <Link href="/"><li>Marketplace</li></Link>
              <Link href="/"><li>Pricing</li></Link>    
            </ul>
        </div>
        <div className='flex gap-3'>
          <button className='login font-bold bg-gray-300 p-4 rounded-lg'>Log in</button>
          <button className='signup font-bold p-4 rounded-full text-white bg-gray-900'>Sign up free</button>
        </div>
    </nav>}
    </>
  )
}

export default Navbar
