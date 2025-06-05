"use client"
import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(
    () => import('@/components/Dashboard/components/ChartRenderer'),
    {
        ssr: false,
        loading: () => <div className="h-80 flex items-center justify-center">Loading chart...</div>
    }
);

const WeeklyVisitsChart = () => {
    return <Chart />;
}

export default WeeklyVisitsChart