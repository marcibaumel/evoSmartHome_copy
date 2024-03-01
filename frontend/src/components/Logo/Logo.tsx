'use client'

import React from 'react'
import styles from './Logo.module.css'
import { motion } from 'framer-motion'

export const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <motion.div initial={{ scale: 0, opacity: 0, filter: "blur(5px)" }}
        animate={{ rotate: 360, scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.3
        }}>
        <div className={styles.roof}></div>
        <span className={styles.evoText}>evo</span><span className={styles.homeText}>Home</span>
      </motion.div>
    </div >
  )
}
