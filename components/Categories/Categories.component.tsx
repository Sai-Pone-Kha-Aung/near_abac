'use client'
import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Grid3X3, List } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CategoryIcon } from '@/components/CategoryIcon'
import { useCategories, useCategoryCounts } from '@/hooks/useCategories'

const CategoriesPage = () => {
    const { categories, loading: categoriesLoading, error } = useCategories();
    const { categoryCounts, loading: countsLoading } = useCategoryCounts();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const categoriesWithCount = useMemo(() => {
        return categories.map(category => ({
            ...category,
            count: categoryCounts[category.name] || 0
        }))
    }, [categories, categoryCounts]);

    const sortedCategories = useMemo(() => {
        return categoriesWithCount.sort((a, b) => {
            if (a.name === b.name) {
                return a.count - b.count;
            }
            return a.name.localeCompare(b.name);
        });
    }, [categoriesWithCount]);

    const loading = categoriesLoading || countsLoading;

    if (loading) {
        return <div className='container mx-auto px-4 py-8'>
            <div className='flex items-center justify-center h-screen'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
            </div>
            <p className='text-center text-gray-500'>Loading categories...</p>
        </div>;
    }

    if (error) {
        return <div className='container mx-auto px-4 py-8 text-red-500'>Error loading categories: {error}</div>;
    }
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
                            {sortedCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className={cn('bg-white shadow-md rounded-xl p-6 card-hover transition-all duration-500 transform')}
                                >
                                    <div className='h-16 w-16 bg-near-purple/10 rounded-full flex items-center justify-center mb-4'>
                                        <CategoryIcon
                                            type={category.name}
                                            size={24}
                                        />
                                    </div>
                                    <div className='flex flex-col items-start gap-2'>
                                        <h3 className='text-lg font-medium mb-2'>
                                            {category.name.toLocaleUpperCase().charAt(0) + category.name.slice(1)}
                                        </h3 >
                                        <p className='text-gray-500 text-sm'>{category.count} places</p>
                                        <p className='text-sm text-gray-600 mb-2'>Find the best {category.name.toLocaleUpperCase().charAt(0) + category.name.slice(1)} around ABAC</p>
                                        <Link href={`/categories/${category.name}`} className='text-near-purple hover:text-near-purple-dark transition-colors hover:underline text-sm font-medium'>Browse {category.name}</Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                            {sortedCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className={cn('p-4 border-b border-gray-100 hover:bg-near-gray transition-colors flex items-center justify-between')}
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className='h-16 w-16 bg-near-purple/10 rounded-full flex items-center justify-center flex-shrink-0'>
                                            <CategoryIcon
                                                type={category.name}
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <h3 className='font-medium'>
                                                {category.name.toLocaleUpperCase().charAt(0) + category.name.slice(1)}
                                            </h3 >
                                            <p className='text-gray-500 text-sm'> {category.count} {category.name.toLocaleUpperCase().charAt(0) + category.name.slice(1)} places around ABAC</p>
                                        </div>
                                    </div>
                                    <Link href={`/categories/${category.name}`} className='text-near-purple hover:text-near-purple-dark transition-colors hover:underline text-sm font-medium'>Browse</Link>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default CategoriesPage