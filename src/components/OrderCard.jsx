import React, { useEffect, useState } from 'react';
import { tailwindStyles } from './styling/styles';
import { getEventById } from '../api_calls/events_calls';
import './styling/OrderCard.css';
import { deleteOrder, updateOrder } from '../api_calls/orders_calls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OrderCard = ({order,onRemove}) => {

    const [numberOfTicketsSelected,setNumberOfTicketsSelected] = useState(order.numberOfTickets)
    const [initialTicketCategory,setInitialTicketCategory] = useState(order.ticketCategory?.description || '')
    const [initialNumberOfTickets,setInitialNumberOfTickets] = useState(order.numberOfTickets)
    const [ticketCategorySelected, setTicketCategorySelected] = useState(order.ticketCategory?.description || '');
    const [event,setEvent] = useState(null);
    const [priceLabelText,setPriceLabelText] = useState("Price:" + order.totalPrice + "$");
    const [isUpdateButtonDisabled,setIsUpdateButtonDisabled] = useState(true);
    const [updateButtonStyle,setUpdateButtonStyle] = useState(tailwindStyles('disabled_button').join(' '))

    useEffect(() => {
        getEventById(order.eventID).then(data => {setEvent(data)});
    },[])


    useEffect(() => {
      
      if(initialNumberOfTickets != numberOfTicketsSelected || ticketCategorySelected != initialTicketCategory)
      {
        setIsUpdateButtonDisabled(false)
        setUpdateButtonStyle(tailwindStyles('standard_button').join(' '));
      }
      else
      {
        setIsUpdateButtonDisabled(true)
        setUpdateButtonStyle(tailwindStyles('disabled_button').join(' '));
      }

    },[initialTicketCategory,initialNumberOfTickets,numberOfTicketsSelected,ticketCategorySelected])

    function generateTicketOptions() {
        const eventTickets = event?.ticketCategories;
        
        return (
          <select className="ticket-category" value={ticketCategorySelected} onChange={(e) => {setTicketCategorySelected(e.target.value)}}>
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

    function handleUpdateOrder()
    {
      
      const patchRequestBody = {
        numberOfTickets: numberOfTicketsSelected,
        ticketType: ticketCategorySelected
      }
    
      updateOrder(order.orderID,patchRequestBody)
      .then(response => {

        if (response.ok) {

            response.json().then(data => {
              setInitialNumberOfTickets(data.numberOfTickets);
              setInitialTicketCategory(data.ticketCategory.description);
              setPriceLabelText("Price:" +  data.totalPrice + "$")
              toast('Success!');
            })   

        } else {
          response.json().then(errorData => {
            toast(errorData.errorMessage);
          });
        }  
        
      });
    }

    return ( 
        <div className='order-card rounded-lg bg-gray-200 p-4 m-4'>

            <div className='event-description'>
                <p>Event:{event?.name}</p>
                <p>Type:{event?.eventType}</p>
                <p>Venue:{event?.venue.location}</p>
                <p>Date: {event?.startDate} - {event?.endDate}</p>
                <p>{priceLabelText}</p>
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

                <button className={[...tailwindStyles('standard_button'), 'delete-order-btn'].join(' ')} onClick={() => handleDeleteOrder()}>
                    Delete
                </button>

                <button className={[updateButtonStyle, 'update-order-btn'].join(' ')} onClick={() => handleUpdateOrder()} disabled={isUpdateButtonDisabled}>
                    Update
                </button>

            </div>

            
            <ToastContainer/>
        </div>
     );
}
 