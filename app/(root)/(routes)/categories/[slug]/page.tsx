'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import ListingCard from '@/components/Landing/components/ListingCard'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/useCategories'
import { usePaginationListings } from '@/hooks/usePaginationListings'
import HeaderContent from '@/components/HeaderContent.Component'

const Page = () => {
  const slug = useParams().slug as string;
  const { data: categories } = useCategories();
  const { listings, loading, pagination, setPage, setSearchTerm, searchTerm, setDistance, distance } = usePaginationListings(slug, 12);
  const [inputValue, setInputValue] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const category = categories?.find(cat => cat.name === slug)
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

  const handleDistanceChange = (value: string) => {
    setDistance(value);
    setPage(1);
  }

  const handleSelectChange = (value: string) => {
    if (value) {
      handleDistanceChange(value);
    } else {
      setDistance('');
      setPage(1);
    }
  }

  const clearAllFilters = () => {
    setInputValue('');
    setSearchTerm('');
    setDistance('');
    setPage(1);
  };

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

  const headerTitle = category ? category.name.charAt(0).toUpperCase() + category.name.slice(1) : 'Category';

  return (
    <div className='min-h-screen bg-near-gray flex flex-col'>
      <main className='flex-1 pt-10 pb-16'>
        <div className='container mx-auto px-4'>
          <HeaderContent
            header={headerTitle}
            back_str='Categories'
            back_url='/categories'
            category={category}
            totalCount={pagination.total}
            showSearchFilter={true}
            searchValue={inputValue}
            onSearchChange={handleSearchChange}
            distanceValue={distance}
            onDistanceChange={handleSelectChange}
            onClearFilters={clearAllFilters} description={''} />

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
              <Button onClick={clearAllFilters}>
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