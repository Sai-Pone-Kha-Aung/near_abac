import React, { useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useUser()
    const isLoggedIn = user.isSignedIn
    const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_URL_ENDPOINT;

    return (
        <section className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-gray-700 overflow-hidden relative w-full'>
            {/* image */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-black/35 z-10'>
                </div>
                <Image
                    src={`${imageKitEndpoint}/hero_image.webp?tr=w-1200,h-800,q-85,cm-exif`}
                    alt='heroimage'
                    className={`w-full h-full object-cover`}
                    width={1200}
                    height={1000}
                    sizes='(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1200px'
                    quality={85}
                    priority={true}
                    loading='eager'
                    onLoad={() => setIsLoaded(true)}
                />
            </div>

            <div className='flex flex-col items-center justify-center text-center mt-10 relative z-20 mx-auto h-full container px-4'>
                <div>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-200'>Discover What&apos;s <span className='text-near-purple-light'>NEAR ABAC</span></h1>
                    <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 text-gray-700'>Find the best apartments, restaurants, cafes and more around Assumption University</p>
                </div>
                <div
                    className={cn(
                        "w-full max-w-2xl transition-all duration-700 delay-200 transform",
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >

                    {isLoggedIn ? (
                        <Link href='/add-listing' className="inline-block">
                            <Button
                                variant='default'
                                className='bg-near-purple text-white hover:bg-near-purple-dark transition-colors min-w-[280px] min-h-[48px] px-8 py-3 text-base touch-manipulation'
                            >
                                Add Your Place
                            </Button>
                        </Link>
                    ) : (
                        <Link href='/sign-in' className="inline-block">
                            <Button
                                variant='default'
                                className='bg-near-purple text-white hover:bg-near-purple-dark transition-colors min-w-[280px] min-h-[48px] px-8 py-3 text-base touch-manipulation'
                            >
                                Sign in to add your place
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center transition-all duration-700 delay-400'>
                <span className='text-md mb-2 font-medium text-gray-200'>Scroll to explore</span>
                <ArrowDown className='animate-bounce w-5 h-5 text-gray-200' />
            </div>
        </section>
    )
}

export default Hero