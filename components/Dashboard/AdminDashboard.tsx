"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Edit, Eye, Plus, RefreshCcw, Trash } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/hooks/useUser'
import { usePaginationListings } from '@/hooks/usePaginationListings'
import CustomTable from '@/components/Table/Custom-Table'
import { ColumnDef } from '@tanstack/react-table'
import { Listing } from '@/types/types'

const ResponsiveContainer = dynamic(() =>
    import('recharts').then((mod) => mod.ResponsiveContainer), {
    ssr: false
}
);
const BarChart = dynamic(() =>
    import('recharts').then((mod) => mod.BarChart), { ssr: false }
);

type OverviewCardProps = {
    title: string
    subtitle: string
    value: number
    review: string
}

// Mock data 

const visitData = [
    { name: 'Mon', visits: 320 },
    { name: 'Tue', visits: 480 },
    { name: 'Wed', visits: 590 },
    { name: 'Thu', visits: 430 },
    { name: 'Fri', visits: 620 },
    { name: 'Sat', visits: 780 },
    { name: 'Sun', visits: 590 },
];

const overview_card: OverviewCardProps[] = [
    {
        title: "Total Listings",
        subtitle: "All Categories",
        value: 120,
        review: "+12% from last month"
    },
    {
        title: "Active Users",
        subtitle: "Registered accounts",
        value: 100,
        review: "+8% from last month"
    },
    {
        title: "Page Views",
        subtitle: "Total views",
        value: 20,
        review: "+5% from last week"
    }
]


const AdminDashboard = () => {
    const router = useRouter();
    const { listings, pagination, setPage, loading: listingsLoading } = usePaginationListings();
    const { data: users, isLoading: loading, isError: error, refetch } = useUsers();
    const listingColumns: ColumnDef<Listing>[] = [
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
                    //   <Badge variant="outline" className="capitalize">
                    //     {category.replace('-', ' ')}
                    //   </Badge>
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
    ]
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


    if (error) {
        return <div className='container mx-auto px-4 py-8 text-red-500'>Error loading users: {error}</div>;
    }

    const handleRefresh = () => {
        refetch();
    }

    return (
        <div className='flex flex-col bg-white'>
            <div className='flex-grow container mx-auto px-4 py-8 mt-8'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Admin Dashboard</h1>
                        <p className='text-sm text-gray-500'>Manage your listings and analytics</p>
                    </div>
                    <div className='mt-4 md:mt-0'>
                        <Button size="sm" className='bg-near-purple text-white rounded-md px-4 py-2 flex items-center gap-2'
                            onClick={() => router.push('/add-listing')}
                        >
                            <Plus className='w-4 h-4' />
                            Add New Listing
                        </Button>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    {overview_card.map((card, index) => (
                        <Card key={index}>
                            <CardHeader className='pb-2'>
                                <CardTitle className='text-lg'>
                                    {card.title}
                                </CardTitle>
                                <CardDescription>
                                    {card.subtitle}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='text-3xl font-bold'>{card.value}</div>
                                <p className='text-sm text-green-600'>{card.review}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue='analytics' className='mb-8'>
                    <TabsList className='mb-6'>
                        <TabsTrigger value='analytics'>
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger value='listings'>
                            Listings
                        </TabsTrigger>
                        <TabsTrigger value='users'>
                            Users
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='analytics'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Visits</CardTitle>
                                <CardDescription>
                                    Numbers of visits per day
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='h-80'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={visitData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="visits" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value='listings'>
                        <div>
                            <CustomTable
                                columns={listingColumns}
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
                    </TabsContent>
                    <TabsContent value='users'>
                        <Card>
                            <CardHeader className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                                <div className='mb-2 md:mb-0'>
                                    <CardTitle className='mb-1'>All Users</CardTitle>
                                    <CardDescription>
                                        Manage all users
                                    </CardDescription>
                                </div>
                                <Button size="sm" variant='outline' onClick={handleRefresh}>
                                    <RefreshCcw className='w-4 h-4 mr-2' />
                                    Refresh Users
                                </Button>
                            </CardHeader>
                            <CardContent className='overflow-x-auto'>
                                {loading ? (
                                    <div className='container mx-auto px-4 py-8'>
                                        <div className='flex items-center justify-center h-screen'>
                                            <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
                                        </div>
                                        <p className='text-center text-gray-500'>Loading ...</p>
                                    </div>
                                ) : (<>
                                    Table
                                </>)}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminDashboard