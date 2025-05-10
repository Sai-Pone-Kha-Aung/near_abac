import React from 'react'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Map from './components/Map'
import Featured from './components/Featured'
import { FeaturedListing } from './features'

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