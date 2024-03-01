import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./NavbarElement.module.css";

export interface navBarElementProps {
    index: number;
    name: string;
    route: string;
    valid?: boolean;
}

export const NavbarElement = ({ index, name, route }: navBarElementProps) => {

    const [indexValue, setIndexValue] = useState<number>();
    const [nameValue, setNameValue] = useState<string>();
    const [routeValue, setRouteValue] = useState<string>();

    useEffect(() => {
        setIndexValue(index)
        setNameValue(name)
        setRouteValue(route)
    }, [index, name, route])
    

    return (
        <Link className={styles.navbarElementText} href={routeValue ? routeValue : ''}>
            
            <motion.div
                key={indexValue}
                className={styles.navbarItem}
                initial={{ scale: 1 }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
            >
                {nameValue}
            </motion.div>
            
        </Link>
    );
};
