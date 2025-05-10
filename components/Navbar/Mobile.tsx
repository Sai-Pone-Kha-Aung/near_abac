import Link from 'next/link'
import { useState } from 'react'
import SearchDialog from '../Search/SearchDialog'

const Mobile = ({ user }: { user: { role: "user" | "admin" } }) => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  return (
    <div>
      {isOpenMobileMenu ?
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
      }
      {isOpenMobileMenu && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-6 px-4 glass-effect animate-fade-in'>
          <div>
            <SearchDialog onClose={() => setIsOpenMobileMenu(false)} isDialogOpen={false} className='flex gap-2 w-full justify-start rounded-full' />
          </div>

          <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
            <Link href="/categories" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Categories</Link>
          </div>
          <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
            <Link href="/featured" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Featured</Link>
          </div>
          <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
            <Link href="/map" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Map</Link>
          </div>
          {user ? (
            <>
              {user.role === "admin" && (
                <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
                  <Link href="/admin" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Admin Dashboard</Link>
                </div>
              )}
              <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
                <Link href="/add-listing" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Add Listing</Link>
              </div>
              <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
                <Link href="/profile" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>My Profile</Link>
              </div>
              <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
                <Link href="/" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Logout</Link>
              </div>
            </>
          ) : (
            <>
              <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
                <Link href="/login" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Login</Link>
              </div>
              <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out mt-2'>
                <Link href="/signup" onClick={() => setIsOpenMobileMenu(false)} className='text-lg font-medium text-gray-700 hover:text-near-purple smooth-transition border-b border-white w-full py-2'>Sign Up</Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Mobile