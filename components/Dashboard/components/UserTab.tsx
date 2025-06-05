"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import dynamic from 'next/dynamic'

const UsersTable = dynamic(() => import('@/components/Dashboard/components/UsersTable'), {
    ssr: false,
    loading: () => (
        <div className='container mx-auto px-4 py-8'>
            <div className='flex items-center justify-center h-32'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
            </div>
            <p className='text-center text-gray-500'>Loading users...</p>
        </div>
    )
})

interface UsersTabProps {
    users: any[]
    loading: boolean
    onRefresh: () => void
}

const UsersTab: React.FC<UsersTabProps> = ({ users, loading, onRefresh }) => {
    return (
        <Card>
            <CardHeader className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div className='mb-2 md:mb-0'>
                    <CardTitle className='mb-1'>All Users</CardTitle>
                    <CardDescription>
                        Manage all users
                    </CardDescription>
                </div>
                <Button size="sm" variant='outline' onClick={onRefresh}>
                    <RefreshCcw className='w-4 h-4 mr-2' />
                    Refresh Users
                </Button>
            </CardHeader>
            <CardContent className='overflow-x-auto'>
                {loading ? (
                    <div className='container mx-auto px-4 py-8'>
                        <div className='flex items-center justify-center h-32'>
                            <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
                        </div>
                        <p className='text-center text-gray-500'>Loading...</p>
                    </div>
                ) : (
                    <UsersTable users={users} />
                )}
            </CardContent>
        </Card>
    )
}

export default UsersTab