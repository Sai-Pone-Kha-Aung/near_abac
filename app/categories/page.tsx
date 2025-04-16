'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Grid3X3, List } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Category } from '@/types/types'
import { CategoryIcon } from '@/components/Landing/components/Categories'

const categories: Category[] = [
    { id: '1', name: 'Apartments', type: 'apartment', icon: 'building', count: 24 },
    { id: '2', name: 'Condos', type: 'condo', icon: 'home', count: 18 },
    { id: '3', name: 'Restaurants', type: 'restaurant', icon: 'utensils', count: 42 },
    { id: '4', name: 'Cafes', type: 'cafe', icon: 'coffee', count: 36 },
    { id: '5', name: 'Bakeries', type: 'bakery', icon: 'cake', count: 15 },
    { id: '6', name: 'Shopping', type: 'shopping', icon: 'shopping-bag', count: 28 },
    { id: '7', name: 'Entertainment', type: 'entertainment', icon: 'camera', count: 12 },
];


const Page = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    return (
        <div className='min-h-screen bg-near-gray flex flex-col'>
            <main className='flex-1 pt-10 pb-16'>
                <div className='container mx-auto px-4'>
                    <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between'>
                        <div>
                            <div className='flex items-center mb-2'>
                                <Link href='/' className='flex items-center gap-1 text-near-purple hover:text-near-purple-dark transition-colors text-sm'>
                                    <ArrowLeft className='w-4 h-4' />
                                    <span>Back to Home</span>
                                </Link>
                            </div>
                            <h1 className='text-3xl font-bold md:text-4xl'>All Categories</h1>
                            <p className='text-gray-600 mt-2'>Browse all places around Assumption University by category</p>
                        </div>

                        <div className='flex items-center gap-2 mt-4 md:mt-0'>
                            <span className='text-sm text-gray-500'>View:</span>
                            <Button
                                className={cn('p-3 rounded-lg transition-colors',
                                    viewMode === 'grid' ? 'bg-near-purple text-white' : 'bg-white text-gray-600 hover:bg-gray-100 '
                                )}
                                aria-label='grid view'
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3X3 className='w-4 h-4' />
                            </Button>
                            <Button
                                aria-label='list view'
                                className={cn('p-3 rounded-lg transition-colors',
                                    viewMode === 'list' ? 'bg-near-purple text-white' : 'bg-white text-gray-600 hover:bg-gray-100 '
                                )}
                                onClick={() => setViewMode('list')}
                            >
                                <List className='w-4 h-4' />
                            </Button>
                        </div>
                    </div>

                    {viewMode === 'grid' ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
                            {categories.map((category, index) => (
                                <div
                                    key={category.id}
                                    className={cn('bg-whtie shadow-md rounded-xl p-6 card-hover transition-all duration-500 transform')}
                                >
                                    <div className='h-16 w-16 bg-near-purple/10 rounded-full flex items-center justify-center mb-4'>
                                        <CategoryIcon
                                            type={category.type}
                                            size={24}
                                        />
                                    </div>
                                    <div className='flex flex-col items-start gap-2'>
                                        <h3 className='text-lg font-medium mb-2'>
                                            {category.name}
                                        </h3 >
                                        <p className='text-gray-500 text-sm'>{category.count} places</p>
                                        <p className='text-sm text-gray-600 mb-2'>Find the best {category.name.toLowerCase()} around ABAC</p>
                                        <Link href={`/categories/${category.type}`} className='text-near-purple hover:text-near-purple-dark transition-colors hover:underline text-sm font-medium'>Browse {category.name.toLowerCase()}</Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                            {categories.map((category, index) => (
                                <div
                                    key={category.id}
                                    className={cn('p-4 border-b border-gray-100 hover:bg-near-gray transition-colors flex items-center justify-between')}
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className='h-16 w-16 bg-near-purple/10 rounded-full flex items-center justify-center flex-shrink-0'>
                                            <CategoryIcon
                                                type={category.type}
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <h3 className='font-medium'>
                                                {category.name}
                                            </h3 >
                                            <p className='text-gray-500 text-sm'>{category.count} places around ABAC</p>
                                        </div>
                                    </div>
                                    <Link href={`/categories/${category.type}`} className='text-near-purple hover:text-near-purple-dark transition-colors hover:underline text-sm font-medium'>Browse</Link>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Page