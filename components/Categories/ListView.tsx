import React from 'react'
import { Category } from '@/types/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'
const CategoryIcon = React.lazy(() => import('@/components/CategoryIcon').then(module => ({ default: module.CategoryIcon })))

const ListView = ({ sortedCategories }: { sortedCategories: Category[] }) => {
    return (
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
    )
}

export default ListView