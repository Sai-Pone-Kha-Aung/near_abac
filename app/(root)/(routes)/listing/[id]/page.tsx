"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, ExternalLink, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryIcon } from '@/components/Landing/components/Categories'
import { listings } from '@/constant/data'
import { Listing } from '@/types/types'
import { useParams } from 'next/navigation'
import GoogleMapComponent from '@/components/Map-Modal'
import MapModal from '@/components/Map-Modal'

const Page = () => {
    const { id } = useParams();
    const [listing, setListing] = useState<Listing>(listings[0])

    useEffect(() => {
        if (id) {
            const selectedListing = listings.find((listing) => listing.id === id)
            setListing(selectedListing || listings[0])
        }
    }, [id])

    return (
        <div className='min-h-screen bg-near-gray flex flex-col'>
            <main className='flex-1 pt-10 pb-16'>
                <div className='container mx-auto px-4'>
                    <div>
                        <div className='flex items-center mb-2'>
                            <Link href={`/categories/${listing?.type}`} className='flex items-center gap-1 text-near-purple hover:text-near-purple-dark transition-colors text-sm'>
                                <ArrowLeft className='w-4 h-4' />
                                <span>Back to {listing?.type.charAt(0).toUpperCase() + listing?.type.slice(1)}</span>
                            </Link>
                        </div>
                    </div>

                    <div className='mt-6 bg-white rounded-xl shadow-md overflow-hidden'>
                        <div className='relative aspect-video w-full  overflow-hidden'>
                            <Image
                                src={listing?.imageUrl}
                                alt={`Image of ${listing?.title}`}
                                className={`w-full h-full object-cover backdrop:blur-sm`}
                                width={1920}
                                height={1080}
                                priority
                            />
                            <div className='absolute top-4 left-4'>
                                <span className='bg-near-purple/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full'>
                                    {listing?.type.charAt(0).toUpperCase() + listing?.type.slice(1)}
                                </span>
                            </div>
                        </div>

                        <div className='p-6 md:p-8'>
                            <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                                <div>
                                    <h1 className='text-2xl font-bold text-gray-800'>{listing?.title}</h1>
                                    <div className='flex items-center gap-2 mt-2 text-gray-600'>
                                        <Clock className='w-4 h-4' />
                                        <span>{listing?.distance} away from Assumption University</span>
                                    </div>
                                </div>
                                <Button variant='outline' className='flex items-center gap-2 bg-near-purple text-white hover:bg-near-purple-dark transition-colors self-start hover:text-white'>
                                    <MapPin className='w-4 h-4' />
                                    <span>View on Map</span>
                                    <ExternalLink className='w-3 h-3' />
                                </Button>
                            </div>

                            <div className='mt-6'>
                                <h3 className='text-lg font-semibold'>Description</h3>
                                <p className='mt-2 text-gray-600 leading-relaxed'>
                                    {listing?.description}
                                </p>
                            </div>

                            <div className='border-t border-gray-100 pt-6 mt-8'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className='h-10 w-10 bg-near-purple/10 rounded-full flex items-center justify-center'>
                                            <CategoryIcon type={listing?.type} size={5} />
                                        </div>
                                        <div>

                                            <span className='text-sm text-gray-500'>Category</span>
                                            <h3 className='font-medium'>{listing?.type.charAt(0).toUpperCase() + listing?.type.slice(1)}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative mt-12 rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-700 transform'>
                        <h2 className='text-2xl font-bold my-6'>{listing?.title} Location</h2>
                        <div className='absolute inset-0 bg-near-gray-dark'>
                            <iframe
                                src={listing?.mapEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            {/* <MapModal
                                open={false}
                                onOpenChange={() => { }}
                            /> */}
                        </div>
                    </div>

                    <div className='mt-12'>
                        <h2 className='text-2xl font-bold my-6'>Similar Places Nearby</h2>
                        <div className='text-center text-gray-500 bg-white rounded-xl shadow-md p-8'>
                            More listings coming soon!
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Page