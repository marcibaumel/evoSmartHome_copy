import { useEffect, useState } from 'react';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';

const Rgb = ({ setProperties }: any) => {
    const [power, setPower] = useState('POWER');
    const [color, setColor] = useState('Color');

    /*
    const handleInput = (key: Function, value: string) => {
        key(value);

        setProperties(
            {
                "state": power,
                "color": color,
            }
        )
    }
    */

    useEffect(() => {

        console.log(power);
        console.log(color);

        setProperties({
            state: power,
            color: color,
        });
    }, [color, power, setProperties]);

    return (
        <>
            <FloatingLabel controlId="floatingInput" label="MQTT topic for power" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="POWER"
                    onChange={(e) => setPower(e.target.value)}
                    value={power}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="MQTT topic for color">
                <Form.Control
                    type="text"
                    placeholder="Color"
                    onChange={(e) => setColor(e.target.value)}
                    value={color}
                />
            </FloatingLabel>
        </>
    );
};

export default Rgb;
