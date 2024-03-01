import { motion } from 'framer-motion'
import { useState } from 'react'
import { Grid, TextField } from "@mui/material";
import { DeviceCard } from '../components/DeviceCard';

const options = [
  { id: 1, label: 'Lock', body: 'Dolore eu officia irure eiusmod magna nostrud.', type:'lock' },
  { id: 2, label: 'Window', body: 'Dolore eu officia irure eiusmod magna nostrud.', type:'window' },
  { id: 3, label: 'Camera', body: 'Dolore eu officia irure eiusmod magna nostrud.', type:'camera'},
  { id: 4, label: 'Temperature', body: 'Dolore eu officia irure eiusmod magna nostrud.', type: 'temperature' },
  { id: 5, label: 'TV', body: 'Dolore eu officia irure eiusmod magna nostrud.', type: 'tv' },
  { id: 6, label: 'Lamp', body: 'Dolore eu officia irure eiusmod magna nostrud.', type: 'lamp' }
];

export const Devices = () => {
  const [filterValue, setFilterValue] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}>

      <TextField data-testid='choose-device-field-testid' fullWidth label="Choose a device" onChange={(e) => setFilterValue(e.target.value)} />

      <Grid className='mt-2' rowSpacing={1} container spacing={3} columns={12}
        alignItems="center"
        justifyContent="center">
        {options.filter(opt => opt.label.toLowerCase().includes(filterValue.toLowerCase())).map(option => {
          return (
            <Grid className='p-3' md={3} >
              <DeviceCard id={option.id} title={option.label} body={option.body} type={option.type} />
            </Grid>
          );
        })}
      </Grid>

    </motion.div>
  )
}
