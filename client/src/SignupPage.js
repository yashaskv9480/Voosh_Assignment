import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import Vooshapi from './Vooshapi';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile,setMobile] = useState('');
  const [address,setAddress] = useState('');    
  const navigate = useNavigate();

  const handleLogin = (e) => {
    navigate('/')
  };

  const handleSignup = async (e) => {
    e.preventDefault(); 

    try {
      const response = await Vooshapi.post('/add-user', {
        name,
        email,
        password,
        mob_number: mobile, 
        address
      });
      console.log(response);
      if (response.status === 200) {
        alert('User registered successfully!');
        navigate('/'); 
      } else {
         alert('Failed to register user. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err.message);
      alert('An error occurred during signup. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
      <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333',textAlign: "center" }}>Signup</h2>        
      <form onSubmit={handleSignup} className="login-form">
      <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
        <div className="form-group">
            <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="form-control"
                placeholder="Enter Mobile Number"
            />
            </div>
            <div className="form-group">
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="Enter Address"
            />
            </div> 
            <button type="submit" className="btn btn-primary">Register</button>    
                    </form>
        <div className="forgot-password">
          <span>Already have a account??</span>
          <button type="button" className="btn btn-secondary" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
