'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Filter, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CategoryIcon } from '@/components/Landing/components/Categories'
import { useParams } from 'next/navigation'
import { categories } from '@/components/Landing/components/Categories'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ListingCard from '@/components/Landing/components/ListingCard'
import { listings } from '@/constant/data'
import { Button } from '@/components/ui/button'

const page = () => {
  const slug = useParams().slug
  const category = categories.find(cat => cat.type === slug)

  const filteredCategories = listings.filter(listing => listing.type === slug).map(listing => ({
    id: listing.id,
    title: listing.title,
    type: listing.type,
    imageUrl: listing.imageUrl,
    mapUrl: listing.mapUrl,
    description: listing.description,
    distance: listing.distance,
  }));

  return (
    <div className='min-h-screen bg-near-gray flex flex-col'>
      <main className='flex-1 pt-10 pb-16'>
        <div className='container mx-auto px-4'>
          <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <div className='flex items-center mb-2'>
                <Link href='/categories' className='flex items-center gap-1 text-near-purple hover:text-near-purple-dark transition-colors text-sm'>
                  <ArrowLeft className='w-4 h-4' />
                  <span>Back to Categories</span>
                </Link>
              </div>
              {category && (
                <div className='flex items-center gap-4 mt-4'>
                  <div className='h-12 w-12 bg-near-purple/10 rounded-full flex items-center justify-center '>
                    <CategoryIcon
                      type={category.type}
                      size={6}
                    />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold md:text-4xl'>{category.name}</h1>
                    <p className='text-gray-600'>{category.count} places around Assumption University</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-4 mt-6'>
            <div className='flex flex-col md:flex-row gap-4 '>
              <div className='relative flex-1'>
                <Search className='absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                <input type="text" placeholder="Search by name" className="w-full pl-10 border border-gray-200 rounded-md pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-near-purple/20 focus:border-near-purple/20" />
              </div>
              <div className='flex-shrink-0 flex items-center gap-4'>
                <Filter className='text-gray-500 w-4 h-4' />
                <span className='text-gray-500 text-sm'>Distance:</span>
                <Select>
                  <SelectTrigger className='foucs:outline-none focus:ring-2 focus:ring-near-purple/20 focus:border-near-purple/20'>
                    <SelectValue placeholder='Select distance' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1 km</SelectItem>
                    <SelectItem value='2'>2 km</SelectItem>
                    <SelectItem value='3'>3 km</SelectItem>
                    <SelectItem value='4'>4 km</SelectItem>
                    <SelectItem value='5'>5 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredCategories.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
              {filteredCategories.map((listing, index) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className='bg-white rounded-xl shadow-sm p-8 text-center'>
              <h3 className='text-xl font-medium mb-2'>
                No results found
              </h3>
              <p>Try changing your search</p>
              <Button className=''>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default page