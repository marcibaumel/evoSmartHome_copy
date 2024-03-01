'use client';

import { ActionButton, ActionType } from '@/src/components/ActionButton/ActionButton';
import { Switch } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { HexColorPicker } from 'react-colorful';

const rgbLampId = () => {
    const { push } = useRouter();
    const pathName = usePathname();
    const [status, setStatus] = useState(true);
    const [color, setColor] = useState('#aabbcc');
    const [actualColor, setActualColor] = useState('#aabbcc');

    const getDeviceId = (url: string): string => {
        const segments = url.split('/');
        const lastSegment = segments[segments.length - 1];
        return lastSegment;
    };

    const handleChangeColor = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}${getDeviceId(pathName)}/set/color/${color.replace("#", "")}`, {});
            console.log(response.data);

            if (response.data) {
            }
        } catch (error) {
            console.error(error);
        }
        setActualColor(color);
    };

    const handleToggleChange = async () => {
        await setStatus(!status);

        try {
            const response = await axios.post(`${process.env.BACKEND_URL}${getDeviceId(pathName)}/set/state/${status ? 'off' : 'on'}`, {});
            console.log(response.data);

            if (response.data) {
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_URL}devices/${getDeviceId(pathName)}`);
                if (response.data) {
                    console.log(response.data.own_properties);
                    setActualColor(response.data.own_properties.color);
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

    return (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <Card>
                <Card.Title style={{ padding: 20 }}>RGB Lamp Id: {getDeviceId(pathName)}</Card.Title>
                <Card.Body>
                    <div>Actual status: {status ? 'on' : 'off'}</div>
                    <div>
                        Actual color:
                        <p style={{ backgroundColor: actualColor, width: 300 }}> {actualColor}</p>
                    </div>
                    <div>Change status: </div>
                    <Switch onChange={handleToggleChange} checked={status} defaultChecked color="warning" />
                    <div>Color picker value: {color}</div>
                    <HexColorPicker style={{ paddingBottom: 10 }} color={color} onChange={setColor} />
                    <ActionButton
                        onCLick={handleChangeColor}
                        actionType={ActionType.PRIMARY}
                        buttonLabel={'Change color'}
                    />
                    <div style={{ paddingTop: 10 }}>
                        <ActionButton
                            actionType={ActionType.ERROR}
                            buttonLabel="Back to devices"
                            onCLick={() => push('/devices/rgbLamp')}
                        />
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

export default rgbLampId;
