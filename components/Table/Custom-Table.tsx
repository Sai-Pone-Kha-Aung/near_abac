import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Table } from 'antd'
import { SortOrder } from 'antd/es/table/interface'

type ColumnsType = {
    title: string
    dataIndex: string
    key: string
    defaultSortOrder?: SortOrder
    sorter?: (a: { id: number }, b: { id: number }) => number
}

interface TableProps {
    columns: ColumnsType[],
    dataSource: any[],
    title?: string,
    description?: string,
    showAddButton?: boolean,
    onAddClick?: () => void,
    addButtonText?: string,
}

const CustomTable = ({ columns, dataSource, title, description, showAddButton, onAddClick, addButtonText }: TableProps) => {
    return (
        <>
            <Card>
                <CardHeader className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                    <div className='mb-2 md:mb-0'>
                        <CardTitle className='mb-1'>{title || 'Dashboard'}</CardTitle>
                        <CardDescription>
                            {description || 'Manage'}
                        </CardDescription>
                    </div>
                    <Button size="sm" variant='outline' onClick={onAddClick}>
                        <PlusIcon className='w-4 h-4 mr-2' />
                        {addButtonText || 'Add New'}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table columns={columns} dataSource={dataSource} showSorterTooltip={{ target: 'sorter-icon' }} />
                </CardContent>
            </Card>
        </>

    )
}

export default CustomTable