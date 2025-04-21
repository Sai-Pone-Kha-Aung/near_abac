"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coffee, Home, ListFilter, Plus, PlusIcon, Utensils } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts'
import { Table } from 'antd'
import { SortOrder } from 'antd/es/table/interface';


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

const categoryData = [
    { name: 'Apartments', count: 48, icon: <Home className="h-5 w-5" /> },
    { name: 'Cafes', count: 32, icon: <Coffee className="h-5 w-5" /> },
    { name: 'Bakeries', count: 24, icon: <Utensils className="h-5 w-5" /> },
];

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', defaultSortOrder: 'ascend' as SortOrder, sorter: (a: { id: number }, b: { id: number }) => a.id - b.id },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
]

const userData = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com' },
]

export const overview_card: OverviewCardProps[] = [
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

const Page = () => {
    return (
        <div className='flex flex-col bg-white'>
            <div className='flex-grow container mx-auto px-4 py-8 mt-8'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Admin Dashboard</h1>
                        <p className='text-sm text-gray-500'>Manage your listings and analytics</p>
                    </div>
                    <div className='mt-4 md:mt-0'>
                        <Button size="sm" className='bg-near-purple text-white rounded-md px-4 py-2 flex items-center gap-2'>
                            <Plus className='w-4 h-4' />
                            Add New Listing
                        </Button>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    {overview_card.map((card) => (
                        <Card key={card.title}>
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
                                <Button size="sm" variant='outline'>
                                    <ListFilter className='w-4 h-4 mr-2' />
                                    View All Listings
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                        {categoryData.map((category) => (
                                            <Card key={category.name}>
                                                <CardHeader className='pb-2'>
                                                    <div className='flex items-center'>
                                                        {category.icon}
                                                        <CardTitle className='text-lg ml-2'>{category.name}</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className='text-2xl font-bold'>{category.count}</div>
                                                    <div className='flex justify-between items-center mt-4'>
                                                        <Button variant="outline" size="sm">View All</Button>
                                                        <Button variant="outline" size="sm">Add New</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
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
                                <Button size="sm" variant='outline'>
                                    <PlusIcon className='w-4 h-4 mr-2' />
                                    Add New User
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table columns={columns} dataSource={userData} showSorterTooltip={{ target: 'sorter-icon' }} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Page