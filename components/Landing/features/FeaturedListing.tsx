import React from 'react'
import FeatureSection from './FeatureSection'
import { apartmentListings, bakeryListings, cafeListings } from './FeatureData'

const FeaturedListing = () => {
    return (
        <div id='feature' className='bg-white'>
            <FeatureSection
                listings={apartmentListings}
                title="Appartments & Condos"
                subtitle="Discover the best apartments and condos near Assumption University."
                type='apartment'
            />

            <div className='bg-near-gray py-0.5'></div>

            <FeatureSection
                listings={bakeryListings}
                title="Bakery & Cafes"
                subtitle="Explore the best bakeries and cafes near Assumption University."
                type='bakery'
            />

            <div className='bg-near-gray py-0.5'></div>

            <FeatureSection
                listings={cafeListings}
                title="Cafes & Restaurants"
                subtitle="Find the best cafes and restaurants near Assumption University."
                type='cafe'
            />
        </div>
    )
}

export default FeaturedListing