import { RouteProps } from "react-router-dom"
import classes from './Layout.module.css'
import { NavBar } from "../components/NavBar"
import { motion } from "framer-motion"

export const Layout = (props?: RouteProps) => {
    return (
        <>
            <main className={classes.main}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}>
                    <NavBar />
                    <div className={classes.application}>
                        {props?.children}
                    </div>
                </motion.div>
            </main>
        </>
    )
}