import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import Layout from '../Layout';
import AuthRestriction from '../Auths/AuthRestriction';

interface IDeviceTypes {
    lampCount: number;
    rgbCount: number;
    thermosCount: number;
}

const DeviceCountChart = ({ lampCount, rgbCount, thermosCount }: IDeviceTypes) => {
    return (
        <>
            <div>Devices:</div>
            <BarChart
                colors={['#609622']}
                xAxis={[
                    {
                        id: 'deviceCategories',
                        data: ['Lamp', 'RBG Lamp', 'Thermostat'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [lampCount + 2, rgbCount, thermosCount],
                    },
                ]}
                width={600}
                height={300}
            />
        </>
    );
};

export default DeviceCountChart;
