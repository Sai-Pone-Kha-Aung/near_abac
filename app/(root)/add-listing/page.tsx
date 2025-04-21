"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

const Page = () => {
    return (
        <div className='flex flex-col'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6'>

                    <h1 className='text-3xl font-bold text-gray-900 mb-4'>Add Your Listing</h1>
                    <form className='space-y-4'>
                        {/* Form fields will go here */}
                        <div>
                            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title <span className='text-red-600'>*</span></label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter title' />
                        </div>

                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Category <span className='text-red-600'>*</span></label>
                            <Select
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="condo">Condo</SelectItem>
                                    <SelectItem value="restaurant">Restaurant</SelectItem>
                                    <SelectItem value="cafe">Cafe</SelectItem>
                                    <SelectItem value="bakery">Bakery</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="entertainment">Entertainment</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>Description <span className='text-red-600'>*</span></label>
                            <Textarea
                                id="description"
                                className='min-h-32'
                                placeholder='Provide a detailed description of your listing'
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-1'>Upload Image <span className='text-red-600'>*</span></label>
                            <Input
                                ref={() => { }}
                                type="file"
                                className='hidden'
                                accept="image/*"
                                onChange={(e) => { console.log(e.target.files) }}
                            />

                            <div
                                onClick={() => { }}
                                className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-near-purple transition-colors text-center bg-gray-50 hover:bg-gray-100'
                            >
                                <>
                                    <Upload className='w-6 h-6 mx-auto mb-2 text-gray-500' />
                                    <p className="text-sm text-gray-500">Click to upload an image</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                                </>
                            </div>

                        </div>
                        <div>
                            <label htmlFor="distance" className='block text-sm font-medium text-gray-700 mb-1'>Distance from ABAC <span className='text-red-600'>*</span></label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder="e.g., 1.5 km" />
                        </div>

                        <div className='pt-4'>
                            <Button className='w-full bg-near-purple text-white hover:bg-near-purple-dark transition-colors'>
                                Submit Listing
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page