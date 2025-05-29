import React, { useState, useEffect } from 'react'
import { Listing } from '@/types/types'
import ListingCard from '@/components/Landing/components/ListingCard'
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'

interface FeatureSectionProps {
    listings: Listing[]
    title?: string
    subtitle?: string
    type?: string
}

const FeatureSection = ({ listings, title, subtitle, type }: FeatureSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((
            [entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        },
            { threshold: 0.1 });

        const section = document.getElementById('categories');
        if (section) {
            observer.observe(section);
        }
        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, [type])
    return (
        <section id={type} className='py-16 md:py-20'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 '>
                    <div className={cn('transition-all duration-500 transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10')}>
                        <span className='text-near-purple text-sm font-medium uppercase tracking-wider'>Featured</span>
                        <h2 className='text-3xl md:text-4xl font-semibold my-2'>{title}</h2>
                        <p className='text-gray-600 max-w-2xl'>{subtitle}</p>
                    </div>
                    <Link href={`/categories/${type}`} className={cn('flex items-center gap-2 text-near-purple hover:text-near-purple-dark hover:underline transition-colors mt-4 md:mt-0', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10', 'transition-all duration-500 delay-200')}>
                        <span>
                            View All {title}
                        </span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-6'>
                    {listings.map((listing, index) => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section >
    )
}

export default FeatureSection