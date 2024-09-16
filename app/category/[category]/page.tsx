"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { sheetsData } from '@/types/types'
import Card from '@/components/Card/Card'
import useFetchData from '@/hooks/useFetchData'
import SkeletonCard from '@/components/Card/SkeletonCard'

const CategoryPage = ({params} : {params: {category: string}}) => {
  const {data, error} = useFetchData();
  const [loading, setLoading] = useState(true);
  
  const postDetail = useMemo(() => {
    return data.filter((post: sheetsData) => post.category === (params.category));
  }, [data, params.category]); 

  useEffect(() => {
    setLoading(false);
  }, [data]);

  if(loading){
    return (
      <SkeletonCard count={1} className='h-screen'/>
    )
  }

  if(error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='container min-h-screen  mx-auto flex flex-col items-center justify-center overflow-y-hidden mt-6'>
        {loading ? <SkeletonCard count={1} className='h-screen'/> : 
          <div className='bg-background/80 backdrop-blur-md rounded-lg shadow-lg'>
            <p className='p-6 text-2xl font-bold mb-2 cursor-pointer hover:text-2xl transition-all duration-300 ease-in-out ' data-testid="category-title">{params.category}</p>
            <div className={`flex ${postDetail.length === 1 ? 'justify-center' : postDetail.length === 2 ? 'justify-start' : 'justify-center'} flex-wrap gap-8 p-8 text-neutral-700 md:px-6`}>
            {postDetail.map((item) => (
              <Card key={item.id} {...item}  data-testid="category-card"/>
            ))}
          </div>
        </div>
        }
      </div>

  )
}

export default CategoryPage