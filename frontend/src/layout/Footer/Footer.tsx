'use client'

import React from "react"
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './Footer.module.css'
import { motion } from "framer-motion";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400']
});

const Footer = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className={styles.footerContainer}>
            <div>We are open to your feedback :)</div>
            <div>
                <a className={styles.footerLink} href='https://github.com/marcibaumel'><GitHubIcon /></a>
                <a className={styles.footerLink} style={{ paddingLeft: 10 }} href='https://github.com/Marcell-Puskas'><GitHubIcon /></a>
            </div>
            <div className={styles.footerSmallText}>2023/2024 evoCampus</div>
        </motion.div>
    );
}

export default Footer;