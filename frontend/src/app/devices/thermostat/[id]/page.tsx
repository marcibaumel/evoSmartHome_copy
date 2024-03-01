'use client';

import { ActionButton, ActionType } from '@/src/components/ActionButton/ActionButton';
import { Switch } from '@mui/material';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Layout from '@/src/layout/Layout';
import AuthRestriction from '@/src/layout/Auths/AuthRestriction';
import axios from 'axios';

const ThermostatId = () => {
    const pathName = usePathname();
    const { push, replace } = useRouter();
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [status, setStatus] = useState(true);
    const [humidity, setHumidity] = useState(40);
    const [batteryLife, setBatteryLife] = useState(70);
    const [temperature, setTemperature] = useState(22);

    const getDeviceId = (url: string): string => {
        const segments = url.split('/');
        const lastSegment = segments[segments.length - 1];
        return lastSegment;
    };

    const handleManualUpdate = () => {
        const fetchDevice = async () => {
            console.log(getDeviceId(pathName));
            try {
                const response = await axios.get(`${process.env.BACKEND_URL}devices/${getDeviceId(pathName)}`);
                if (response.data) {
                    console.log(response.data.own_properties);
                    setBatteryLife(response.data.own_properties.battery);
                    setHumidity(response.data.own_properties.humidity);
                    setTemperature(response.data.own_properties.temperature);
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };
        fetchDevice();
    };

    useEffect(() => {
        if (!Cookies.get('jwt_token')) {
            replace('/');
        }
    }, [replace, triggerUpdate]);

    useEffect(() => {
        const fetchDevice = async () => {
            console.log(getDeviceId(pathName));
            try {
                const response = await axios.get(`${process.env.BACKEND_URL}devices/${getDeviceId(pathName)}`);
                if (response.data) {
                    console.log(response.data.own_properties);
                    setBatteryLife(response.data.own_properties.battery);
                    setHumidity(response.data.own_properties.humidity);
                    setTemperature(response.data.own_properties.temperature);
                    /*
                    if (response.data.own_properties.state === 'OFF') {
                        setStatus(false);
                    } else {
                        setStatus(true);
                    }
                    console.log(status);
                    */
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };
        fetchDevice();
    }, [pathName, status]);

    return (
        <Layout>
            <AuthRestriction auth>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Card>
                        <Card.Title style={{ padding: 20 }}>Thermostat Id: {getDeviceId(pathName)}</Card.Title>
                        <Card.Body>
                            <div>Actual status: {status ? 'on' : 'off'}</div>
                            <div style={{ paddingTop: 10 }}>Temperature: {temperature}°C</div>
                            <div style={{ paddingTop: 10 }}>
                                Humidity: {humidity}%
                                <div>
                                    <ProgressBar>
                                        <ProgressBar
                                            animated
                                            striped
                                            variant="success"
                                            now={humidity > 50 ? 50 : humidity}
                                            key={1}
                                        />
                                        <ProgressBar animated striped variant="danger" now={humidity - 50} key={2} />
                                    </ProgressBar>
                                </div>
                            </div>
                            <div style={{ paddingTop: 10 }}>
                                Device battery:
                                <div>
                                    <ProgressBar now={batteryLife} label={`${batteryLife}%`} />
                                </div>
                            </div>
                            <div style={{ paddingTop: 10 }}>
                                <ActionButton
                                    actionType={ActionType.PRIMARY}
                                    buttonLabel="Manual update"
                                    onCLick={handleManualUpdate}
                                />
                                <div style={{ paddingTop: 10 }}>
                                    <ActionButton
                                        actionType={ActionType.ERROR}
                                        buttonLabel="Back to devices"
                                        onCLick={() => push('/devices/thermostat')}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </motion.div>
            </AuthRestriction>
        </Layout>
    );
};

export default ThermostatId;
