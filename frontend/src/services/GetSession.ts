import { cookies } from "next/headers"

const getSession = async () => {
    const session = cookies().get('jwt_token')?.value;
    if(!session) return null;
    return session
}

export default getSession;