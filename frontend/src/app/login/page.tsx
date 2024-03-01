'use client'

import React, { useEffect, useState } from 'react';
import classes from './Login.module.css';
import LoginForm from '@/src/layout/LoginForm/LoginForm';
import AuthRestriction from '@/src/layout/Auths/AuthRestriction';
import Layout from '@/src/layout/Layout';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Login = () => {
    const { replace } = useRouter();
    const [tokenData, setTokenData] = useState<string>('');

    useEffect(() => {
        if (tokenData.toString().trim().length > 0 || Cookies.get('jwt_token')) {
            replace('/');
        }
    }, [replace, tokenData]);

    return (
        <Layout>
            <AuthRestriction>
                <div className={classes.loginContainer}>
                    <LoginForm />
                </div>
            </AuthRestriction>
        </Layout>
    );
};

export default Login;
