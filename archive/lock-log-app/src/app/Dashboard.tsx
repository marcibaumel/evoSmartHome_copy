import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Load } from '../components/Load';
import { useAppSelector } from '../store';
import { Navigate } from 'react-router-dom';
import { Alert, Grid } from '@mui/material';
import { DeviceCard } from '../components/DeviceCard';

const options = [
  { id: 1, label: 'Lock', body: 'Dolore eu officia irure eiusmod magna nostrud.', type:'lock' },
  { id: 2, label: 'Window', body: 'Dolore eu officia irure eiusmod magna nostrud.', type: 'window' },
  { id: 3, label: 'Lamp', body: 'Dolore eu officia irure eiusmod magna nostrud.', type: 'lamp' },
];


export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<IDashboardType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const userToken = useAppSelector(state => state.auth.token);

  const fetchDashboardData = async () => {
    setIsLoading(true)
    await fetch('http://localhost:8000/').then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      setDashboardData(data);
      setIsError(false);
      setIsLoading(false);
    }).catch(err => {
      setIsError(true);
      setIsLoading(false);
    })
  }

  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      console.log(show);
      setShow(false)
    }, 10000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {!userToken && (<Navigate to='/login' replace={true} />)}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}>
        {show && <motion.div initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1 }}>
          {isError && <Alert severity='error'>Server error</Alert>}
          {!isError && isLoading ? <Load /> : <Alert severity='success'>Server is live</Alert>}
        </motion.div>}
        <div>
          <h1>Your devices:</h1>
          {options.map(option => {
            return (
              <Grid className='mt-2' justifyContent="left">
                <Grid className='p-3' md={3} >
                  <DeviceCard id={option.id} title={option.label} body={option.body} type={option.type} />
                </Grid>
              </Grid>
            );
          })}
        </div>
      </motion.div>
    </motion.div>)
}