"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import { ColumnDef } from '@tanstack/react-table'
import { Listing } from '@/types/types'

const CustomTable = dynamic(() => import('@/components/Table/Custom-Table'), {
    ssr: false,
    loading: () => (
        <div className="p-6">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-6 w-1/3"></div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    )
})

interface ListingsTabProps {
    listings: Listing[]
    paginationConfig: any
    listingColumns: ColumnDef<Listing>[]
}

const ListingsTab: React.FC<ListingsTabProps> = ({
    listings,
    paginationConfig,
    listingColumns
}) => {
    return (
        <div>
            <CustomTable
                columns={listingColumns as ColumnDef<unknown, unknown>[]}
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
        </div>
    )
}

export default ListingsTab