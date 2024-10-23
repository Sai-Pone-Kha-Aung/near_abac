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
      <div className="container flex md:flex-row justify-between h-20 p-4 md:px-6 mx-auto  text-black items-center">
        <div className="flex md:flex-row gap-6 text-lg font-medium justify-between md:items-center md:justify-between w-full">
          <Link href="/" className="text-lg font-semibold">
            <span className="flex text-2xl items-center gap-2 hover:text-3xl transition-all duration-300 ease-in-out cursor-pointer font-bold" data-testid="navbar-title">
              <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#5f6368"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
              />
              </svg>
              NEAR ABAC
            </span>
          </Link>
          <div className="flex items-center gap-6 md:ml-auto justify-center md:justify-start">
            {/* Add other links here if needed */}
          </div>
          <div className="sm:hidden flex items-center gap-4 md:ml-auto md:justify-end">
            <Mobile />
          </div>
          <div className="hidden md:inline-flex">
            <SearchDialog onClose={() => { }} isDialogOpen={false} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;