import React, { useEffect, useState } from 'react';
import { MainNavBar } from '../../components/MainNavBar';
import './OrdersPage.css'
import { getAllOrders } from '../../api_calls/orders_calls';
import { OrderCard } from '../../components/OrderCard';


const OrdersPage = () => {

    const [orders,setOrders] = useState([]);
    

    useEffect( () => {
        getAllOrders().then(orders => setOrders(orders));
    },[]);

    function removeOrder(orderID)
    {
        const updatedOrders = orders.filter((order) => order.orderID !== orderID);
        setOrders(updatedOrders);
    }


    return ( 
        <div id='orderspage'>
            <MainNavBar/>
            <div id="content">
                <h1 className="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
                <div className="order-sort space-x-4"> 
                    <button id="sort-price-order">
                    Price
                    <i className="fa-solid fa-arrow-up-wide-short" id="sort-asc-price-order"></i>
                    <i className="fa-solid fa-arrow-down-short-wide hidden-icon" id="sort-desc-price-order"></i>
                    </button>

                    <button id="sort-name-order">
                    Name
                    <i className="fa-solid fa-arrow-up-wide-short" id="sort-asc-name-order"></i>
                    <i className="fa-solid fa-arrow-down-short-wide hidden-icon" id="sort-desc-name-order"></i>
                    </button>
                </div>
                <div className="orders flex items-center justify-center flex-wrap">
                    {orders.map((order) => 
                    <OrderCard key={order.orderID} order={order} onRemove={ () => removeOrder(order.orderID)}/>
                    )
                    }
                </div>
                </div>
        </div>
     );
}
 
export default OrdersPage;