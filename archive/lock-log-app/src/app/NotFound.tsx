import React from 'react'
import { Image } from "react-bootstrap";
import photo from '../resources/NotFound.png'

export const NotFound = () => {
    return (
        <div>
            <Image className='img-fluid rounded-pill img-thumbnail border-0' src={photo} />
        </div>
    )
}
