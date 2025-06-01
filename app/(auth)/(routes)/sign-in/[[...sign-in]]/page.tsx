import { SignIn } from "@clerk/nextjs"

const page = () => {
    return (
        <SignIn forceRedirectUrl={"/"} />
    )
}

export default page