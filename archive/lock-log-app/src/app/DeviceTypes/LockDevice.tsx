import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import lockImage from '../../resources/solenoid.jpg';
import { Button } from '@mui/material';
import axios, { AxiosResponse } from 'axios';

const lockData = {
  name: 'Solenoid lock',
  activated: '2023-07-13',
  feature: 'The solenoid lock denotes a latch for electrical locking and unlocking. It is available in unlocking in the power-on mode type, and locking and keeping in the power-on mode type, which can be used selectively for situations. The power-on unlocking type enables unlocking only while the solenoid is powered on.',
  data: [
    {
      data: '2023-06-23:06:00',
      status: 'active',
      user: 'admin'
    },
    {
      data: '2023-06-23:06:00',
      status: 'active',
      user: 'admin'
    },
    {
      data: '2023-06-23:06:00',
      status: 'active',
      user: 'admin'
    },
    {
      data: '2023-06-23:06:00',
      status: 'active',
      user: 'admin'
    }
  ]
}

type GetDevice = {
  data: IDeviceData;
}

export const LockDevice = () => {
  const id = '649eb9ecf8abd4b0827448ee';
  const [changeStatusResponse, setChangeStatusResponse] = useState('');
  const [changeStatusAction, setChangeStatusAction] = useState<boolean>();
  const [deviceData, setDeviceData] = useState<IDeviceData | any>(null);

  const changeStatus = async () => {
    setChangeStatusAction(deviceData.state);
    const action = deviceData.state === 'open' ? 'close' : 'open';
    await axios.get(`http://localhost:8000/${id}/action/${action}`).then(response => setChangeStatusResponse(response.statusText));
    getDeviceStatus();
    setChangeStatusAction(!changeStatusAction);
  }

  const getDeviceStatus = async () => {
    await axios.get<AxiosResponse<GetDevice>>(`http://localhost:8000/${id}`).then(response => setDeviceData(response.data));
    console.log(await deviceData);
  }

  useEffect(() => {
    getDeviceStatus();
  }, [changeStatusResponse, changeStatusAction, deviceData])
  

  return (
    <>
      <Card style={{ width: 'auto' }}>
        <Card.Img style={{ width: '10rem' }} variant="top" src={lockImage} />
        <Card.Body>
          <Card.Title>{lockData.name}</Card.Title>
          <Card.Text>
            {lockData.feature}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Activated: {lockData.activated}</ListGroup.Item>
          <ListGroup.Item>Status: {deviceData && deviceData.state}</ListGroup.Item>
          <ListGroup.Item>
            <Button onClick={changeStatus}>
              Change status
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <div className={'m-3'}>
        <p>(WIP) Log Data:</p>

      </div>
      <ListGroup variant="flush">
        {lockData.data.map(e => <ListGroup.Item>{e.data} - {e.user} - {e.status}</ListGroup.Item>)}
      </ListGroup>
    </>
  )
}
