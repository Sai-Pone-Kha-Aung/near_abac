"use client"
import React, { Suspense, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/hooks/useUser'
import { usePaginationListings } from '@/hooks/usePaginationListings'
import { useListingColumns } from '@/components/Dashboard/hooks/useListingColumns'
import dynamic from 'next/dynamic'

const CardSkeleton = ({ height = "h-80" }: { height?: string }) => (
    <Card>
        <CardHeader>
            <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </CardHeader>
        <CardContent>
            <div className={`${height} bg-gray-300 rounded animate-pulse`}></div>
        </CardContent>
    </Card>
)

const ListingSkeleton = () => (
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

const AnalyticsTab = dynamic(() => import('@/components/Dashboard/components/AnalyticsTab'), {
    ssr: false,
    loading: () => <CardSkeleton />
})

const ListingsTab = dynamic(() => import('@/components/Dashboard/components/ListingTab'), {
    ssr: false,
    loading: () => <ListingSkeleton />
})

const UsersTab = dynamic(() => import('@/components/Dashboard/components/UserTab'), {
    ssr: false,
    loading: () => <CardSkeleton height="h-32" />
})

type OverviewCardProps = {
    title: string
    subtitle: string
    value: number
    review: string
}

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
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('analytics')

    // Only load data for active tabs
    const shouldLoadListings = activeTab === 'listings'
    const shouldLoadUsers = activeTab === 'users'

    // Conditionally load hooks based on active tab
    const {
        listings,
        pagination,
        setPage,
        loading: listingsLoading
    } = usePaginationListings(undefined, 12, shouldLoadListings)

    const {
        data: users,
        isLoading: loading,
        isError: error,
        refetch
    } = useUsers(shouldLoadUsers)

    const listingColumns = useListingColumns()

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
            console.log('Page size changed:', current, size)
        }
    }

    if (error) {
        return <div className='container mx-auto px-4 py-8 text-red-500'>Error loading users: {error}</div>
    }

    const handleRefresh = () => {
        refetch()
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
                        <Button
                            size="sm"
                            className='bg-near-purple text-white rounded-md px-4 py-2 flex items-center gap-2'
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

                <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-8'>
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
                        <Suspense fallback={
                            <CardSkeleton />
                        }>
                            <AnalyticsTab />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value='listings'>
                        <Suspense fallback={
                            <ListingSkeleton />
                        }>
                            <ListingsTab
                                listings={listings}
                                paginationConfig={paginationConfig}
                                listingColumns={listingColumns}
                            />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value='users'>
                        <Suspense fallback={
                            <CardSkeleton />
                        }>
                            <UsersTab
                                users={users || []}
                                loading={loading}
                                onRefresh={handleRefresh}
                            />
                        </Suspense>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminDashboard