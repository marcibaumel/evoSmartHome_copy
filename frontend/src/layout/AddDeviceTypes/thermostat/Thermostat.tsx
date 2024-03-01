import { useEffect, useState } from 'react';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';

const Thermostat = ({ setProperties }: any) => {
    const [temperature, setTemperature] = useState('temperature');
    const [humidity, setHumidity] = useState('humidity');
    const [battery, setBattery] = useState('battery');

    const handleInput = (key: Function, value: string) => {
        key(value);

        setProperties({
            temperature: temperature,
            humidity: humidity,
            battery: battery,
        });
    };

    useEffect(() => {
        console.log(temperature);
        console.log(humidity);
        console.log(battery);

        setProperties({
            temperature: temperature,
            humidity: humidity,
            battery: battery,
        });
    }, [battery, humidity, setProperties, temperature]);

    return (
        <>
            <FloatingLabel controlId="floatingInput" label="MQTT topic for temperature" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="temperature"
                    onChange={(e) => setTemperature(e.target.value)}
                    value={temperature}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="MQTT topic for humidity" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="humidity"
                    onChange={(e) => setHumidity(e.target.value)}
                    value={humidity}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="MQTT topic for battery">
                <Form.Control
                    type="text"
                    placeholder="battery"
                    onChange={(e) => setBattery(e.target.value)}
                    value={battery}
                />
            </FloatingLabel>
        </>
    );
};

export default Thermostat;
