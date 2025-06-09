import { ArrowLeft, Filter, Grid3X3, List, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
const CategoryIcon = React.lazy(() => import('@/components/CategoryIcon').then(module => ({ default: module.CategoryIcon })))

interface HeaderContentProps {
    header: string;
    back_str: string;
    back_url: string;
    description: string;
    viewMode?: 'grid' | 'list';
    setViewMode?: (mode: 'grid' | 'list') => void;
    showSearchFilter?: boolean;
    searchValue?: string;
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    distanceValue?: string;
    onDistanceChange?: (value: string) => void;
    onClearFilters?: () => void;
    category?: {
        name: string;
        count?: number;
    }
    totalCount?: number;
}

const HeaderContent = ({
    viewMode,
    setViewMode,
    header,
    back_str,
    back_url,
    description,
    showSearchFilter = false,
    searchValue = '',
    onSearchChange,
    distanceValue = '',
    onDistanceChange,
    onClearFilters,
    category,
    totalCount
}: HeaderContentProps) => {
    return (
        <>
            <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between'>
                <div>
                    <div className='flex items-center mb-2'>
                        <Link href='/' className='flex items-center gap-1 text-near-purple hover:text-near-purple-dark transition-colors text-sm'>
                            <ArrowLeft className='w-4 h-4' />
                            <span>Back to {back_str}</span>
                        </Link>
                    </div>
                    {category ? (
                        <div className='flex items-center gap-4 mt-4'>
                            <div className='h-12 w-12 bg-near-purple/10 rounded-full flex items-center justify-center'>
                                <CategoryIcon
                                    type={category.name}
                                    size={6}
                                />
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold md:text-4xl text-gray-900 leading-tight'>
                                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                </h1>
                                <p className='text-gray-600 text-base'>
                                    {totalCount} places around Assumption University
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className='text-3xl font-bold md:text-4xl text-gray-900 leading-tight'>
                                {header}
                            </h1>
                            {description && (
                                <p className='text-gray-600 mt-2 text-base'>
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {(viewMode && setViewMode) && (
                    <div className='flex items-center gap-2 mt-4 md:mt-0'>
                        <span className='text-sm text-gray-500'>View:</span>
                        <Button
                            className={cn('p-3 rounded-lg transition-colors',
                                viewMode === 'grid' ? 'bg-near-purple text-white' : 'bg-white text-gray-600 hover:bg-gray-100 '
                            )}
                            aria-label='grid view'
                            onClick={() => setViewMode?.('grid')}
                        >
                            <Grid3X3 className='w-4 h-4' />
                        </Button>
                        <Button
                            aria-label='list view'
                            className={cn('p-3 rounded-lg transition-colors',
                                viewMode === 'list' ? 'bg-near-purple text-white' : 'bg-white text-gray-600 hover:bg-gray-100 '
                            )}
                            onClick={() => setViewMode?.('list')}
                        >
                            <List className='w-4 h-4' />
                        </Button>
                    </div>
                )}
            </div>
            {showSearchFilter && (
                <div className='bg-white rounded-xl shadow-sm p-4 mt-6'>
                    <div className='flex flex-col md:flex-row gap-4 items-center'>
                        <div className='relative flex-1'>
                            <Search className='absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="w-full pl-10 border border-gray-200 rounded-md pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-near-purple/20 focus:border-near-purple/20"
                                value={searchValue}
                                onChange={onSearchChange}
                            />
                        </div>
                        <div className='flex-shrink-0 flex items-center gap-4'>
                            <Filter className='text-gray-500 w-4 h-4' />
                            <span className='text-gray-500 text-sm'>Distance:</span>
                            <Select
                                value={distanceValue}
                                onValueChange={onDistanceChange}
                            >
                                <SelectTrigger className='focus:outline-none focus:ring-2 focus:ring-near-purple/20 focus:border-near-purple/20'>
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
                        <Button onClick={onClearFilters} variant="outline" className='flex items-center justify-center'>
                            Clear Filters
                        </Button>
                    </div>
                </div>
            )}
        </>

    )
}

export default HeaderContent