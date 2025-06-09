'use client'
import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Grid3X3, List } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CategoryIcon } from '@/components/CategoryIcon'
import { useCategories } from '@/hooks/useCategories'
import dynamic from 'next/dynamic'
import HeaderContent from '@/components/HeaderContent.Component'
const GridView = dynamic(() => import('@/components/Categories/GridView'), {
    ssr: false
});
const ListView = dynamic(() => import('@/components/Categories/ListView'), {
    ssr: false
});

const Page = () => {
    const { data: categories, isLoading: categoriesLoading, isError: error } = useCategories();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const sortedCategories = useMemo(() => {
        if (!categories) return [];
        return categories.sort((a, b) => {
            if (a.name === b.name) {
                return a.count - b.count;
            }
            return a.name.localeCompare(b.name);
        });
    }, [categories]);

    if (error) {
        return <div className='container mx-auto px-4 py-8 text-red-500'>Error loading categories: {error}</div>;
    }
    return (
        <div className='min-h-screen bg-near-gray flex flex-col'>
            <main className='flex-1 pt-10 pb-16'>
                <div className='container mx-auto px-4'>
                    <HeaderContent
                        header='All Categories'
                        back_str='Home'
                        back_url='/'
                        description='Browse all places around Assumption University by category'
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    {categoriesLoading ? (
                        <div className='flex items-center justify-center py-12'>
                            <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
                            <p className='ml-4 text-gray-500'>Loading categories...</p>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'grid' ? (
                                <GridView sortedCategories={sortedCategories} />
                            ) : (
                                <ListView sortedCategories={sortedCategories} />
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Page