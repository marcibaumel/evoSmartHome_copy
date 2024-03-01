'use client'

import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';
import Cookies from 'js-cookie';

interface ILayout {
    children: ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setToken(Cookies.get('jwt_token')));
        console.log(Cookies.get('jwt_token'));
      }, [dispatch])

    return <div>{children}</div>;
};

export default Layout;
