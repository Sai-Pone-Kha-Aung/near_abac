import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils'
import { Listing } from '@/types/types'
import { ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomImage from '@/components/CustomImage';

interface ListingCardProps {
    listing: Listing;
    index: number;
}

const ListingCard = ({ listing, index }: ListingCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/listing/${listing.id}`)} className='card-hover rounded-xl overflow-hidden bg-white shadow-md block cursor-pointer' style={{
            animationDelay: `${index * 0.1}s`,
            animation: 'fade-in 0.5s ease-in-out forwards',
            opacity: 0,
        }}

        >
            <div className='relative aspect-[4/3] overflow-hidden'>
                <CustomImage
                    src={listing.img_url || 'default.png'}
                    alt="nearabac listing image"
                    className={cn('w-full h-full object-cover transition-opacity duration-500')}
                    onLoad={() => setImageLoaded(true)}
                    width={1920}
                    height={1080}
                    priority
                />

                <div className='absolute top-3 left-3'>
                    <span className='bg-near-purple/90 backdrop-blur-sm text-white text-xs p-2 rounded-full'>
                        {listing?.category ? listing.category.charAt(0).toUpperCase() + listing.category.slice(1) : 'Category'}
                    </span>
                </div>
            </div>
            <div className='p-4'>
                <h3 className='font-medium text-lg text-gray-900 mb-2 line-clamp-1'>
                    {listing.name}
                </h3>
                {listing.description && (
                    <p className='text-gray-600 text-sm mb-2 line-clamp-2'>{listing.description}</p>
                )}
                <div className='flex justify-between items-center mt-2'>
                    <Link href="#" target='_blank' rel="noopener noreferrer"
                        className="text-near-purple text-sm flex items-center gap-1 hover:underline">
                        <span>View on map</span>
                        <ExternalLink className='w-4 h-4' />
                    </Link>
                    {listing.distance && (
                        <span className='text-sm text-gray-500'>{listing.distance} from ABAC</span>
                    )}
                </div>
            </div>

        </div>
    )
}

export default ListingCard