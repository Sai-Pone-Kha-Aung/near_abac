import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Hero = dynamic(() => import('@/components/Landing/components/Hero'), {
    ssr: false,
})
const Categories = dynamic(() => import('@/components/Landing/components/Categories'), {
    ssr: false,
})
const Map = dynamic(() => import('@/components/Landing/components/Map'), {
    ssr: false,
})
const FeaturedListing = dynamic(() => import('@/components/Landing/features/FeaturedListing'), {
    ssr: false,
})

const LandingPage = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <>
            <Hero />
            <Categories />
            <FeaturedListing />
            <Map />
        </>
    )
}

export default LandingPage