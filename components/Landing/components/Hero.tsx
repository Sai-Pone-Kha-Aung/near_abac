import React, { useState } from 'react'
import SearchDialog from '../../Search/SearchDialog'
import Image from 'next/image'
import { ArrowDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <section className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-gray-700 overflow-hidden relative w-full'>
            {/* image */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-black/35 z-10'>
                </div>
                <img
                    src='/hero_img/IMG_3372.JPG'
                    alt='hero image'
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover backdrop:blur-sm`}
                />
            </div>

            <div className='flex flex-col items-center justify-center text-center mt-10 relative z-20 mx-auto h-full container px-4'>
                <div>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-200'>Discover What's <span className='text-near-purple-light'>NEAR ABAC</span></h1>
                    <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 text-gray-700'>Find the best apartments, restaurants, cafes and more around Assumption University</p>
                </div>
                {/* <div>
                    <SearchDialog isDialogOpen={false} onClose={() => { }} className='flex rounded-full w-[500px] text-center text-gray-500 justify-start' />
                </div> */}
                <div
                    className={cn(
                        "w-full max-w-2xl transition-all duration-700 delay-200 transform",
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for apartments, restaurants, cafes..."
                            className="w-full bg-white/90 backdrop-blur-sm py-4 pl-12 pr-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-near-purple shadow-lg"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-near-purple text-white px-5 py-2 rounded-full hover:bg-near-purple-dark transition-colors">
                            Search
                        </button>
                    </div>
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