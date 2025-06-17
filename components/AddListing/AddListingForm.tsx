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
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { APIError, handleAPIError } from '@/utils/api-error'
import { useCreateListing } from '@/hooks/useCreateListing'

// Dynamically import toast to reduce bundle size
const showToast = async (message: string, type: 'success' | 'error' = 'success') => {
    const { toast, ToastContainer } = await import('react-toastify')
    const { createRoot } = await import('react-dom/client')

    // Ensure ToastContainer exists
    let toastContainer = document.getElementById('toast-root')
    if (!toastContainer) {
        toastContainer = document.createElement('div')
        toastContainer.id = 'toast-root'
        document.body.appendChild(toastContainer)
        const root = createRoot(toastContainer)
        root.render(<ToastContainer />)
    }

    return type === 'success'
        ? toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
        : toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
}

// Form data type
type FormData = {
    name: string;
    category: string;
    address: string;
    description: string;
    phone?: string;
    facebook_url?: string;
    instagram_url?: string;
    google_map_link?: string;
    line_id?: string;
    img_url?: File | null;
    distance?: string;
}

// Form validation schema - create as function to avoid issues with dynamic imports
const createFormSchema = () => z.object({
    name: z.string().min(1, { message: "Name is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    phone: z.string().optional(),
    facebook_url: z.string().optional(),
    instagram_url: z.string().optional(),
    google_map_link: z.string().optional(),
    line_id: z.string().optional(),
    img_url: z.any()
        .refine(
            (file) => {
                if (typeof window === 'undefined') return true;
                return !file || (file instanceof File && file.size <= 10 * 1024 * 1024);
            },
            { message: "Image size must be less than 10MB" }
        ).optional(),
    distance: z.string().optional(),
})

const AddListingForm = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter();
    const createListingMutation = useCreateListing();
    const isSubmitting = createListingMutation.isPending;

    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(createFormSchema()),
        defaultValues: {
            name: '',
            category: '',
            address: '',
            description: '',
            phone: '',
            facebook_url: '',
            instagram_url: '',
            google_map_link: '',
            line_id: '',
            img_url: null,
            distance: ''
        }
    })

    const selectedImage = watch('img_url')

    const onSubmit = async (data: FormData) => {
        try {
            const result = await createListingMutation.mutateAsync(data);

            console.log('Form submitted successfully:', result);
            await showToast('Listing created successfully!', 'success');

            setTimeout(() => {
                router.push(`/listing/${result.data.id}`);
            }, 3000);

        } catch (error) {
            const errorMessage = error instanceof APIError ? error.message : 'An unexpected error occurred';
            handleAPIError(errorMessage);
            await showToast(errorMessage, 'error');
            console.error('Error submitting form:', error);
        }
    }

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setValue('img_url', e.target.files[0], {
                shouldValidate: true,
            })
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-4'>Add Your Listing</h1>
                    <p className='text-gray-600 mb-6'>Please fill out the form below to add your listing.</p>

                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>
                                Name <span className='text-red-600'>*</span>
                            </label>
                            <Input
                                type="text"
                                id="name"
                                className='w-full border border-gray-300 rounded-md p-2 mt-1'
                                placeholder='Enter name'
                                {...register('name')}
                            />
                            {errors.name && <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>}
                        </div>

                        {/* Category Field */}
                        <div>
                            <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>
                                Category <span className='text-red-600'>*</span>
                            </label>
                            <Select onValueChange={(value) => setValue('category', value, { shouldValidate: true })}>
                                <SelectTrigger id='category'>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apartment-condo">Apartment-condo</SelectItem>
                                    <SelectItem value="restaurant">Restaurant</SelectItem>
                                    <SelectItem value="cafe">Cafe</SelectItem>
                                    <SelectItem value="bakery">Bakery</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="entertainment">Entertainment</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.category && <p className='text-red-600 text-sm mt-1'>{errors.category.message}</p>}
                        </div>

                        {/* Address Field */}
                        <div>
                            <label htmlFor="address" className='block text-sm font-medium text-gray-700 mb-1'>
                                Address <span className='text-red-600'>*</span>
                            </label>
                            <Textarea
                                id="address"
                                className='min-h-32'
                                placeholder='Provide a detailed address of your listing'
                                {...register('address')}
                            />
                            {errors.address && <p className='text-red-600 text-sm mt-1'>{errors.address.message}</p>}
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>
                                Description <span className='text-red-600'>*</span>
                            </label>
                            <Textarea
                                id="description"
                                className='min-h-32'
                                placeholder='Provide a detailed description of your listing'
                                {...register('description')}
                            />
                            {errors.description && <p className='text-red-600 text-sm mt-1'>{errors.description.message}</p>}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                            <Input
                                type="text"
                                className='w-full border border-gray-300 rounded-md p-2 mt-1'
                                placeholder='Enter phone number'
                                id='phone'
                                {...register('phone')}
                            />
                            {errors.phone && <p className='text-red-600 text-sm mt-1'>{errors.phone.message}</p>}
                        </div>

                        {/* Facebook URL Field */}
                        <div>
                            <label htmlFor="facebook_url" className='block text-sm font-medium text-gray-700 mb-1'>Facebook Page or Account Link</label>
                            <Input
                                type="text"
                                className='w-full border border-gray-300 rounded-md p-2 mt-1'
                                placeholder='Enter Facebook URL'
                                id='facebook_url'
                                {...register('facebook_url')}
                            />
                            {errors.facebook_url && <p className='text-red-600 text-sm mt-1'>{errors.facebook_url.message}</p>}
                        </div>

                        {/* Instagram URL Field */}
                        <div>
                            <label htmlFor="instagram_url" className='block text-sm font-medium text-gray-700 mb-1'>Instagram Link</label>
                            <Input
                                type="text"
                                className='w-full border border-gray-300 rounded-md p-2 mt-1'
                                placeholder='Enter Instagram URL'
                                id='instagram_url'
                                {...register('instagram_url')}
                            />
                            {errors.instagram_url && <p className='text-red-600 text-sm mt-1'>{errors.instagram_url.message}</p>}
                        </div>

                        {/* Line ID Field */}
                        <div>
                            <label htmlFor="line_id" className='block text-sm font-medium text-gray-700 mb-1'>Line ID</label>
                            <Input
                                type="text"
                                className='w-full border border-gray-300 rounded-md p-2 mt-1'
                                placeholder='Enter Line ID'
                                id='line_id'
                                {...register('line_id')}
                            />
                            {errors.line_id && <p className='text-red-600 text-sm mt-1'>{errors.line_id.message}</p>}
                        </div>

                        {/* Google Map Link Field */}
                        <div>
                            <label htmlFor="google_map_link" className='block text-sm font-medium text-gray-700 mb-1'>Google Map Link</label>
                            <Input
                                type="text"
                                className='w-full border border-gray-300 rounded-md p-2 mt-1'
                                placeholder='Enter Google Map link'
                                id='google_map_link'
                                {...register('google_map_link')}
                            />
                            {errors.google_map_link && <p className='text-red-600 text-sm mt-1'>{errors.google_map_link.message}</p>}
                        </div>

                        {/* Image Upload Field */}
                        <div>
                            <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-1'>
                                Upload Image <span className='text-red-600'>*</span>
                            </label>
                            <Input
                                ref={fileInputRef}
                                type="file"
                                className='hidden'
                                accept="image/*"
                                onChange={handleFileChange}
                                id="image"
                            />

                            <div
                                onClick={handleFileClick}
                                className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-near-purple transition-colors text-center bg-gray-50 hover:bg-gray-100'
                            >
                                {selectedImage ? (
                                    <>
                                        <Image
                                            src={URL.createObjectURL(selectedImage)}
                                            width={128}
                                            height={128}
                                            alt="Selected"
                                            className='object-cover rounded-lg mb-2'
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
                            {errors.img_url && <p className='text-red-600 text-sm mt-1'>{errors.img_url.message}</p>}
                        </div>

                        {/* Distance Field */}
                        <div>
                            <label htmlFor="distance" className='block text-sm font-medium text-gray-700 mb-1'>Distance from ABAC (km)</label>
                            <Input
                                type="text"
                                className='w-full border border-gray-300 rounded-md p-2 mt-1'
                                placeholder="e.g., 1.5 km"
                                id='distance'
                                {...register('distance')}
                            />
                            {errors.distance && <p className='text-red-600 text-sm mt-1'>{errors.distance.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className='pt-4'>
                            <Button
                                className='w-full bg-near-purple text-white hover:bg-near-purple-dark transition-colors'
                                type='submit'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Dynamically load ToastContainer */}
            <div id="toast-container"></div>
        </div>
    )
}

export default AddListingForm
