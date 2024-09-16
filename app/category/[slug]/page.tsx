"use client"
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { sheetsData } from '@/types/types';
import getSheetsData from '@/actions/getSheetsData';
import SkeletonCard from '@/components/Card/SkeletonCard';
import CategoryContent from '@/components/Category/CategoryContent';

const SingleCategory = ({ params }: { params: { slug: string } }) => {
  const { data, error } = getSheetsData();
  const [loading, setLoading] = useState(true);

  const postDetail = useMemo(() => {
    return (data ?? []).filter((post: sheetsData) => post.category === params.slug);
  }, [data, params.slug]);

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
          <CategoryContent params={params} postDetail={postDetail} />
        </Suspense>
      </div>
    </div>
  );
};
export default SingleCategory;