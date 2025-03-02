import React, { useMemo } from 'react'
import Link from 'next/link'
import { SingleItem as Item } from '@/types/types'
import { useRouter } from 'next/navigation'
import CustomImage from '@/components/CustomImage'
import { AddressIcon, LineIcon, LinkIcon, PhoneIcon } from '@/public/Icon'
const SingleItem = (props: Item) => {
  const memoizedProps = useMemo(() => props, [props]);

  const router = useRouter();
  return (
    <div className='px-4 md:px-0'>
      <div className='bg-background/80 backdrop-blur-md rounded-lg shadow-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8 text-neutral-700 md:px-6' data-testid="single-post">
          <div className='flex justify-center items-center overflow-hidden rounded-2xl h-full' data-testid="single-post-image">
            {memoizedProps.image && (<CustomImage
              path={memoizedProps.image}
              alt={memoizedProps.name}
              width={400}
              height={300}
              priority={true}
            />)}

            {!memoizedProps.image && (<CustomImage
              path={'./default.png'}
              alt={'default'}
              height={300}
              width={400}
              priority={true}
            />)}


          </div>
          <div>
            <h1 className='text-2xl font-bold text-neutral-900' data-testid="single-post-name">{memoizedProps?.name}</h1>
            <div className='flex flex-col gap-4 pt-6 text-neutral-700'>
              <div>
                <h2 className='flex text-xl font-bold text-neutral-800' data-testid="single-post-category">Category</h2>
                <p className='py-1 break-all cursor-pointer hover:underline'
                  onClick={() => router.push(`/category/${memoizedProps?.category}`)}
                >{memoizedProps?.category}</p>
              </div>
              {memoizedProps.address && <p className='flex justify-start items-center text-neutral-700 gap-1' data-testid="single-post-address">
                <AddressIcon />
                {memoizedProps?.address}
              </p>}
              {memoizedProps.phone && <p className='flex justify-start items-center gap-1' data-testid="single-post-phone">
                <PhoneIcon />
                {memoizedProps?.phone}
              </p>}
              {memoizedProps?.instagram && <Link href={`https://${memoizedProps?.instagram}`} target='_blank' rel="noopener noreferrer" className='flex justify-start items-center underline hover:text-blue-500 gap-2' data-testid="single-post-url">
                <LinkIcon />
                {memoizedProps?.instagram}
              </Link>}
              {memoizedProps?.facebook && <Link href={`https://${memoizedProps?.facebook}`} target='_blank' rel="noopener noreferrer" className='flex justify-start items-center underline hover:text-blue-500 gap-2' data-testid="single-post-url">
                <LinkIcon />
                {memoizedProps?.facebook}
              </Link>}
              {memoizedProps?.google_map_link && <Link href={`https://${memoizedProps?.google_map_link}`} target='_blank' rel="noopener noreferrer" className='flex justify-start items-center underline hover:text-blue-500 gap-2' data-testid="single-post-url">
                <LinkIcon />
                {memoizedProps?.google_map_link}
              </Link>}
              {memoizedProps?.line_id && <span className='flex justify-start items-center hover:text-blue-500 gap-2' data-testid="single-post-url">
                <LineIcon />
                {memoizedProps?.line_id}
              </span>}


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleItem