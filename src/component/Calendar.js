import {useState} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { Box } from '@mui/material';

function Calendar() {
    const [date, setDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{mt:5, zoom:2}}>
        <CalendarPicker  date={date} onChange={(newDate) => setDate(newDate)} />
        </Box>
    </LocalizationProvider>
  );
}

export default Calendar;