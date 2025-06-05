"use client"
import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
} from 'recharts'

const visitData = [
    { name: 'Mon', visits: 320 },
    { name: 'Tue', visits: 480 },
    { name: 'Wed', visits: 590 },
    { name: 'Thu', visits: 430 },
    { name: 'Fri', visits: 620 },
    { name: 'Sat', visits: 780 },
    { name: 'Sun', visits: 590 },
];

const ChartRenderer = () => {
    return (
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
    )
}

export default ChartRenderer