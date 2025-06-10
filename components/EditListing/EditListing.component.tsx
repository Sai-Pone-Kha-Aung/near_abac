"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Delete, Trash, Upload } from 'lucide-react'
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { uploadImageToImageKit } from '@/lib/image-upload'
import { useListingsById } from '@/hooks/useListings'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { APIError, handleAPIError } from '@/utils/api-error'
import { useDeleteListing, useUpdateListing } from '@/hooks/useUpdateListing'

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

interface EditListingProps {
    listingId: string;
}

const EditListing = ({ listingId }: EditListingProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { data: listing, isLoading: loading, error } = useListingsById(listingId);
    const router = useRouter();
    const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_URL_ENDPOINT;

    const updateListingData = useUpdateListing();
    const deleteListingData = useDeleteListing();
    const isSubmitting = updateListingData.isPending;


    const formData: ZodType<FormData> = z.object({
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
                    // Check if we're in a browser environment
                    if (typeof window === 'undefined') return true;
                    return !file || (file instanceof File && file.size <= 10 * 1024 * 1024);
                },
                { message: "Image size must be less than 10MB" }
            ).optional(),
        distance: z.string().optional(),
    })

    const { register, handleSubmit, setValue, formState: { errors }, watch, reset } = useForm<FormData>({
        resolver: zodResolver(formData),
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

    useEffect(() => {
        if (listing) {
            reset({
                name: listing.name || '',
                category: listing.category,
                address: listing.address || '',
                description: listing.description || '',
                phone: listing.phone || '',
                facebook_url: listing.facebook_url || '',
                instagram_url: listing.instagram_url || '',
                google_map_link: listing.google_map_link || '',
                line_id: listing.line_id || '',
                img_url: null, // Reset image URL to allow new upload
                distance: listing.distance || ''
            });

            if (listing.img_url) {
                const imageUrl = listing.img_url.startsWith('http')
                    ? listing.img_url
                    : `${imageKitEndpoint}/${listing.img_url}`;
                setPreviewImage(imageUrl);
            }
        }
    }, [listing, reset, imageKitEndpoint]);

    const onSubmit = async (data: FormData) => {
        try {
            const updateData = {
                ...data,
                id: listingId,
            }

            const result = await updateListingData.mutateAsync(updateData);
            await showToast('Listing updated successfully!', 'success');
            setTimeout(() => {
                router.push(`/listing/${listingId}`);
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
            const file = e.target.files[0]
            setValue('img_url', file, {
                shouldValidate: true,
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this listing?')) {
            try {
                await deleteListingData.mutateAsync(listingId);

                router.push(`/categories/${listing?.category}`);
            } catch (error) {
                const errorMessage = error instanceof APIError ? error.message : 'An unexpected error occurred';
                handleAPIError(errorMessage);
                console.error('Error deleting listing:', error);
            }

        }
    }

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center gap-4'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-near-purple'></div>
                <p className='text-center text-gray-500'>Loading listing...</p>
            </div>
        )
    }

    if (error || !listing) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <p className='text-center text-gray-500'>Listing not found or error loading listing</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6'>

                    <div className='mb-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <Link href={`/listing/${listingId}`} className='flex justify-center items-center gap-1 text-near-purple hover:text-near-purple-dark transition-colors text-sm mb-4'>
                                <ArrowLeft className='w-4 h-4' />
                                <span>Back to Listing</span>
                            </Link>

                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                size="icon"
                            >
                                <Trash className='w-4 h-4' />
                            </Button>
                        </div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-4'>Edit Your Listing</h1>
                        <p className='text-gray-600 mb-6'>Update the information for your listing.</p>
                    </div>
                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        {/* Form fields will go here */}
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>Name <span className='text-red-600'>*</span></label>
                            <Input type="text" id="name" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter name' {...register('name')} />

                            {errors.name && <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>Category <span className='text-red-600'>*</span></label>
                            <Select
                                defaultValue={listing?.category}
                                onValueChange={(value) => setValue('category', value, { shouldValidate: true })}
                            >
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
                        <div>
                            <label htmlFor="address" className='block text-sm font-medium text-gray-700 mb-1'>Address <span className='text-red-600'>*</span></label>
                            <Textarea
                                id="address"
                                className='min-h-32'
                                placeholder='Provide a detailed address of your listing'
                                {...register('address')}
                            />
                            {errors.address && <p className='text-red-600 text-sm mt-1'>{errors.address.message}</p>}
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
                            <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter phone number' id='phone' {...register('phone')} />
                            {errors.phone && <p className='text-red-600 text-sm mt-1'>{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="facebook_url" className='block text-sm font-medium text-gray-700 mb-1'>Facebook Page or Account Link</label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter Facebook URL' id='facebook_url' {...register('facebook_url')} />
                            {errors.facebook_url && <p className='text-red-600 text-sm mt-1'>{errors.facebook_url.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="instagram_url" className='block text-sm font-medium text-gray-700 mb-1'>Instagram Link</label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter Instagram URL' id='instagram_url' {...register('instagram_url')} />
                            {errors.instagram_url && <p className='text-red-600 text-sm mt-1'>{errors.instagram_url.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="line_id" className='block text-sm font-medium text-gray-700 mb-1'>Line ID</label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter Line ID' id='line_id' {...register('line_id')} />
                            {errors.line_id && <p className='text-red-600 text-sm mt-1'>{errors.line_id.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="google_map_link" className='block text-sm font-medium text-gray-700 mb-1'>Google Map Link</label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder='Enter Google Map link' id='google_map_link' {...register('google_map_link')} />
                            {errors.google_map_link && <p className='text-red-600 text-sm mt-1'>{errors.google_map_link.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-1'>Upload Image</label>
                            <Input
                                ref={fileInputRef}
                                type="file"
                                className='hidden'
                                accept="image/*"
                                onChange={handleFileChange}
                                id="image"
                            />
                            {errors.img_url && <p className='text-red-600 text-sm mt-1'>{errors.img_url.message}</p>}

                            <div
                                onClick={handleFileClick}
                                className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-near-purple transition-colors text-center bg-gray-50 hover:bg-gray-100'
                            >
                                {selectedImage || previewImage ? (
                                    <>
                                        <Image
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : previewImage!}
                                            width={400}
                                            height={128}
                                            alt="Selected"
                                            className='object-cover rounded-lg mb-2'
                                        />
                                        <p className="text-sm text-gray-500">
                                            {selectedImage ? `Selected: ${selectedImage.name}` : 'Current image (click to change)'}
                                        </p>
                                        {selectedImage && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                        )}
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
                        <div>
                            <label htmlFor="distance" className='block text-sm font-medium text-gray-700 mb-1'>Distance from ABAC (km)</label>
                            <Input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-1' placeholder="e.g., 1.5 km" id='distance' {...register('distance')} />
                            {errors.distance && <p className='text-red-600 text-sm mt-1'>{errors.distance.message}</p>}
                        </div>

                        <div className='pt-4'>
                            <Button className='w-full bg-near-purple text-white hover:bg-near-purple-dark transition-colors' type='submit'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Updating Listing...' : 'Update Listing'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="toast-container"></div>
        </div>
    )
}

export default EditListing