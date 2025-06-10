'use client'
import React from 'react'
import Hero from '@/components/Landing/components/Hero'
import Categories from '@/components/Landing/components/Categories'
import Map from '@/components/Landing/components/Map'
import FeaturedListing from '@/components/Landing/features/FeaturedListing'

const LandingPage = () => {
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