import React, { useState, useEffect } from 'react';
import { getAllEvents, getEventsFiltered } from '../../api_calls/events_calls';
import {EventCard} from '../../components/EventCard';
import './Home.css';
import '../../components/styling/EventCard.css';
import { MainNavBar } from '../../components/MainNavBar';

const Home = () => {
    
    const [events,setEvents] = useState([])
    const [eventTypeSelected,setEventTypeSelected] = useState("")
    const [venueTypeSelected,setVenueTypeSelected] = useState("")
    const [filterEventNameInputed,setFilterEventNameInputed] = useState("")
    const [areEventsFilteredByName,setAreEventsFilteredByName] = useState(false)
    const [areEventsFilteredWithSelect,setAreEventsFilteredWithSelect] = useState(false)
    const [filteredEvents,setFilteredEvents] = useState([])

    useEffect(()=>{
		getAllEvents().then(events=>setEvents(events));
    },[]);

    useEffect(()=>{

      if(filterEventNameInputed.trim() === "")
      {
        setAreEventsFilteredByName(false)
      }  
      else
      {
        setAreEventsFilteredByName(true)
      }
      
    },[filterEventNameInputed]);


    useEffect(()=>{

      if(eventTypeSelected.trim() === "" && venueTypeSelected.trim() === "")
      {
        setAreEventsFilteredWithSelect(false)
      }  
      else
      {
        setAreEventsFilteredWithSelect(true)
      }
      
    },[eventTypeSelected,venueTypeSelected]);


    function generateEventTypeOptions() {
      const optionsSet = new Set(events.map((event) => event.eventType));
    
      return (
        <select id="event-type-select" value={eventTypeSelected} onChange={(e) => filterEventsByEventType(e)}>
            <option value="">Event type...</option>
          {Array.from(optionsSet).map((optionValue, index) => (
            <option key={index} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
        
      );
    }
    
    function generateVenueTypeOptions() {
      const optionsSet = new Set(events.map((event) => event.venue.type));
    
    
      return (
        <select id="venue-type-select" value={venueTypeSelected} onChange={(e) => filterEventsByVenueType(e)}>
            <option value="">Venue type...</option>
            {Array.from(optionsSet).map((optionValue, index) => (
              <option key={index} value={optionValue}>
                {optionValue}
              </option>
            ))}
        </select>
      )
    }

    function filterEventsByEventType(e)
    {
        const newEventType = e.target.value
        setEventTypeSelected((previousEventType) => newEventType)

        getEventsFiltered(newEventType,venueTypeSelected)
        .then(data => setFilteredEvents(data))
    }

    function filterEventsByVenueType(e)
    {
        const newVenueType = e.target.value
        setVenueTypeSelected((previousVenueType) => newVenueType)

        getEventsFiltered(eventTypeSelected,newVenueType)
        .then(data => setFilteredEvents(data))
    }

    function filterEventsByName(e)
    {
        const newFilterName = e.target.value;
        setFilterEventNameInputed((prevFilterName) => newFilterName);

        const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(newFilterName.toLowerCase()));
        setFilteredEvents(filteredEvents)

        setVenueTypeSelected("")
        setEventTypeSelected("")
    }

    function showEvents(eventsList) {
      return eventsList.map((event, index) => (
        <EventCard key={index} event={event} />
      ));
    }
  
    return (
      <div id='homepage'>
          <MainNavBar/>

          <div id="content" >
            <div className="event-filters">
              <input
                type="text"
                placeholder="Filter by event name"
                id="filter_event_name"
                onChange={(e) => filterEventsByName(e)}
                value={filterEventNameInputed}
              />
              {generateEventTypeOptions()}

              {generateVenueTypeOptions()}
            </div>
            <div className="events flex items-center justify-center flex-wrap">
              
                {(areEventsFilteredByName || areEventsFilteredWithSelect) ?
                showEvents(filteredEvents)
                :
                showEvents(events)
                }
            </div>
          </div>
      </div>
      
    );
  };

export default Home;