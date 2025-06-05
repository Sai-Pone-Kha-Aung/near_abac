'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { UserProfile } from '@clerk/nextjs'
import { ArrowUpDown, Calendar, Edit, List, Trash2 } from 'lucide-react'
import CustomTable from '@/components/Table/Custom-Table'
import { usePaginationListingsByUserId } from '@/hooks/usePaginationListings'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Listing } from '@/types/types'

const ProfilePageComponent = () => {
    const { user } = useUser()
    const router = useRouter();
    const { listings, loading, error, pagination, setPage } = usePaginationListingsByUserId(user?.id as string);
    const handlePageChange = (newPage: number) => {
        // Logic to handle page change
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const paginationConfig = {
        current: pagination.page,
        total: pagination.total,
        totalPages: pagination.totalPages,
        pageSize: pagination.limit,
        showTotal: (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} of ${total} items`,
        onChange: handlePageChange,
        onShowSizeChange: (current: number, size: number) => {
            console.log('Page size changed:', current, size);
        }
    };


    const columns: ColumnDef<Listing>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const listing = row.original
                return (
                    <div className="font-medium cursor-pointer hover:text-near-purple"
                        onClick={() => router.push(`/listing/${listing.id}`)}>
                        {listing.name}
                    </div>
                )
            },
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => {
                const category = row.getValue("category") as string
                return (
                    <div className="text-sm text-gray-600 capitalize">
                        {category.replace('-', ' ')}
                    </div>
                )
            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Created
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"))
                return (
                    <div className="text-sm text-gray-600">
                        {date.toLocaleDateString()}
                    </div>
                )
            },
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                const description = row.getValue("description") as string
                return (
                    <div className="max-w-[200px] truncate text-sm text-gray-600">
                        {description}
                    </div>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const listing = row.original
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/edit-listing/${listing.id}`)}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                // Handle delete
                                console.log('Delete listing:', listing.id)
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]

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

                                <CustomTable
                                    columns={columns}
                                    data={listings}
                                    title="Listings"
                                    description="Manage all listings"
                                    showAddButton={false}
                                    searchKey="name"
                                    searchPlaceholder="Search listings..."
                                    pageSize={12}
                                    serverSidePagination={true}
                                    paginationConfig={paginationConfig}

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