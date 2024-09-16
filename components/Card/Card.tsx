import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {Clock, Link2, MapPin, Phone } from 'lucide-react'
import type { Card as CardType } from '@/types/types'

const Card = (Card: CardType) => {
  const router = useRouter();

  return (
    <div className='flex flex-col rounded-2xl w-96 bg-[#ffffff] shadow-lg hover:shadow-xl transition-shadow duration-300' style={{height: '620px'}} data-testid="card">
        <div className='flex justify-center items-center h-[300px] overflow-hidden' data-testid="card-image">
            <Image 
                src={Card.image} 
                alt={Card.name}
                className='rounded-t-2xl w-full h-full object-cover'
                width={100}
                height={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                fetchPriority='high'
                loading='lazy'
            />
        </div>
        <div className='flex flex-col p-8'>
            <h1 className='text-2xl font-bold text-neutral-900' data-testid="card-name">{Card.name}</h1>
            <span className='flex justify-start items-center text-neutral-400' data-testid="card-address">
             <MapPin className='w-4 h-4 mr-2'/>   {Card.address}
            </span>
            <div className='flex flex-col gap-2 pt-6 text-neutral-700' data-testid="card-phone">
                <span className='flex justify-start items-center'>
                    <Phone className='w-4 h-4 mr-2'/> {Card.phone}
                </span>
                <Link href={`https://${Card.url}`} target='_blank' rel="noopener noreferrer"  className='flex justify-start items-center hover:underline hover:text-blue-500 cursor-pointer break-all' data-testid="card-url">
                    <Link2 className='w-4 h-4 mr-2'/> {Card.url}
                </Link>
                {Card.hours && <span className='flex justify-start items-center' data-testid="card-hours"><Clock className='w-4 h-4 mr-2'/> {Card.hours}</span>}
            </div>
            <div className="flex justify-end pt-6">
            <Button className="bg-[#7e22ce] text-[#ffffff] w-full font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform" data-testid="card-button"
                onClick={() => router.push(`/singlepost/${Card.id}`)}
            >
                See More
            </Button>
            </div>
        </div>
    </div>
  )
}

export default Card