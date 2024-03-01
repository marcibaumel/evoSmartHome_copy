'use server';

import { cookies } from 'next/headers';

const login = async (email: string, password: string) => {
    const expires = 3600;

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
    };
    await fetch(`${process.env.BACKEND_URL}auth/login`, request)
        .then((response) => response.json())
        .then((data) => {
            cookies().set('jwt_token', data.token, { httpOnly: true });
            console.log(data.token);
            //dispatch(setToken(data.token));
        })
        .catch((error) => {
            //setError(true);
        });
};

export default login;
