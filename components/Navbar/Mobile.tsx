import Link from 'next/link'
import { useState } from 'react'
import SearchDialog from '../Search/SearchDialog'

const links = [
  { id: 1, title: "Home", url: "/" },
]

const Mobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open ?
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" onClick={() => setOpen(!open)}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" onClick={() => setOpen(!open)}><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
      }
      {open && (
        <div className='container bg-background/90 text-black absolute left-0 top-[100%] w-full h-[100dvh] flex flex-col gap-8 items-center justify-start text-3xl z-10 pt-20'>
          <div>
            <SearchDialog onClose={() => setOpen(false)} isDialogOpen={false} />
          </div>
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