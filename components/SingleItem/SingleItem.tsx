import React from 'react'
import { SingleItem as Item} from '@/types/types'
import { Clock, Link2, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const SingleItem = (SingleItem: Item) => {
  return (
    <div>
        <div className='bg-background/80 backdrop-blur-md rounded-lg shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8 text-neutral-700 md:px-6'>
            <div>
              <Image 
                src={SingleItem.image} 
                alt="" 
                className='rounded-lg w-full h-auto' 
                width={300} 
                height={300} 
                fetchPriority='high'
                loading='lazy'
                />
            </div>
            <div>
                <h1 className='text-2xl font-bold text-neutral-900'>{SingleItem.name}</h1>
                  <div className='flex flex-col gap-4 pt-6 text-neutral-700'>
                      <div>
                          <span className='flex font-bold'>Description</span>
                          <p className='py-1 break-all'>{SingleItem.desc}</p>
                      </div>
                      <span className='flex justify-start items-center text-neutral-400'>
                        <MapPin className='w-4 h-4 mr-2'/>   {SingleItem.address}
                      </span>
                      <span className='flex justify-start items-center'>
                          <Phone className='w-4 h-4 mr-2'/> {SingleItem.phone}
                      </span>
                      <Link href={`https://${SingleItem.url}`} target='_blank' rel="noopener noreferrer"  className='flex justify-start items-center underline hover:text-blue-500'>
                          <Link2 className='w-4 h-4 mr-2'/>{SingleItem.url}
                      </Link>
                      <span className='flex justify-start items-center'><Clock className='w-4 h-4 mr-2'/> {SingleItem?.hours}</span>
                  </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SingleItem