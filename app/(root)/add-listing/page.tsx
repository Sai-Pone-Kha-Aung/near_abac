"use client"
import React, { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type FormData = {
    title: string;
    category: string;
    description: string;
    image?: File | null;
    distance: string;
}

const Page = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const formData: ZodType<FormData> = z.object({
        title: z.string().min(1, { message: "Title is required" }),
        category: z.string().min(1, { message: "Category is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        image: z.any()
            .refine(
                (file) => {
                    // Check if we're in a browser environment
                    if (typeof window === 'undefined') return true;
                    return file !== null;
                },
                { message: "Image is required" }
            )
            .refine(
                (file) => {
                    // Check if we're in a browser environment
                    if (typeof window === 'undefined') return true;
                    return !file || (file instanceof File && file.size <= 10 * 1024 * 1024);
                },
                { message: "Image size must be less than 10MB" }
            ),
        distance: z.string().min(1, { message: "Distance is required" }),
    })

    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(formData),
        defaultValues: {
            title: '',
            category: '',
            description: '',
            image: null,
            distance: ''
        }
    })

    const selectedImage = watch('image')

    const onSubmit = (data: FormData) => {
        try {
            console.log('Form submitted successfully:', data)

        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setValue('image', e.target.files[0], {
                shouldValidate: true,
            })
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6'>

                    <h1 className='text-3xl font-bold text-gray-900 mb-4'>Add Your Listing</h1>
                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        {/* Form fields will go here */}
                        <div>
                            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title <span className='text-red-600'>*</span></label>
                            <Input type="text" id="title" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter title' {...register('title')} />

                            {errors.title && <p className='text-red-600 text-sm mt-1'>{errors.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>Category <span className='text-red-600'>*</span></label>
                            <Select
                                onValueChange={(value) => setValue('category', value, { shouldValidate: true })}
                            >
                                <SelectTrigger id='category'>
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
                            {errors.category && <p className='text-red-600 text-sm mt-1'>{errors.category.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>Description <span className='text-red-600'>*</span></label>
                            <Textarea
                                id="description"
                                className='min-h-32'
                                placeholder='Provide a detailed description of your listing'
                                {...register('description')}
                            />
                            {errors.description && <p className='text-red-600 text-sm mt-1'>{errors.description.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-1'>Upload Image <span className='text-red-600'>*</span></label>
                            <Input
                                ref={fileInputRef}
                                type="file"
                                className='hidden'
                                accept="image/*"
                                onChange={handleFileChange}
                                id="image"
                            />
                            {errors.image && <p className='text-red-600 text-sm mt-1'>{errors.image.message}</p>}

                            <div
                                onClick={handleFileClick}
                                className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-near-purple transition-colors text-center bg-gray-50 hover:bg-gray-100'
                            >
                                {selectedImage ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(selectedImage)}
                                            alt="Selected"
                                            className='w-32 h-32 object-cover rounded-lg mb-2'
                                        />
                                        <p className="text-sm text-gray-500">Selected: {selectedImage.name}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className='w-6 h-6 mx-auto mb-2 text-gray-500' />
                                        <p className="text-sm text-gray-500">Click to upload an image</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                                    </>
                                )}
                            </div>
                            {errors.image && <p className='text-red-600 text-sm mt-1'>{errors.image.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="distance" className='block text-sm font-medium text-gray-700 mb-1'>Distance from ABAC <span className='text-red-600'>*</span></label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder="e.g., 1.5 km" id='distance' {...register('distance')} />
                            {errors.distance && <p className='text-red-600 text-sm mt-1'>{errors.distance.message}</p>}
                        </div>

                        <div className='pt-4'>
                            <Button className='w-full bg-near-purple text-white hover:bg-near-purple-dark transition-colors' type='submit' >
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