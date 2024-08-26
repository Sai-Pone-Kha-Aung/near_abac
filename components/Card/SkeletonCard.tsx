import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonCardProps {
  count?: number;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex flex-col rounded-2xl w-96 bg-[#ffffff] shadow-lg p-8 mx-auto mb-4'>
          <Skeleton className='h-[300px] w-full mb-4' />
          <Skeleton className='h-6 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/2 mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/2 mb-2' />
          <Skeleton className='h-10 w-full' />
        </div>
      ))}
    </div>
  )
}

export default SkeletonCard