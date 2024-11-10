import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.css';
import axios from '../api/axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('/login', { email, password });
      console.log('from login', email, password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setEmail('');
      setPassword('');
      navigate('/dashboard' , { replace: true });
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        // Server responded with a status other than 200 range
        switch (error.response.status) {
          case 401:
            setErrorMessage('Invalid credentials. Please check your email and password.');
            break;
          case 500:
            setErrorMessage('Internal server error. Please try again later.');
            break;
          default:
            setErrorMessage('An error occurred. Please try again.');
        }
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage('Network error. Please check your internet connection.');
      } else {
        // Something else caused the error
        setErrorMessage('An unexpected error occurred.');
      }

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="custom-login-body">
      <div className="container custom-login-container">
        <form className="custom-login-form" onSubmit={handleLogin}>
          <h4 className="text-center">Login</h4>
          <div className="mb-3 mt-5">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              required
              className="form-control custom-login-form-control"
              id="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage('');
              }}
              required
              className="form-control custom-login-form-control"
              id="password"
              name="password"
            />
          </div>
          <button type="submit" className="btn custom-login-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
