import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../../api_calls/events_calls';
import {EventCard} from '../../components/EventCard';
import './Home.css';
import '../../components/styling/EventCard.css';
import { MainNavBar } from '../../components/MainNavBar';

const Home = () => {
    
    const [events,setEvents] = useState([])

    useEffect(()=>{
		console.log('inside useEffect')
		getAllEvents().then(events=>setEvents(events));
    },[]);
  
    return (
      <div id='homepage'>
          <MainNavBar/>

          <div id="content" >
            <div className="event-filters">
              <input
                type="text"
                placeholder="Filter by event name"
                id="filter_event_name"
              />
              <select id="event-type-select">

              </select>

              <select id="venue-type-select">

              </select>
            </div>
            <div className="events flex items-center justify-center flex-wrap">
              
                {events.map((event, index) => (
                <EventCard key={index} event={event} />
                ))}
            </div>
          </div>
      </div>
      
    );
  };

export default Home;