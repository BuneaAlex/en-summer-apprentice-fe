import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../api_calls/events_calls';

const Home = () => {
    
    const [events,setEvents] = useState([])

    useEffect(()=>{
		console.log('inside useEffect')
		getAllEvents().then(events=>setEvents(events));
    },[]);
  
    return (
      <div>
       
        
      </div>
    );
  };

export default Home;