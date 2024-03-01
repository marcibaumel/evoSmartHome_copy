'use client';

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { motion } from 'framer-motion';
import DeviceCard, { IDeviceCard } from '@/src/components/DeviceCard/DeviceCard';
import { ActionType } from '@/src/components/ActionButton/ActionButton';
import { useRouter } from 'next/navigation';
import AuthRestriction from '@/src/layout/Auths/AuthRestriction';
import Layout from '@/src/layout/Layout';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Device } from '../lamp/page';

const cardData: IDeviceCard[] = [
    {
        description: 'Cool lamp',
        actionType: ActionType.PRIMARY,
        id: '4141sfsf',
        title: 'Samsung Lamp',
    },
    {
        description: 'Cool lamp',
        actionType: ActionType.SECONDARY,
        id: 'dsghg',
        title: 'Huawei Lamp',
    },
    {
        description: 'Cool lamp',
        disable: true,
        actionType: ActionType.SECONDARY,
        id: 'dsghg',
        title: 'Huawei Lamp',
    },
];

const rgbLamp = () => {
    const { push, replace } = useRouter();
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        const handleDeviceFetch = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_URL}devices`);
                if (response.data.data) {
                    const filteredDevices: any = response.data.data.filter((device: { device_type: string; }) => device.device_type === 'rgb')
                    setDevices(filteredDevices);
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };
        handleDeviceFetch();
    }, []);

    useEffect(() => {
        if (!Cookies.get('jwt_token')) {
            replace('/');
        }
    }, [replace]);

    const handleButtonClick = (id: string) => {
        push(`/devices/rgbLamp/${id}`);
    };

    return (
        <Layout>
            <AuthRestriction auth>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div>Connected RGB lamp device</div>
                    <Grid container spacing={2}>
                        {devices.map((e: any) => (
                            <Grid xs={12} md={6} key={e.id}>
                                <div>
                                    <DeviceCard
                                        disable={!e && false}
                                        description={e.tasmota_id}
                                        actionType={ActionType.PRIMARY}
                                        id={e.id}
                                        title={e.name}
                                        onClick={() => handleButtonClick(e.id)}
                                    />
                                </div>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={2}>
                        {cardData.map((e) => (
                            <Grid xs={12} md={6} key={e.id}>
                                <div>
                                    <DeviceCard
                                        disable={e.disable}
                                        description={e.description}
                                        actionType={e.actionType}
                                        id={e.id}
                                        title={e.title}
                                        onClick={() => handleButtonClick(e.id)}
                                    />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </AuthRestriction>
        </Layout>
    );
};

export default rgbLamp;
