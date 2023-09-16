import React, { useEffect, useState } from 'react';
import { useStyles } from './styling/styles';
import { getEventById } from '../api_calls/events_calls';
import './styling/OrderCard.css';
import { deleteOrder } from '../api_calls/orders_calls';

export const OrderCard = ({order,onRemove}) => {

    const [numberOfTicketsSelected,setNumberOfTicketsSelected] = useState(order.numberOfTickets)
    const [initialTicketCategory,setInitialTicketCategory] = useState(order.ticketCategory?.description || '')
    const [selectedTicketCategory, setSelectedTicketCategory] = useState(order.ticketCategory?.description || '');
    const [event,setEvent] = useState(null);
    
    useEffect(() => {
        getEventById(order.eventID).then(data => {setEvent(data)});
    },[])

    function generateTicketOptions() {
        const eventTickets = event?.ticketCategories;
        
        return (
          <select className="ticket-category" value={selectedTicketCategory} onChange={(e) => {setSelectedTicketCategory(e.target.value)}}>
            {eventTickets?.map((ticket, index) => (
              <option key={index} value={ticket.description}>
                {ticket.description}
              </option>
            ))}
          </select>
        );
      }

    function handleDeleteOrder()
    {
      deleteOrder(order.orderID).then(data => 
        {
          onRemove();
        });
    }

    return ( 
        <div className='order-card rounded-lg bg-gray-200 p-4 m-4'>

            <div className='event-description'>
                <p>Event:{event?.name}</p>
                <p>Type:{event?.eventType}</p>
                <p>Venue:{event?.venue.location}</p>
                <p>Date: {event?.startDate} - {event?.endDate}</p>
                <p>Price: {order.totalPrice}$</p>
            </div>

            <div className='orders-actions'>

                {generateTicketOptions()}

                <div className="ticket-number-select">
                <label htmlFor="tickets">Number of tickets:</label>
                <input
                    type="number"
                    name="tickets"
                    value={numberOfTicketsSelected}
                    min="1"
                    max="10"
                    onChange={(e) => setNumberOfTicketsSelected(e.target.value)}
                />
                </div>

                <button className={[...useStyles('standard_button'), 'delete-order-btn'].join(' ')} onClick={() => handleDeleteOrder()}>
                    Delete
                </button>

                <button className={[...useStyles('disabled_button'), 'update-order-btn'].join(' ')}>
                    Update
                </button>

            </div>

            

        </div>
     );
}
 