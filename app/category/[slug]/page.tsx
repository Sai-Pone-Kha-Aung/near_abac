"use client"
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { sheetsData } from '@/types/types';
import getSheetsData from '@/actions/getSheetsData';
import SkeletonCard from '@/components/Card/SkeletonCard';
import CategoryContent from '@/components/Category/CategoryContent';
import { Button } from '@/components/ui/button';

const SingleCategory = ({ params }: { params: { slug: string } }) => {
  const { data, error } = getSheetsData();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const postDetail = useMemo(() => {
    return (data ?? []).filter((post: sheetsData) => post.category === params.slug);
  }, [data, params.slug]);

  const paginationData = useMemo(() => {
    const initIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = initIndex + itemsPerPage;
    return postDetail.slice(initIndex, endIndex);
  }, [postDetail, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(postDetail.length / itemsPerPage);
  }, [postDetail, itemsPerPage]);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  if (loading) {
    return <SkeletonCard count={1} className='h-screen' />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]'>
      <div className='container grid grid-cols-1 gap-8 py-8 px-7 md:px-6 sm:mx-auto'>
        <Suspense fallback={<SkeletonCard count={1} className='h-screen' />}>
          <CategoryContent params={params} postDetail={paginationData} />
        </Suspense>
        <div className='flex justify-between items-center mt-4'>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant={"secondary"}
            className='text-slate-900 text-md font-semibold'
          >
            Previous
          </Button>
          <span className='text-slate-900 text-md font-semibold'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= postDetail.length}
            variant={"secondary"}
            className='text-slate-900 text-md font-semibold'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SingleCategory;