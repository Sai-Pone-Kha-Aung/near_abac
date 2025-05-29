import dynamic from 'next/dynamic'
import React from 'react'
const AdminDashboard = dynamic(() => import('@/components/Dashboard/AdminDashboard'), {
    loading: () =>
        <div className='min-h-screen flex items-center justify-center gap-2'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
            <p className='text-center text-gray-500'>Loading listing...</p>
        </div>,
    ssr: false,
})
const Page = () => {
    return (
        <>
            <AdminDashboard />
        </>
    )
}

export default Page