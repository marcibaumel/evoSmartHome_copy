import { cookies } from 'next/headers';

export interface IEncodedToken {
    name: string;
}

const decrypt = async (token: string): Promise<IEncodedToken> => {
    const payload = cookies().get('jwt_token')?.value;
    return { name: payload ? payload.toString() : 'none' };
};

export default decrypt;
