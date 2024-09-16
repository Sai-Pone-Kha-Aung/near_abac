"use client"
//import Link from 'next/link'
import { useEffect, useState } from 'react'
import Mobile from './Mobile'
import SearchDialog from '../Search/SearchDialog'
import { Link } from 'next-view-transitions'

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 text-black backdrop-blur-md">
      <div className="container flex flex-col md:flex-row md:items-start justify-between h-16 px-4 md:px-6 mx-auto p-4 text-black">
        <div className="flex flex-row md:flex-row gap-6 text-lg font-medium justify-between md:items-center">
          <Link href="/" className="text-lg font-semibold">
            <span className="flex items-center gap-2 hover:text-2xl transition-all duration-300 ease-in-out cursor-pointer" data-testid="navbar-title">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
              </svg>
              Near ABAC
            </span>
          </Link>
          <div className="flex items-center gap-6 md:ml-auto justify-center md:justify-start">
            {/* Add other links here if needed */}
          </div>
          <div className="sm:hidden flex items-center gap-4 md:ml-auto md:justify-end">
            <Mobile />
          </div>
        </div>
        <div className="gap-4 mt-4 md:mt-0 hidden md:inline-flex">
          <SearchDialog onClose={() => {}} isDialogOpen={false}/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;