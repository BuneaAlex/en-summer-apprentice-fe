import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//adauga link ca param sau props
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/management/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful', responseData);
        navigate('/home',{ state: { email } }); 
      } else {
        console.error('Login error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
   
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;