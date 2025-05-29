import dynamic from "next/dynamic"

const CategoriesPage = dynamic(() => import('@/components/Categories/Categories.component'), { ssr: false })

const Page = () => {
    return (
        <>
            <CategoriesPage />
        </>
    )
}

export default Page