"use client";
import { useEffect, useState } from 'react'
import { Link } from 'next-view-transitions'
import { Button } from '../ui/button'
import { MapPin } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Mobile = dynamic(() => import('@/components/Navbar/Mobile'), { ssr: false });

const SearchDialog = dynamic(() => import('@/components/Search/SearchDialog'), { ssr: true });

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 text-black backdrop-blur-md px-4 py-4 shadow-sm">
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-1 text-2xl font-bold text-gray-900">
            <MapPin className="h-6 w-6 text-near-purple" />
            <span>NEAR ABAC</span>
          </Link>
          {/* Nav */}
          <nav className='hidden md:flex items-center space-x-8'>
            <ul className="flex items-center gap-8 text-lg">
              <li>
                <Link href="/categories" className="text-gray-700 hover:text-near-purple smooth-transition ">Categories</Link>
              </li>
              <li>
                <Link href="#featured" className="text-gray-700 hover:text-near-purple smooth-transition">Featured</Link>
              </li>
              <li>
                <Link href="#map" className="text-gray-700 hover:text-near-purple smooth-transition">Map</Link>
              </li>
              {user && (
                <li>
                  <Link href="/add-listing" className="text-gray-700 hover:text-near-purple smooth-transition">Add Listing</Link>
                </li>
              )}
            </ul>
          </nav>
          {/* Search */}
          <div className="hidden md:inline-flex relative">
            <SearchDialog onClose={() => { }} className='flex gap-2 w-[300px] text-gray-500 justify-start rounded-full' />
          </div>

          <div className='hidden md:flex items-center ml-4 space-x-6'>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='rounded-full h-10 w-10 p-0' aria-label="User menu">
                    <Image
                      src={user?.imageUrl || '/default.png'}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/default.png';
                      }}
                      unoptimized
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='rounded-lg align-end' >
                  <div className='px-2 py-1.5 text-sm font-medium text-gray-900'>
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className='px-2 py-1.5 text-xs text-gray-500'>
                    {user?.emailAddresses[0]?.emailAddress}
                  </div>
                  <DropdownMenuSeparator />
                  {user?.publicMetadata.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {(user?.publicMetadata.role === "moderator" || user?.publicMetadata.role === "") && (
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${user.id}`}>My Profile</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton>
                      <Link href="/">Log Out</Link>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (<>
              <Button onClick={() => router.push('/sign-in')} variant="ghost" className="text-gray-700 hover:text-near-purple cursor-pointer smooth-transition rounded-lg">
                Log In
              </Button>
              <Button onClick={() => router.push('/sign-up')} variant="ghost" className="text-gray-100 bg-[#7928ca] hover:bg-[#7928ca]/90 rounded-lg">
                Sign Up
              </Button>
            </>
            )}
          </div>
          <div className="md:hidden flex items-center gap-4">
            <Mobile />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;