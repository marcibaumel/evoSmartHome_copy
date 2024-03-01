'use client';

import { RootState } from '@/src/store/store';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import LampImage from '../../asset/lamp-stock.png';
import RgbLampImage from '../../asset/rgb-lamp-stock.png';
import Thermostat from '../../asset/thermometer.svg';
import Cookies from 'js-cookie';
import Layout from '@/src/layout/Layout';
import AuthRestriction from '@/src/layout/Auths/AuthRestriction';

const Devices = () => {
    const { replace, push } = useRouter();

    useEffect(() => {
        if (!Cookies.get('jwt_token')) {
            replace('/');
        }
    }, [replace]);

    return (
        <Layout>
            <AuthRestriction auth>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={6}>
                            <div
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => push('/devices/lamp')}
                            >
                                <Image height={100} src={LampImage} alt="Lamp Image" />
                            </div>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <div
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => push('/devices/rgbLamp')}
                            >
                                <Image height={100} src={RgbLampImage} alt="Rgb Lamp Image" />
                            </div>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <div
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => push('/devices/thermostat')}
                            >
                                <Image height={100} src={Thermostat} alt="Rgb Lamp Image" />
                            </div>
                        </Grid>
                    </Grid>
                </motion.div>
            </AuthRestriction>
        </Layout>
    );
};

export default Devices;
