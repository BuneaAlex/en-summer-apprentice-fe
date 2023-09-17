import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tailwindStyles } from './styling/styles';

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
        localStorage.setItem("email",email);
        localStorage.setItem("password",password);
        navigate('/home'); 
      } else {
        console.error('Login error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
   
  };

  return (
    <div className={[...tailwindStyles('flex_center_container')].join(' ')}>
      <h2>Login</h2>
      <form>
        <div className={[...tailwindStyles('flex_center_container'),...tailwindStyles('standard_form'),'m-4'].join(' ')}>
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
          <button type="button" className={[...tailwindStyles('standard_button')].join(' ')} onClick={handleLogin}>
            Login
          </button>
          </div>
      </form>
    </div>
  );
};

export default LoginForm;