import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../store';
import { authAction } from '../store/auth-slice'
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Alert from '@mui/material/Alert';
import { Popup } from '../components/Popup';
import axios from 'axios';


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const passwordRef = useRef(null);
    const dispatch = useAppDispatch();
    const [error, setError] = useState(false);

    const userToken = useAppSelector(state => state.auth.token);

    useEffect(() => {
        setEmailError(false);
        setPasswordError(false);

        if (validateEmail(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
            passwordRef.current.value = ''
        }
    }, [email, password, passwordRef])


    const auth = async () => {
        if (email === 'admin@email.com' && password === 'admin') {
            await login(email, password).then(() => {
                dispatch(authAction.replaceAuthData(Cookies.get('jwt_data')));
            });
        } else {
            setEmailError(true);
            setPasswordError(true);
        }
    }

    const login = async (email: string, password: string) => {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }
        await fetch('http://localhost:8000/login', request).then(response => response.json())
            .then(data => {
                Cookies.set("jwt_data", data.token)
            }).catch(error => {
                setEmailError(true);
                setPasswordError(true);
                setError(true)
            });
    }

    const onClickLogin = () => {
        auth();
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
        >
            {userToken && (<Navigate to='/' replace={true} />)}
            <Form className='m-5' >
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control isInvalid={emailError} isValid={emailValid} type="email"
                        placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} data-testid="email-input" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control disabled={!emailValid && true} data-testid="password-input" ref={passwordRef} isInvalid={passwordError} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </FloatingLabel>
                {(emailError && passwordError) && (<div className="m-2">
                    <Alert severity="error">Email or password error</Alert>
                </div>)}

                <Button className='mt-3' onClick={() => onClickLogin()} variant="outline-secondary">Login</Button>
                {error && <Popup title={'Error is happened'} body={'Please connect with the developers'} onClick={() => {setError(false)}} isShow={error}/>}
            </Form>
        </motion.div>
    )
}
