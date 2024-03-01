'use client'

import { store } from '@/src/store/store';
import { useRouter } from 'next/navigation';
import AuthRestriction from '@/src/layout/Auths/AuthRestriction';
import classes from './Register.module.css';
import Layout from '@/src/layout/Layout';
import React, { useEffect } from 'react';
import RegistrationForm from '@/src/layout/RegistrationForm/RegistrationForm';

const Register = () => {
    const { replace } = useRouter();

    useEffect(() => {
        if (store.getState().auth.token !== undefined) {
            replace('/');
        }
    }, [replace]);

    return (
        <Layout>
            <AuthRestriction>
                <div className={classes.registerContainer}>
                    <RegistrationForm />
                </div>
            </AuthRestriction>
        </Layout>
    );
};

export default Register;
