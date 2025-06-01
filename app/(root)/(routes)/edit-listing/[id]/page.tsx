"use client"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
const EditListing = dynamic(() => import('@/components/EditListing/EditListing.component'), { ssr: false })

const Page = () => {
    const { id } = useParams()
    return (
        <>
            <EditListing listingId={id as string} />
        </>
    )
}

export default Page