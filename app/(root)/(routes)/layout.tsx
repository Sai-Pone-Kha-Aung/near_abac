import dynamic from 'next/dynamic'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}

export default ClientLayout