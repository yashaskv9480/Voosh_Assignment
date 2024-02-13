import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import Vooshapi from './Vooshapi';

const AddOrder = () => {
  const token = Cookies.get('token')
  const decodedToken = jwtDecode(token);
  console.log(decodedToken)
  const uid = decodedToken.uid;
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total_price, setTotalPrice] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Vooshapi.post('/add-order', {
        uid,
        type,
        quantity,
        total_price
      }, {
        headers: {
          Authorization: token
        }
      });
      if(response.status == 200){
        alert("Order placed succesfully.Thank you");
        navigate('/homepage')
      }
      console.log('Order added successfully:', response.data);
    } 
    catch (error) {
      alert("Sorry order couldnt be places.Please contact admin.")
      console.error('Error adding order:', error);
    }
  }
  

  const handleTypeChange = (e) => {
    setType(e.target.value);
    if (e.target.value === "Biryani") {
      setPrice(200);
    } else if (e.target.value === "Panner Pulao") {
      setPrice(250);
    } else if (e.target.value === "Pizza") {
      setPrice(300);
    } else {
      setPrice('');
    }
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    const totalPrice = e.target.value * price;
    setTotalPrice(totalPrice);
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333', textAlign: "center" }}>Order Form</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Food</label>
            <select
              value={type}
              onChange={handleTypeChange}
              className="form-control"
            >
              <option value="">Select Type</option>
              <option value="Biryani">Biryani</option>
              <option value="Panner Pulao">Panner Pulao</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Price: Rs</label>
            <input
              type="text"
              readOnly
              value={price}
              className="form-control"
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            <label className="label">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="form-control"
              placeholder="Quantity"
            />
          </div>
          <div className="form-group">
            <label className="label">Total Price</label>
            <input
              type="text"
              value={total_price}
              className="form-control"
              placeholder="Total Price"
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
