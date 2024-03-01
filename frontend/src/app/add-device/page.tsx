'use client';

import { RootState } from '@/src/store/store';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import styles from './AddDevice.module.css';
import { motion } from 'framer-motion';
import Lamp from '@/src/layout/AddDeviceTypes/lamp/Lamp';
import Rgb from '@/src/layout/AddDeviceTypes/rgb/Rgb';
import Thermostat from '@/src/layout/AddDeviceTypes/thermostat/Thermostat';
import AuthRestriction from '@/src/layout/Auths/AuthRestriction';
import Layout from '@/src/layout/Layout';
import Cookies from 'js-cookie';
import axios from 'axios';

const AddDevice = () => {
    const { push, replace } = useRouter();
    const valid = useSelector((state: RootState) => state.auth.valid);
    const [error, setError] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [deviceType, setDeviceType] = useState('lamp');
    const [deviceTypeProperties, setDeviceTypeProperties] = useState({});

    useEffect(() => {
        if (!Cookies.get('jwt_token')) {
            replace('/');
        }
    }, [replace]);

    /*
    const deviceadd = (name: string, id: string, type: string, properties: any) => {
        //TODO: convert to axios
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, id: id, type: type, properties: properties }),
        };
        fetch('http://localhost:8000/add-device', request)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
                setError("Couldn't add device");
            });
    };
    */

    const handleAddDevice = async (name: string, id: string, type: string, properties: any) => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}add-device`, { name, id, type, properties });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAdd = () => {
        if (deviceName.trim().length === 0 || deviceId.trim().length === 0) {
            setError('Please fill out the forms');
        } else if (deviceId.includes(' ')) {
            setError("Please don't use spaces in device ID");
        } else {
            setError('');
            handleAddDevice(deviceName, deviceId, deviceType, deviceTypeProperties);
            console.log(deviceTypeProperties);
            if (!error) push('/devices');
        }
    };

    return (
        <Layout>
            <AuthRestriction auth>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="container"
                >
                    <Form className="m-5">
                        <FloatingLabel controlId="floatingInput" label="Device name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setDeviceName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Device ID" className="mb-3">
                            <Form.Control type="text" placeholder="ID" onChange={(e) => setDeviceId(e.target.value)} />
                        </FloatingLabel>
                        <Form.Label>Device Type</Form.Label>
                        <Form.Select size="lg" className="mb-3" onChange={(e) => setDeviceType(e.target.value)}>
                            <option value="lamp">Lamp</option>
                            <option value="rgbLamp">RGB Lamp</option>
                            <option value="thermostat">Thermostat</option>
                        </Form.Select>

                        <Form.Label>Device type specific proerties</Form.Label>
                        <Alert variant="info">
                            Use default value if you only have one module attached to your tasmota device!
                        </Alert>
                        {deviceType === 'lamp' && <Lamp setProperties={setDeviceTypeProperties} />}
                        {deviceType === 'rgbLamp' && <Rgb setProperties={setDeviceTypeProperties} />}
                        {deviceType === 'thermostat' && <Thermostat setProperties={setDeviceTypeProperties} />}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                style={{ paddingTop: 20 }}
                            >
                                <Alert onClick={() => setError('')} variant="danger">
                                    {error}
                                </Alert>
                            </motion.div>
                        )}
                        <Button className="mt-3" onClick={() => handleAdd()} variant="outline-secondary">
                            Add
                        </Button>
                    </Form>
                </motion.div>
            </AuthRestriction>
        </Layout>
    );
};

export default AddDevice;
