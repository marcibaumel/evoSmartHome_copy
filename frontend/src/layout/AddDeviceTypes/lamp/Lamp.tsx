import { Dictionary } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';

const Lamp = ({ setProperties }: any) => {
    const [power, setPower] = useState('POWER');

    /*
    const handleInput = (key: Function, value: string) => {
        key(value);

        setProperties({
            state: power,
        });
    };

    */

    useEffect(() => {
        setProperties({
            state: power,
        });
    }, [power, setProperties])
    

    return (
        <FloatingLabel controlId="floatingInput" label="MQTT topic for power">
            <Form.Control
                type="text"
                placeholder="POWER"
                onChange={(e) => setPower(e.target.value)}
                value={power}
            />
        </FloatingLabel>
    );
};

export default Lamp;
