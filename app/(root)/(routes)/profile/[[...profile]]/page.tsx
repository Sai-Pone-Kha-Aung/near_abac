'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { UserProfile } from '@clerk/nextjs'
import { List } from 'lucide-react'
import CustomTable from '@/components/Table/Custom-Table'
import { listings } from '@/constant/data'
import { SortOrder } from 'antd/es/table/interface'


const DotIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    )
}

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a: { id: number }, b: { id: number }) => a.id - b.id, defaultSortOrder: 'ascend' as SortOrder },
    { title: 'Title', dataIndex: 'title', key: 'title' },
]

const Page = () => {
    const { id } = useParams()
    const { user } = useUser()

    return (
        <section className='py-16 md:py-20'>
            <div className='container mx-auto'>
                <div className='flex justify-center items-center '>

                    <UserProfile>
                        <UserProfile.Page label='My Lists' url='/my-lists' labelIcon={<List className='w-4 h-4' />}>
                            <CustomTable columns={columns} dataSource={listings}
                                onAddClick={() => { alert('Add New Listing') }}
                            />
                        </UserProfile.Page>
                    </UserProfile>
                </div>
            </div>
        </section>
    )
}

export default Page