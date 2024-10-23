"use client"
import React, { Suspense, useEffect, useState, lazy } from 'react'
import SkeletonCard from '@/components/Card/SkeletonCard'
import { sheetsData } from '@/types/types'
import getSheetsData from '@/actions/getSheetsData';
const SingleItem = lazy(() => import('@/components/SingleItem/SingleItem'));

const SinglePost = ({ params }: { params: { id: number } }) => {
  const { data, error } = getSheetsData();
  const [loading, setLoading] = useState(true);
  const postDetail = data ? data.find((post: sheetsData) => post.id === Number(params.id)) : null;

  useEffect(() => {
    setLoading(false);
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>
  }

  if (loading && !postDetail) {
    return (
      <SkeletonCard count={1} className='h-screen' />
    )
  }

  return (
    <div className='container min-h-screen mx-auto flex flex-col items-center justify-center'>
      <Suspense fallback={<SkeletonCard count={1} className='h-screen' />}>
        <SingleItem {...postDetail!} />
      </Suspense>
    </div>
  )
}
export default SinglePost