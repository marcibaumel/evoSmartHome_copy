'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavbarElement, navBarElementProps } from './NavbarElement';
import { RootState, store } from '@/src/store/store';
import { Tooltip, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PersonIcon from '@mui/icons-material/Person';
import styles from './Navbar.module.css';
import Cookies from 'js-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import { setValid } from '@/src/store/slices/authSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    const [reduxState, setReduxState] = useState<RootState | null>(null);
    const [validState, setValidState] = useState(false);

    const validRoute = (): boolean => {
        if (Cookies.get('jwt_token')) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        setValidState(validRoute());
    }, []);

    const navbarItems: navBarElementProps[] = [
        { index: 0, name: 'Dashboard', route: '/', valid: true },
        { index: 1, name: 'Devices', route: '/devices', valid: validState },
        { index: 2, name: 'Add device', route: '/add-device', valid: validState },
    ];

    const handleLogout = () => {
        Cookies.remove('jwt_token');
        dispatch(setValid());
        setValidState(validRoute());
    };

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setReduxState(store.getState());
        });
        setValidState(validRoute());
        return () => unsubscribe();
    }, [reduxState]);

    return (
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Navbar className={styles.navbarContainer} expand="lg" style={{ height: 60 }}>
                <Container>
                    <Navbar.Toggle />
                    <Navbar.Collapse style={{ backgroundColor: '#609622', zIndex: 10 }}>
                        <Nav className="me-auto" style={{ opacity: '100%' }}>
                            {navbarItems.map(
                                (element) =>
                                    element.valid && (
                                        <NavbarElement
                                            key={element.index}
                                            index={element.index}
                                            name={element.name}
                                            route={element.route}
                                        />
                                    )
                            )}
                        </Nav>

                        {!validState ? (
                            <Link href="/login">
                                <Tooltip title={'Login'}>
                                    <IconButton onClick={() => {}}>
                                        <PersonIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Tooltip title={'Logout'}>
                                    <IconButton onClick={handleLogout}>
                                        <LogoutIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </motion.div>
    );
};

export default NavBar;
