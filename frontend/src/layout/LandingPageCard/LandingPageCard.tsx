'use client';

import React, { useEffect, useState } from 'react';
import styles from './LandingPageCard.module.css';
import { motion } from 'framer-motion';
import { robotoNormal } from '@/src/asset/fonts';
import axios from 'axios';
import DeviceCountChart from '../Charts/DeviceCountChart';
import AuthRestriction from '../Auths/AuthRestriction';
import Layout from '../Layout';

const LandingPageCard = () => {
    const [lampCount, setLampDevices] = useState(0);
    const [rgbCount, setRbgCount] = useState(0);
    const [thermosCount, setThermosCount] = useState(0);

    const handleDeviceFetch = async () => {
        try {
            const response = await axios.get(`${process.env.BACKEND_URL}devices`);
            const lampDevices = response.data.data.filter(
                (device: { device_type: string }) => device.device_type === 'lamp'
            ).length;
            const rbgDevices = response.data.data.filter(
                (device: { device_type: string }) => device.device_type === 'rgb'
            ).length;
            const thermosDevices = response.data.data.filter(
                (device: { device_type: string }) => device.device_type === 'termostat'
            ).length;

            setLampDevices(lampDevices);
            setRbgCount(rbgDevices);
            setThermosCount(thermosDevices);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    useEffect(() => {
        handleDeviceFetch();
    }, []);

    return (
        <Layout>
            <div className={robotoNormal.className}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className={styles.landingPageContainer}
                    style={{ textAlign: 'center' }}
                >
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        style={{ fontSize: 60 }}
                    >
                        Make your home
                    </motion.div>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, y: -50 }}
                        transition={{ duration: 1, delay: 1 }}
                        style={{ fontSize: 80, paddingTop: 20, fontWeight: 900 }}
                    >
                        <motion.div
                            initial={{}}
                            animate={{ color: '#609622' }}
                            transition={{ duration: 0.5, delay: 1.5 }}
                        >
                            Smarter
                        </motion.div>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, y: -50 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    style={{ paddingTop: 20, fontWeight: 900 }}
                >
                    <AuthRestriction auth>
                        <DeviceCountChart lampCount={lampCount} rgbCount={rgbCount} thermosCount={thermosCount} />
                    </AuthRestriction>
                </motion.div>
            </div>
        </Layout>
    );
};

export default LandingPageCard;
