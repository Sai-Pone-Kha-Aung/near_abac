import React from 'react'
import FeatureSection from './FeatureSection'
import { useListings } from '@/hooks/useListings'

const FeaturedListing = () => {
    const { data: listings } = useListings(true);
    const apartmentListings = listings?.filter(listing => listing.category === 'apartment-condo').slice(0, 4) || [];
    const restaurants = listings?.filter(listing => listing.category === 'restaurant').slice(0, 4) || [];
    const cafeListings = listings?.filter(listing => listing.category === 'cafe').slice(0, 4) || [];


    return (
        <div id='feature' className='bg-white'>
            <FeatureSection
                listings={apartmentListings}
                title="Apartments & Condos"
                subtitle="Discover the best apartments and condos near Assumption University."
                type='apartment-condo'
            />

            <div className='bg-near-gray py-0.5'></div>

            <FeatureSection
                listings={restaurants}
                title="Restaurants"
                subtitle="Explore the best restaurants near Assumption University."
                type='restaurant'
            />

            <div className='bg-near-gray py-0.5'></div>

            <FeatureSection
                listings={cafeListings}
                title="Cafes"
                subtitle="Find the best cafes near Assumption University."
                type='cafe'
            />
        </div>
    )
}

export default FeaturedListing