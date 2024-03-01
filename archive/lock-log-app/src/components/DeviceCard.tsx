import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DeviceCard = (props: IDeviceCard) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/${props.type}/${props.id}`)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
