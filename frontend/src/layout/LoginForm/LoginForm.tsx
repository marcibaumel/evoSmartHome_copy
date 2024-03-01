'use client';

import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { setToken, setValidToken } from '@/src/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { replace } = useRouter();
    const [tokenData, setTokenData] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (tokenData.toString().trim().length > 0 || Cookies.get('jwt_token')) {
            replace('/');
        }
    }, [replace, tokenData]);

    const handleLogin = async () => {
        if (email.trim().length === 0 || password.trim().length === 0) {
            setError(true);
        } else {
            try {
                const response = await axios.post(`${process.env.BACKEND_URL}auth/login`, {
                    email,
                    password,
                });
                console.log(response.data);
                dispatch(setToken(response.data));
                if (response.data) {
                    Cookies.set('jwt_token', response.data.token);
                    setTokenData(response.data.token);
                    dispatch(setToken(response.data));
                    dispatch(setValidToken());
                }
            } catch (error) {
                setError(true);
                console.error('Error logging in:', error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="container"
        >
            <Form>
                <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                    <Form.Control type="username" placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FloatingLabel>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ paddingTop: 20 }}
                    >
                        <Alert onClick={() => setError(false)} variant="danger">
                            Username or password error
                        </Alert>
                    </motion.div>
                )}
                <div style={{ paddingTop: 20 }}>
                    <Link href={'/registration'}>Create a Account!</Link>
                </div>
                <Button className="mt-3" onClick={() => handleLogin()} variant="outline-secondary">
                    Login
                </Button>
            </Form>
        </motion.div>
    );
};

export default LoginForm;
