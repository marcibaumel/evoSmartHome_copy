'use client';

import DeviceCard, { IDeviceCard } from '@/src/components/DeviceCard/DeviceCard';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';
import { ActionType } from '@/src/components/ActionButton/ActionButton';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import Layout from '@/src/layout/Layout';
import AuthRestriction from '@/src/layout/Auths/AuthRestriction';

export interface Device {
    _id: { $oid: string };
    tasmota_id: string;
    device_type: string;
    name: string;
    change_date: any;
    own_properties: {
      [key: string]: any;
    };
    connected: boolean;
  }

const Lamp = () => {
    const { push, replace } = useRouter();
    const [devices, setDevices] = useState<Device[]>([]);
    const handleButtonClick = (id: string) => {
        push(`/devices/lamp/${id}`);
    };

    useEffect(() => {
        const handleDeviceFetch = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_URL}devices`);
                if (response.data.data) {
                    const filteredDevices: any = response.data.data.filter((device: { device_type: string; }) => device.device_type === 'lamp')
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


    return (
        <Layout>
            <AuthRestriction auth>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div>Connected lamp device</div>
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

                    <div style={{paddingTop: 15}}>Dummy device</div>

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

export default Lamp;
