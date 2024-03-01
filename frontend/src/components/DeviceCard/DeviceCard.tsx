'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import { ActionButton, ActionType } from '../ActionButton/ActionButton';

export interface IDeviceCard {
    id: string;
    title: string;
    description: string;
    actionType: ActionType;
    onClick?: () => void;
    disable?: boolean;
}

const DeviceCard = ({ id, description, onClick, disable, title, actionType }: IDeviceCard) => {
    return (
        <Card>
            <Card.Header as="h5">Id: {id}</Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <ActionButton disabled={disable} onCLick={onClick} buttonLabel="Open" actionType={actionType} />
            </Card.Body>
        </Card>
    );
};

export default DeviceCard;
