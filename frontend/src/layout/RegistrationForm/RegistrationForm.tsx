'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios, { Axios, AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import AuthRestriction from '../Auths/AuthRestriction';
import Layout from '../Layout';

const RegistrationForm = () => {
    const { push } = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tokenData, setTokenData] = useState<string>('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const { replace } = useRouter();

    const handleRegistration = async () => {
        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            setError(true);
        } else {
            try {
                const response = await axios.post(`${process.env.BACKEND_URL}auth/register`, {
                    name,
                    email,
                    password,
                });
                console.log(response.data);
                if (response.data) {
                    push('/login');
                }
            } catch (error: any) {
                console.error('Error logging in:', error.response);
                setErrorMessage(error.response.data.detail)
                setError(true);
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
                    <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                        <Form.Control
                            value={name}
                            type="Name"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                        <Form.Control
                            value={email}
                            type="username"
                            placeholder="Username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                            value={password}
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
                                {errorMessage}
                            </Alert>
                        </motion.div>
                    )}
                    <div style={{ paddingTop: 20 }}>
                        <Link href={'/login'}>Already have an account?</Link>
                    </div>
                    <Button className="mt-3" onClick={handleRegistration} variant="outline-secondary">
                        Register
                    </Button>
                </Form>
            </motion.div>
    );
};

export default RegistrationForm;
