"use client"
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for better code splitting
const AddListingForm = dynamic(() => import('./AddListingForm'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                    <div className="h-10 bg-gray-300 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

const AddListing = () => {
    return (
        <Suspense fallback={
            <div className="flex flex-col">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-300 rounded mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-6"></div>
                            <div className="space-y-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                        <div className="h-10 bg-gray-300 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <AddListingForm />
        </Suspense>
    )
}

export default AddListing