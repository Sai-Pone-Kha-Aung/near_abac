"use client"
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Edit, Eye } from 'lucide-react'
import { Listing } from '@/types/types'
import { useRouter } from 'next/navigation'

export const useListingColumns = () => {
    const router = useRouter()

    const listingColumns: ColumnDef<Listing>[] = useMemo(() => [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const listing = row.original
                return (
                    <div
                        className="font-medium cursor-pointer hover:text-near-purple"
                        onClick={() => router.push(`/listing/${listing.id}`)}
                    >
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
                    <>
                        {category.replace('-', ' ')}
                    </>
                )
            },
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="max-w-[200px] truncate">
                    {row.getValue("description")}
                </div>
            ),
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => (
                <div className="max-w-[150px] truncate">
                    {row.getValue("address")}
                </div>
            ),
        },
        {
            accessorKey: "distance",
            header: "Distance",
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"))
                return date.toLocaleDateString()
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
                            onClick={() => router.push(`/listing/${listing.id}`)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/edit-listing/${listing.id}`)}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ], [router])

    return listingColumns
}