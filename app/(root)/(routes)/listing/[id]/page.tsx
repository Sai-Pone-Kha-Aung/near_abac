'use client'
import Link from 'next/link'
import { ArrowLeft, Clock, Edit, ExternalLink, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryIcon } from '@/components/CategoryIcon'
import { useParams } from 'next/navigation'
import { useListingsById } from '@/hooks/useListings'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

const Page = () => {
    const { id } = useParams();
    const { listing, loading } = useListingsById(id as string)
    const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_URL_ENDPOINT;
    const { user } = useUser();

    if (loading && !listing) {
        return (
            <div className='min-h-screen flex items-center justify-center gap-2'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
                <p className='text-center text-gray-500'>Loading listing...</p>
            </div>
        )
    }
    if (!listing) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <p className='text-center text-gray-500'>Listing not found</p>
            </div>
        )
    }

    if (listing.img_url && !listing.img_url.startsWith('http')) {
        listing.img_url = `${imageKitEndpoint}/${listing.img_url}`;
    }

    if (listing.img_url === null) {
        listing.img_url = `${imageKitEndpoint}/default.png`;
    }

    return (
        <div className='min-h-screen bg-near-gray flex flex-col'>
            <main className='flex-1 pt-10 pb-16'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
                        <div className='flex items-center mb-2'>
                            <Link href={`/categories/${listing?.category}`} className='flex items-center gap-1 text-near-purple hover:text-near-purple-dark transition-colors text-sm'>
                                <ArrowLeft className='w-4 h-4' />
                                <span>Back to {listing?.category ? listing.category.toLocaleUpperCase().charAt(0) + listing.category.slice(1) : 'Category'}</span>
                            </Link>
                        </div>
                        {(user?.id === listing.user_id || user?.publicMetadata.role === "admin") && <Button variant='outline' className='flex items-center gap-2 bg-near-purple text-white hover:bg-near-purple-dark transition-colors self-start hover:text-white' onClick={() => { window.open(`/edit-listing/${listing.id}`, "_blank") }}>
                            <Edit className='w-4 h-4' />
                            <span>Edit listing</span>
                            <ExternalLink className='w-3 h-3' />
                        </Button>
                        }
                    </div>

                    <div className='mt-6 bg-white rounded-xl shadow-md overflow-hidden'>
                        <div className='relative aspect-video w-full  overflow-hidden'>
                            <Image
                                src={`${listing?.img_url}`}
                                alt={`Image of ${listing?.name}`}
                                className={`w-full h-full object-cover backdrop:blur-sm`}
                                width={1920}
                                height={1080}
                                priority
                            />
                            <div className='absolute top-4 left-4'>
                                <span className='bg-near-purple/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full'>
                                    {listing?.category ? listing.category.toLocaleUpperCase().charAt(0) + listing.category.slice(1) : 'Category'}
                                </span>
                            </div>
                        </div>

                        <div className='p-6 md:p-8'>
                            <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                                <div>
                                    <h1 className='text-2xl font-bold text-gray-800'>{listing?.name}</h1>
                                    <div className='flex items-center gap-2 mt-2 text-gray-600'>
                                        <Clock className='w-4 h-4' />
                                        <span>{listing?.distance} away from Assumption University</span>
                                    </div>
                                </div>
                                <Button variant='outline' className='flex items-center gap-2 bg-near-purple text-white hover:bg-near-purple-dark transition-colors self-start hover:text-white' onClick={() => {
                                    window.open(listing.google_map_link || "https://www.google.com/maps", "_blank");
                                }}>
                                    <MapPin className='w-4 h-4' />
                                    <span>View on Map</span>
                                    <ExternalLink className='w-3 h-3' />
                                </Button>
                            </div>

                            <div className='mt-6'>
                                <h3 className='text-lg font-semibold'>Address</h3>
                                <p className='mt-2 text-gray-600 leading-relaxed'>
                                    {listing?.address || 'No address provided'}
                                </p>
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
                                            <CategoryIcon type={listing?.category} size={5} />
                                        </div>
                                        <div>

                                            <span className='text-sm text-gray-500'>Category</span>
                                            <h3 className='font-medium'>{listing?.category ? listing.category.toLocaleUpperCase().charAt(0) + listing.category.slice(1) : 'Category'}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative mt-12 rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-700 transform'>
                        <h2 className='text-2xl font-bold my-6'>{listing?.name} Location</h2>
                        <div className='absolute inset-0 bg-near-gray-dark'>
                            <iframe
                                src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.7574928636877!2d100.83533621160441!3d13.611617900466568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d430e775155f9%3A0xf01923824353260!2sAssumption%20University%20Suvarnabhumi%20Campus!5e0!3m2!1sen!2sth!4v1746586303134!5m2!1sen!2sth"}
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

export default Page;