import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Map from './components/Map'
import { FeaturedListing } from './features'

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