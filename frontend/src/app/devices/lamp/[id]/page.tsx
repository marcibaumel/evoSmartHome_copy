'use client';

import { ActionButton, ActionType } from '@/src/components/ActionButton/ActionButton';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const LampId = () => {
    const { push } = useRouter();
    const pathName = usePathname();
    const [status, setStatus] = useState<boolean>(false);

    const getDeviceId = (url: string): string => {
        const segments = url.split('/');
        const lastSegment = segments[segments.length - 1];
        return lastSegment;
    };

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_URL}devices/${getDeviceId(pathName)}`);
                if (response.data) {
                    console.log(response.data.own_properties.state);
                    if (response.data.own_properties.state === 'OFF') {
                        setStatus(false);
                    } else {
                        setStatus(true);
                    }
                    console.log(status);
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };
        fetchDevice();
    }, [pathName]);

    const handleToggleChange = async () => {
        setStatus(!status);

        try {
            const response = await axios.post(`${process.env.BACKEND_URL}${getDeviceId(pathName)}/set/state/${status ? 'off' : 'on'}`, {});
            console.log(response.data);

            if (response.data) {
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <Card>
                <Card.Title style={{ padding: 20 }}>Lamp Id: {getDeviceId(pathName)}</Card.Title>
                <Card.Body>
                    <div>Actual status: {status ? 'on' : 'off'}</div>
                    <div>Change status: </div>
                    <Switch onChange={handleToggleChange} checked={status} color="warning" />

                    <div style={{ paddingTop: 10 }}>
                        <ActionButton
                            actionType={ActionType.ERROR}
                            buttonLabel="Back to devices"
                            onCLick={() => push('/devices/lamp')}
                        />
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

export default LampId;
