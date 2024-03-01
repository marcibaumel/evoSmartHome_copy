'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { store } from '@/src/store/store';

interface IAuthRestrictionProps {
    children: ReactNode;
    auth?: boolean;
}

const AuthRestriction = ({ children, auth }: IAuthRestrictionProps) => {
    const dispatch = useDispatch();
    const [tokenData, setTokenData] = useState('');

    useEffect(() => {
        setTokenData(store.getState().auth.token);
    }, [tokenData]);

    return <div>{!auth ? (tokenData === undefined ? children : '') : tokenData === undefined ? '' : children}</div>;
};

export default AuthRestriction;
