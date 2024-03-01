import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import lampImage from '../../resources/lamp.png';
import { Button } from '@mui/material';
import axios, { AxiosResponse } from 'axios';

const lampData = {
  name: 'Lamp',
  activated: '2023-07-13',
  feature: 'Smart light device',
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
    }
  ]
}

type GetDevice = {
  data: IDeviceData;
}

export const LampDevice = () => {
  const id = '64aeb18c69a01dd72ae20156';
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
        <Card.Img style={{ width: '10rem' }} variant="top" src={lampImage} />
        <Card.Body>
          <Card.Title>{lampData.name}</Card.Title>
          <Card.Text>
            {lampData.feature}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Activated: {lampData.activated}</ListGroup.Item>
          <ListGroup.Item>Status: {(deviceData && deviceData.state) && deviceData.state === 'open' ? 'on' : 'off'}</ListGroup.Item>
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
        {lampData.data.map(e => <ListGroup.Item>{e.data} - {e.user} - {e.status}</ListGroup.Item>)}
      </ListGroup>
    </>
  )
}
