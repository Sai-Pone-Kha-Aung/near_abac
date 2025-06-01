'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { UserProfile } from '@clerk/nextjs'
import { List } from 'lucide-react'
import { SortOrder } from 'antd/es/table/interface';
import CustomTable from '@/components/Table/Custom-Table'
import { usePaginationListingsByUserId } from '@/hooks/usePaginationListings'

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', defaultSortOrder: 'descend' as SortOrder, sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime() },
]

const ProfilePageComponent = () => {
    const { user } = useUser()
    const router = useRouter();
    const { listings, loading, error } = usePaginationListingsByUserId(user?.id as string);
    if (error) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='flex items-center justify-center h-screen'>
                    <div className='text-red-500 text-lg'>{error}</div>
                </div>
            </div>
        )
    }
    return (
        <section className='py-16 md:py-20'>
            <div className='container mx-auto'>
                <div className='flex justify-center items-center '>

                    <UserProfile>
                        <UserProfile.Page label='My Lists' url='/my-lists' labelIcon={<List className='w-4 h-4' />}>
                            {loading ? (
                                <div className='container mx-auto px-4 py-8'>
                                    <div className='flex items-center justify-center h-screen'>
                                        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
                                    </div>
                                    <p className='text-center text-gray-500'>Loading ...</p>
                                </div>
                            ) : (

                                <CustomTable columns={columns} dataSource={listings}
                                    onAddClick={() => { router.push('/add-listing') }}
                                />
                            )}
                        </UserProfile.Page>
                    </UserProfile>
                </div>
            </div>
        </section>
    )
}

export default ProfilePageComponent