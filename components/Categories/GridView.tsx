import React from 'react'
import { Category } from '@/types/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'
const CategoryIcon = React.lazy(() => import('@/components/CategoryIcon').then(module => ({ default: module.CategoryIcon })))

const GridView = ({ sortedCategories }: { sortedCategories: Category[] }) => {
    return (
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
    )
}

export default GridView