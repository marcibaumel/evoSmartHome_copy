import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from "react-router-dom";
import { Tooltip, IconButton} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from '../store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { authAction } from '../store/auth-slice';

export const NavBar = () => {
    const dispatch = useAppDispatch();
    const userToken = useAppSelector(state => state.auth.token);

    const onLogout = () => {
        dispatch(authAction.resetAuthData());
    } 

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/login'><Tooltip title={userToken ?  "Logout": "Login"}>
                    <IconButton onClick={onLogout}>
                        {userToken ?  <ExitToAppIcon/> : <PersonIcon />}
                    </IconButton>
                </Tooltip></NavLink>
                <NavLink style={{ textDecoration: 'none', marginRight: '1rem', marginLeft: '1rem' }} to='/'><Navbar.Brand>evoSmart App</Navbar.Brand> </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Dashboard</Link></Nav.Link>
                        <Nav.Link><Link style={{ textDecoration: 'none', color: 'black' }} to='/devices'>Devices</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
