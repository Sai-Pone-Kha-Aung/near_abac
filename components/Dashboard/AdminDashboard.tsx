"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coffee, Home, ListFilter, Plus, RefreshCcw, Trash, Utensils } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts'
import Table from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/hooks/useUser'
import { usePaginationListings } from '@/hooks/usePaginationListings'

const ResponsiveContainer = dynamic(() =>
    import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false }
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

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', defaultSortOrder: 'ascend' as SortOrder, sorter: (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id) },
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', defaultSortOrder: 'descend' as SortOrder, sorter: (a: { created_at: string }, b: { created_at: string }) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime() },
    { title: 'Updated At', dataIndex: 'updated_at', key: 'updated_at', defaultSortOrder: 'descend' as SortOrder, sorter: (a: { updated_at: string }, b: { updated_at: string }) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime() },
    {
        title: 'Actions',
        key: 'actions',
        render: (text: any, record: { id: string }) => (
            <Button size="sm" variant="destructive" onClick={() => console.log(`Delete user ${record.id}`)}>
                <Trash className='w-4 h-4' />
            </Button>
        )
    }
]

const listingsColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        defaultSortOrder: 'ascend' as SortOrder,
        sorter: (a: { id: string }, b: { id: string }) => {
            const numA = parseInt(String(a.id || '0'));
            const numB = parseInt(String(b.id || '0'));
            return numA - numB;
        }
    },
    { title: 'User ID', dataIndex: 'user_id', key: 'user_id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Google Map Link', dataIndex: 'google_map_link', key: 'google_map_link' },
    { title: 'Line ID', dataIndex: 'line_id', key: 'line_id' },
    { title: 'Facebook URL', dataIndex: 'facebook_url', key: 'facebook_url' },
    { title: 'Instagram URL', dataIndex: 'instagram_url', key: 'instagram_url' },
    { title: 'Image URL', dataIndex: 'img_url', key: 'img_url' },
    { title: 'Distance', dataIndex: 'distance', key: 'distance' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', defaultSortOrder: 'descend' as SortOrder, sorter: (a: { created_at: string }, b: { created_at: string }) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime() },
    { title: 'Updated At', dataIndex: 'updated_at', key: 'updated_at', defaultSortOrder: 'descend' as SortOrder, sorter: (a: { updated_at: string }, b: { updated_at: string }) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime() },
]


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
    const { listings, pagination, setPage } = usePaginationListings();
    const { data: users, isLoading: loading, isError: error, refetch } = useUsers();

    const handlePageChange = (newPage: number) => {
        // Logic to handle page change
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const paginationConfig = {
        current: pagination.page,
        total: pagination.total,
        totalPages: pagination.totalPages,
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
                        <Card>
                            <CardHeader className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                                <div >
                                    <CardTitle className='mb-1'>All Listings</CardTitle>
                                    <CardDescription>
                                        Manage all listings
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent >
                                <div className='flex flex-col overflow-x-auto p-6'>
                                    <Table
                                        columns={listingsColumns}
                                        dataSource={listings}
                                        showSorterTooltip={{ target: 'sorter-icon' }}
                                        pagination={{ ...paginationConfig }}
                                        rowKey="id"
                                        scroll={{ x: 'max-content' }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
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
                                ) : (<Table columns={columns} dataSource={users} showSorterTooltip={{ target: 'sorter-icon' }} />)}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminDashboard