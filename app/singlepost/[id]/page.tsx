"use client"
import { useEffect, useState } from 'react'
import useFetchData from '@/hooks/useFetchData'
import SkeletonCard from '@/components/Card/SkeletonCard'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Link2, MapPin, Phone } from 'lucide-react'
import { sheetsData } from '@/types/types'
import { useRouter } from 'next/navigation'

const SinglePost = ({params} : {params: {id: number}}) => {
  const {data, error} = useFetchData();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const postDetail = data ? data.find((post: sheetsData) => post.id === Number(params.id)) : null;
  
  useEffect(() => {
    setLoading(false);
  }, [data]);
  
  if(error) {
    return <div>Error: {error}</div>
  }
  
  if(loading && !postDetail) {
    return (
      <SkeletonCard count={1} className='h-screen'/>
    )
  }

  return (
    <div className='container min-h-screen  mx-auto flex flex-col items-center justify-center overflow-y-hidden'>
        <div className='bg-background/80 backdrop-blur-md rounded-lg shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8 text-neutral-700 md:px-6' data-testid="single-post">
            <div>
              <Image 
                src={postDetail?.image || ""} 
                alt={postDetail?.name || 'image'}  
                className='rounded-lg w-full h-auto' 
                width={300} 
                height={300} 
                fetchPriority='high'
                loading='lazy'
                sizes="(max-width: 768px) 100vw, 50vw"
                data-testid="single-post-image"
                />
            </div>
            <div>
                <h1 className='text-2xl font-bold text-neutral-900' data-testid="single-post-name">{postDetail?.name}</h1>
                  <div className='flex flex-col gap-4 pt-6 text-neutral-700'>
                      <div>
                          <span className='flex font-bold' data-testid="single-post-category">Category</span>
                          <p className='py-1 break-all cursor-pointer hover:underline'
                            onClick={() => router.push(`/category/${postDetail?.category}`)}
                          >{postDetail?.category}</p>
                      </div>
                      <div>
                          <span className='flex font-bold' data-testid="single-post-desc-title">Description
                            
                          </span>
                          <p className='py-1 break-all' data-testid="single-post-desc">{postDetail?.desc}</p>
                      </div>
                      <span className='flex justify-start items-center text-neutral-400' data-testid="single-post-address">
                        <MapPin className='w-4 h-4 mr-2'/>   {postDetail?.address}
                      </span>
                      <span className='flex justify-start items-center' data-testid="single-post-phone">
                          <Phone className='w-4 h-4 mr-2'/> {postDetail?.phone}
                      </span>
                      <Link href={`https://${postDetail?.url}`} target='_blank' rel="noopener noreferrer"  className='flex justify-start items-center underline hover:text-blue-500' data-testid="single-post-url">
                          <Link2 className='w-4 h-4 mr-2'/>{postDetail?.url}
                      </Link>
                      {postDetail?.hours && <span className='flex justify-start items-center'><Clock className='w-4 h-4 mr-2'/> {postDetail?.hours}</span>}
                  </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default SinglePost