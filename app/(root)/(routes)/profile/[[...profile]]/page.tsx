import dynamic from 'next/dynamic'
const ProfilePageComponent = dynamic(() => import('@/components/Profile/Profile.component'), { ssr: false })

const Page = () => {
    return (
        <>
            <ProfilePageComponent />
        </>
    )
}

export default Page