"use client"
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Explore", url: "/" },
  { id: 3, title: "About", url: "/" },
  { id: 4, title: "Contact", url: "/" },
]

const Mobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
        {open ? <X onClick={() => setOpen(!open)}/> : <Menu onClick={() => setOpen(!open)}/>}

      {open && (
        <div className='container bg-background/90 text-black absolute left-0 top-[100%] w-full h-[100vh] flex flex-col gap-8 items-center justify-center text-3xl z-10'>
          {links.map((link) => (
            <Link href={link.url} key={link.id} onClick={() => setOpen(false)}>
              {link.title}
            </Link>
          ))}

        </div>
      )}
    </div>
  )
}

export default Mobile