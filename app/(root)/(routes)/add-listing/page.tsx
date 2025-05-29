import dynamic from "next/dynamic"
const AddListing = dynamic(() => import('@/components/AddListing/AddListing.component'), { ssr: false })

const Page = () => {
    return (
        <>
            <AddListing />
        </>
    )
}

export default Page