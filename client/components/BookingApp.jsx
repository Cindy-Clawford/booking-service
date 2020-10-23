import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import axios from 'axios';
import moment from 'moment';

import Calendar from './Calendar.jsx';
import Booking from './Booking.jsx';


import CalendarHelper from '../helpers/calendar.js';


const StyledBookingApp = styled.div`
  margin: 8px 0;
  height: 44px;
`;


const BookingApp = ({setCheckOutPicker, setCheckInPicker, checkOutPicker, checkInPicker}) => {
  const [locationid, setLocationid] = useState(window.location.pathname.slice(1) || 1);
  const [trips, setTrips] = useState([]);
  const [today, setToday] = useState(new Date())
  const [month1, setMonth1] = useState();
  const [month2, setMonth2] = useState();
  const [year, setYear] = useState()
  const [year2, setYear2] = useState()

  const [lowDays, setLowDays] = useState([new Date()]);

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  useEffect(() => {
    setYear(today.getFullYear());
    setMonth1(today.getMonth());
    setYear2(today.getFullYear());
    if (locationid.length === 0) {
      setLocationid(1);
    }
    axios({
      url: `/api/lowdays/${locationid}`,
      method: 'get',
    })
    .then((result) => {
      // TODO: Remove log
      let lowPriceDays = [];
      for (let low of result.data.rows) {
        lowPriceDays.push(new Date(low.date));
      }
      setLowDays(lowPriceDays);
    })
  },[]);

  useEffect(() => {
    if (month1 < 0) {
      setMonth1(11);
      setYear(year - 1);
    } else if ((month1 / 12) >= 1) {
      setMonth1(month1 % 12);
      setYear(year + 1);
    }
    if (month1 === 10 && year != year2) {
      setYear2(year)
    } else if (((month1 + 1) / 12) >= 1) {
      setYear2 (year + 1);
    }
    setMonth2((month1 + 1) % 12)
  }), [month1];

  useEffect(() => {
    if (checkOutDate) {
      if (checkInDate.getDate() >= checkOutDate.getDate()) {
        if (checkInDate.getMonth() >= checkOutDate.getMonth()) {
          if (checkInDate.getFullYear() >= checkOutDate.getFullYear()) {
            setCheckOutDate(undefined);
          }
        }
      }
    }
    setCheckInPicker(false);
    setCheckOutPicker(true);
  }, [checkInDate]);

  useEffect(() => {
    setCheckOutPicker(false);
  }, [checkOutDate]);

  if (!checkInPicker && !checkOutPicker) {
    return (
      <StyledBookingApp>
        <Booking  setCheckOutPicker={setCheckOutPicker} setCheckInPicker={setCheckInPicker} checkInPicker={checkInPicker} checkOutPicker={checkOutPicker} checkInDate={checkInDate} checkOutDate={checkOutDate}/>
      </StyledBookingApp>
    );
  } else {
    return (
      <StyledBookingApp>
        <Booking setCheckOutPicker={setCheckOutPicker} setCheckInPicker={setCheckInPicker} checkInPicker={checkInPicker} checkOutPicker={checkOutPicker} checkInDate={checkInDate} checkOutDate={checkOutDate}/>
        <Calendar year={year} year2={year2} month1={month1} month2={month2} setMonth1={setMonth1} checkInPicker={checkInPicker} checkOutPicker={checkOutPicker} lowDays={lowDays} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} checkInDate={checkInDate} checkOutDate={checkOutDate}/>
      </StyledBookingApp>
    );
  }
}



export default BookingApp;

