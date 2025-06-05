// components/Table/Custom-Table.tsx
import React, { useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PaginationConfig {
    current: number
    total: number
    totalPages: number
    showTotal?: (total: number, range: [number, number]) => string
    onChange: (page: number) => void
    onShowSizeChange?: (current: number, size: number) => void
    pageSize?: number
}

interface TableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
    title?: string
    description?: string
    showAddButton?: boolean
    onAddClick?: () => void
    addButtonText?: string
    searchKey?: string
    searchPlaceholder?: string
    pageSize?: number
    serverSidePagination?: boolean
    paginationConfig?: PaginationConfig
    loading?: boolean
}

const CustomTable = <TData, TValue>({
    columns,
    data,
    title,
    description,
    showAddButton = true,
    onAddClick,
    addButtonText = "Add New",
    searchKey,
    searchPlaceholder = "Search...",
    pageSize,
    serverSidePagination = false,
    paginationConfig,
    loading = false
}: TableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: serverSidePagination ? undefined : getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: serverSidePagination ? undefined : {
                pageSize: paginationConfig?.pageSize || pageSize,
            },
        },
        // Server-side pagination options
        manualPagination: serverSidePagination,
        pageCount: serverSidePagination ? paginationConfig?.totalPages || 0 : undefined,
    })

    return (
        <Card className="w-full">
            <CardHeader>
                <div>
                    <CardTitle className="flex items-center justify-between">
                        {title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        {showAddButton && (
                            <Button onClick={onAddClick} size="sm" className="ml-2">
                                {addButtonText}
                            </Button>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="ml-auto">
                                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter(column => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => {
                                                    column.toggleVisibility(!!value)
                                                }}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {description && <CardDescription>{description}</CardDescription>}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center py-4">
                    {searchKey && (
                        <Input
                            placeholder={searchPlaceholder}
                            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
                            className="max-w-sm"
                        />
                    )}
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-near-purple"></div>
                                            <span>Loading...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Enhanced Pagination Controls */}
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${serverSidePagination ? paginationConfig?.pageSize || 12 : table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                if (serverSidePagination && paginationConfig?.onShowSizeChange) {
                                    paginationConfig.onShowSizeChange(paginationConfig.current, Number(value))
                                } else {
                                    table.setPageSize(Number(value))
                                }
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={serverSidePagination ? paginationConfig?.pageSize || 12 : table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[6, 12, 24, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            {serverSidePagination ? (
                                <>Page {paginationConfig?.current || 1} of {paginationConfig?.totalPages || 1}</>
                            ) : (
                                <>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => {
                                    if (serverSidePagination && paginationConfig?.onChange) {
                                        paginationConfig.onChange(1)
                                    } else {
                                        table.setPageIndex(0)
                                    }
                                }}
                                disabled={serverSidePagination ?
                                    (paginationConfig?.current || 1) <= 1 :
                                    !table.getCanPreviousPage()
                                }
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                    if (serverSidePagination && paginationConfig?.onChange) {
                                        paginationConfig.onChange((paginationConfig.current || 1) - 1)
                                    } else {
                                        table.previousPage()
                                    }
                                }}
                                disabled={serverSidePagination ?
                                    (paginationConfig?.current || 1) <= 1 :
                                    !table.getCanPreviousPage()
                                }
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                    if (serverSidePagination && paginationConfig?.onChange) {
                                        paginationConfig.onChange((paginationConfig.current || 1) + 1)
                                    } else {
                                        table.nextPage()
                                    }
                                }}
                                disabled={serverSidePagination ?
                                    (paginationConfig?.current || 1) >= (paginationConfig?.totalPages || 1) :
                                    !table.getCanNextPage()
                                }
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => {
                                    if (serverSidePagination && paginationConfig?.onChange) {
                                        paginationConfig.onChange(paginationConfig.totalPages || 1)
                                    } else {
                                        table.setPageIndex(table.getPageCount() - 1)
                                    }
                                }}
                                disabled={serverSidePagination ?
                                    (paginationConfig?.current || 1) >= (paginationConfig?.totalPages || 1) :
                                    !table.getCanNextPage()
                                }
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Total Records Info for Server-side Pagination */}
                {serverSidePagination && paginationConfig?.showTotal && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            {paginationConfig.showTotal(
                                paginationConfig.total,
                                [
                                    ((paginationConfig.current - 1) * (paginationConfig.pageSize || 12)) + 1,
                                    Math.min(paginationConfig.current * (paginationConfig.pageSize || 12), paginationConfig.total)
                                ]
                            )}
                        </div>
                    </div>
                )}

                {/* Selection Info */}
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default CustomTable