import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import type { Card as CardType } from '@/types/types'
import CustomImage from '@/components/CustomImage'
import { Link } from 'next-view-transitions'
import { LinkIcon } from '@/public/Icon'
import { useRouter } from 'next/navigation'

const Card = (Card: CardType) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/singlepost/${Card.id}`);
    }, [Card.id, router]);
    return (
        <div className='flex flex-col rounded-2xl w-[320px] sm:w-96 bg-[#ffffff] shadow-lg hover:shadow-xl transition-shadow duration-300 h-[550px] sm:h-[620px]' data-testid="card">
            <div className='flex justify-center items-center h-[250px] sm:h-[300px] overflow-hidden rounded-t-2xl ' data-testid="card-image">
                <CustomImage
                    path={Card.image}
                    alt={Card.name}
                    width={384}
                    height={300}
                />
            </div>
            <h1 className='p-6 text-2xl font-bold text-neutral-900' data-testid="card-name">
                {Card.name}
            </h1>
            <div className='flex flex-col px-6 pt-4 gap-2 flex-grow'>
                <div className='flex flex-col gap-2 text-neutral-700' data-testid="card-phone">
                    <div className='space-y-4'>
                        {Card.instagram && <Link href={`https://${Card.instagram}`} target='_blank' rel="preconnect noopener noreferrer" className='flex justify-start items-center hover:underline hover:text-blue-500 cursor-pointer break-all gap-2' data-testid="card-url">
                            <LinkIcon />
                            {Card.instagram}
                        </Link>}
                    </div>
                </div>
            </div>
            <div className='relative flex bottom-0 justify-center items-center pb-10 px-4'>
                <Button className="bg-[#7e22ce] text-[#ffffff] w-full font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform" data-testid="card-button"
                    onClick={handleClick}
                >
                    See More
                </Button>
            </div>
        </div>
    )
}

export default Card