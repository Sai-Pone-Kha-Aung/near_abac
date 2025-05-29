'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react'
import { CategoryIcon } from '@/components/CategoryIcon'
import { useParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ListingCard from '@/components/Landing/components/ListingCard'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/useCategories'
import { usePaginationListings } from '@/hooks/usePaginationListings'

const Page = () => {
  const slug = useParams().slug as string;
  const { categories } = useCategories();
  const { listings, loading, error, pagination, setPage, setSearchTerm, searchTerm } = usePaginationListings(slug, 12);
  const [inputValue, setInputValue] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const category = categories.find(cat => cat.name === slug)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    }
  }, [searchTimeout]);

  if (!mounted) {
    return null
  }


  const handlePageChange = (newPage: number) => {
    // Logic to handle page change
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const generatePageNumbers = () => {
    const pages = [];
    const { page, totalPages } = pagination;

    if (page > 3) {
      pages.push(1);
      if (page > 4) pages.push('...');
    }

    for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      if (page < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);

    if (searchTerm) {
      clearTimeout(searchTerm);
    }

    const timeout = setTimeout(() => {
      setSearchTerm(newInputValue);
      setPage(1);
    }, 500);

    setSearchTimeout(timeout);
  }

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
                      type={category.name}
                      size={6}
                    />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold md:text-4xl'>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</h1>
                    <p className='text-gray-600'>{
                      pagination.total
                    } places around Assumption University</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-4 mt-6'>
            <div className='flex flex-col md:flex-row gap-4 '>
              <div className='relative flex-1'>
                <Search className='absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                <input type="text" placeholder="Search by name" className="w-full pl-10 border border-gray-200 rounded-md pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-near-purple/20 focus:border-near-purple/20" value={inputValue} onChange={handleSearchChange} />
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

          {loading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
              {[...Array(12)].map((_, index) => (
                <div key={index} className='bg-white rounded-xl shadow-sm animate-pulse'>
                  <div className='aspect-[4/3] bg-gray-200 rounded-t-xl'></div>
                  <div className='p-4'>
                    <div className='h-4 bg-gray-200 rounded mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length > 0 ? (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
                {listings.map((listing, index) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    index={index}
                  />
                ))}
              </div>
              {pagination.totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 mt-8'>
                  <Button
                    variant="outline"
                    size="sm"
                    className='px-3 py-2'
                    disabled={!pagination.hasPrev}
                    onClick={() => handlePageChange(pagination.page - 1)}
                  >
                    <ChevronLeft className='w-4 h-4' />
                    Previous
                  </Button>

                  <div className='flex gap-1'>
                    {generatePageNumbers().map((pageNum, index) => (
                      <React.Fragment key={index}>
                        {pageNum === '...' ? (
                          <span className='px-3 py-2 text-gray-500'>...</span>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className={`px-3 py-2 ${pagination.page === pageNum ? 'bg-near-purple text-white border-near-purple' : 'text-gray-700'}`}
                            onClick={() => handlePageChange(pageNum as number)}
                          >
                            {pageNum}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className='px-3 py-2'
                    disabled={!pagination.hasNext}
                    onClick={() => handlePageChange(pagination.page + 1)}
                  >
                    Next
                    <ChevronRight className='w-4 h-4' />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className='bg-white rounded-xl shadow-sm p-8 text-center mt-6'>
              <h3 className='text-xl font-medium mb-2'>
                No results found
              </h3>
              <p className='mb-4'>Try changing your search</p>
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

export default Page