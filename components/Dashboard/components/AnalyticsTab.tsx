'use client'
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from "next/dynamic"

const WeeklyVisitsChart = dynamic(() => import('@/components/Dashboard/components/WeeklyVisitsChart'), {
    ssr: false,
    loading: () => (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle className="animate-pulse bg-gray-300 h-6 w-1/3 mb-2"></CardTitle>
                <CardDescription className="animate-pulse bg-gray-200 h-4 w-1/4"></CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
                <div className="animate-pulse bg-gray-300 w-full h-full rounded-lg"></div>
            </CardContent>
        </Card>
    )

})

const AnalyticsTab = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Visits</CardTitle>
                    <CardDescription>Track your weekly visits</CardDescription>
                </CardHeader>
                <CardContent>
                    <WeeklyVisitsChart />
                </CardContent>
            </Card>
        </div>
    )
}

export default AnalyticsTab