import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
const navigate = useNavigate();

   const handleonLogout = () => {
            Cookies.remove('token');
            navigate('/')
   }
   const handleonAddorders = () => {
        navigate('/add-order')
   }

  return (
    <div className="navbar">
      <div className="navbar-left">
      </div>
      <div className="navbar-right">
        <button className="navbar-button" onClick={handleonAddorders}>Add Orders</button>
        <button className="navbar-button" onClick={handleonLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;
