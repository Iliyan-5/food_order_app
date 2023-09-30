// Registration.js
import React, { useState } from 'react';
import { register } from './Auth'; // Import your Firebase Authentication service

function Registration({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      await register(email, password);
      // Registration successful; you can now log the user in
      onLogin();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <input
        type="email"
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
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Registration;
