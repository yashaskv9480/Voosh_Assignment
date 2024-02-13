import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import Vooshapi from './Vooshapi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
      const response = await Vooshapi.post('/login-user', {
        email,
        password
      });
      console.log(response)
      if (response.status === 200) {
        const jsonData = response.data;
  
        if (jsonData.token) {
          Cookies.set('token', jsonData.token, { expires: 1 });
          navigate('/homepage', { replace: true });
        } else {
          alert("Token not found in response data");
        }
      } else {
        alert("Wrong email and password");
      }
    } catch (err) {
      alert("Wrong email and password!");
      console.error("Error during login:", err.message);
    }
  };

  const handleSignup = () => {
    navigate('/signup')
  };

  return (
    <div className="login-container">
      <div className="login-content">
      <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333',textAlign: "center" }}>Login</h2>        
      <form className="login-form">
          <div className="form-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
        </form>
        <div className="forgot-password">
          <span>New To site??</span>
          <button type="button" className="btn btn-secondary" onClick={handleSignup}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
