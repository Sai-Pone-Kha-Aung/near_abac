'use client'
import React, { useState, useEffect } from 'react'
import Hero from '@/components/Landing/components/Hero'
import Categories from '@/components/Landing/components/Categories'
import Map from '@/components/Landing/components/Map'
import FeaturedListing from '@/components/Landing/features/FeaturedListing'

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