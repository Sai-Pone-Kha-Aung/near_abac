"use client"
import { useRouter } from 'next/navigation';
import Card from '../Card/Card';
import useFetchData from '@/hooks/useFetchData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SkeletonCard from '../Card/SkeletonCard';
import { sheetsData } from '@/types/types';

const Feature = () => {
    const {data, error} = useFetchData();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(false);
    }, [data]);

    if(loading) {
      return (
        <SkeletonCard count={1} className='h-screen'/>
      )
    }
    
    const groupedData: Record<string, sheetsData[]> = data.reduce((acc: Record<string, sheetsData[]>, item: any) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
    
    if(error) {
        return <div>Error: {error}</div>
    }

  return (
    <div>
        {Object.entries(groupedData).map(([category, items]) => (
          <div key={category} className='bg-background/80 backdrop-blur-md rounded-lg shadow-lg' data-testid="feature-page">
            <div className='p-6'>
              <h2 className='text-xl font-bold mb-2 cursor-pointer hover:text-2xl transition-all duration-300 ease-in-out' data-testid="feature-title"
              onClick={() => router.push(`/category/${category}`)}
              >
              {category}
              </h2>
            </div>
            <div className='flex flex-row gap-4 m-4 overflow-x-auto'>
                  {items.slice(0, 4).map((item) => (
                    <div key={item.id} className='flex-shrink-0 pb-4' data-testid="feature-card">
                      <Card {...item} />
                    </div>
                  ))}
                  {items.length > 4 && (
                    <div className='flex justify-center items-center'>
                      <Button className='flex justify-center items-center rounded-xl' variant={'outline'} data-testid="feature-view-all">
                        <Link rel='noopener noreferrer' href={`/category/${category}`}>View All</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
          ))}
    </div>

  )
}

export default Feature