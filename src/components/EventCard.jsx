import React, { useState } from 'react';
import { useStyles } from './styling/styles';
import { addOrder } from '../api_calls/orders_calls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EventCard = ({event}) => { 

    const [numberOfTickets,setNumberOfTickets] = useState(0);
    const [selectedTicketCategory, setSelectedTicketCategory] = useState(event.ticketCategories[0]?.description || '');
    const [priceLabelText,setPriceLabelText] = useState("Price:-");

    function generateTicketOptions() {
        const eventTickets = event.ticketCategories;
        
        return (
          <select className="ticket-category" value={selectedTicketCategory} onChange={(e) => {setSelectedTicketCategory(e.target.value)}}>
            {eventTickets.map((ticket, index) => (
              <option key={index} value={ticket.description}>
                {ticket.description}
              </option>
            ))}
          </select>
        );
      }

    function handleBuyTicket()
    {
      
      const ticketList = event['ticketCategories'];
      let ticketCategoryId = -1;
      ticketList.forEach(ticket => {if(ticket.description === selectedTicketCategory) ticketCategoryId = ticket.id;})
    
      let order = {
        eventID: event.eventID,
        ticketCategoryID: ticketCategoryId,
        numberOfTickets: parseInt(numberOfTickets)
      }
    
      try {
        addOrder(order).then(
          response => {
            if (response.ok) {
              
              setNumberOfTickets(0);
              setPriceLabelText("Price:-");
              toast('Success!');
            } else {
              response.json().then(errorData => {
                toast(errorData.message);
              });
              
            }
          }
        )   
      }  
       catch (error) {
        console.error('Error adding order:', error);
      }
    }

    function handleChangeTicketNumber(e) {
      const newNumberOfTickets = e.target.value;
    
      const ticketList = event['ticketCategories'];
      let price = 0;
      ticketList.forEach((ticket) => {
        if (ticket.description === selectedTicketCategory) {
          price = ticket.price;
        }
      });
    
      const totalPrice = newNumberOfTickets * price;
    
      setNumberOfTickets((prevNumberOfTickets) => newNumberOfTickets);
      setPriceLabelText("Price: " + totalPrice);
    }
    

    return(
        <div className='event-card rounded-lg bg-gray-200 p-4 m-4'>
                <div className="event-overview">
                <h2 className="event-title text-2xl font-bold">{event.name}</h2>
                <img className="event-image" src={event.image} alt={event.name} />
                </div>
        
                <div className="event-details">
                <p className="description text-gray-700">{event.description}</p>
                <p>Event Type: {event.eventType}</p>
                <p>Date: {event.startDate} - {event.endDate}</p>
                </div>

                <div className="event-venue">
                <p>Venue: {event.venue.location}</p>
                <p>Capacity: {event.venue.capacity}</p>
                <p>Type: {event.venue.type}</p>
                </div>
            <div className="event-buy">
                {generateTicketOptions()}
                <div className="ticket-number-select">
                    <label htmlFor="tickets">Number of tickets:</label>
                    <input type="number" name="tickets" value={numberOfTickets} min="1" max="100" onChange={(e) => handleChangeTicketNumber(e)}/>
                    <p className="price-label">{priceLabelText}</p>
                    <button className={[...useStyles('standard_button'), 'buy-ticket-btn'].join(' ')} onClick={() => handleBuyTicket()}>Confirm purchase</button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );

}

