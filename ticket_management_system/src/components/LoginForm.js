import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/management/login',
        {
          username: email,
          password: password,
        }
      );

      // If the login is successful, you may handle the response accordingly,
      // such as storing the authentication token in localStorage or session storage.

      console.log('Login successful', response.data);
    } catch (error) {
      // If there's an error during login, handle it here.
      console.error('Login error:', error);
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