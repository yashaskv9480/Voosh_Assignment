import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import './Orders.css';
import Vooshapi from './Vooshapi';

const HomePage = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const uid = decodedToken.uid;
    console.log(uid)
  
    const fetchOrders = async () => {
      try {
        const response = await Vooshapi.get(`/get-order/${uid}`, {
          headers: {
            Authorization: `${token}`, 
          }
        });
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err.message);
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  
  console.log(orders)

  return (
<div className="container">
  <Nav />
  <h1 style={{ textAlign: 'center' }}>Your orders</h1>
  {loading ? (
      <h3 style={{ textAlign: 'center' }}>Loading....</h3>
      ) : (
    orders.length === 0 ? (
      <h3 style={{ textAlign: 'center' }}>No orders found!  Please please your orders</h3>
      ) : (
      <table className="order-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Total Number</th> 
            <th>Price</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderid}>
              <td>{order.type}</td>
              <td>{order.quantity}</td> 
              <td>{order.total_price}</td>
              <td>{order.order_date.substring(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )}
</div>

  );
};

export default HomePage;
