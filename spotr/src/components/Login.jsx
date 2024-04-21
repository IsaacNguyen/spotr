import React, { useState } from 'react';
import { loginUser, signupUser } from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to track sign-up mode
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Sign Up mode
        await handleSignUp();
      } else {
        // Login mode
        await handleLogin();
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    console.log({username, password});
    const userData = { username, password };
    await loginUser(userData);
    console.log('Login successful');
    // Redirect or perform any other action upon successful login
    navigate('/dashboard');
  };

  const handleSignUp = async () => {
    const userData = { username, password };
    await signupUser(userData);
    console.log('User created successfully');
    // Automatically login the user after signing up
    await handleLogin();
  };

  return (
    <div className="container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
        <div className="input-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>

      <div className="switch-button">
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Existing User? Login' : 'New User? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default Login;