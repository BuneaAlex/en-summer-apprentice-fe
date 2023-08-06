import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllEvents } from '../api_calls/events_calls';

const Home = () => {
    const location = useLocation();
    const email = location.state.email;
    const [events,setEvents] = useState([])

    useEffect(()=>{
		console.log('inside useEffect')
		getAllEvents().then(events=>setEvents(events)
    );},[]);
  
    return (
      <div>
        {email}
        
      </div>
    );
  };

export default Home;