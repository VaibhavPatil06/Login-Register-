import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setToken, setError } from '../store/slice/authSlice';
import { loginUser } from '../store/api/auth';
import '../assets/css/login.css'; // Import the CSS for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons from react-icons
import {  toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email && !password){
    toast.error("Email And Password must be required")
    }
    try {
      const response = await loginUser({ email, password });
      dispatch(setToken(response.data.token));
      navigate('/profile');
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account?  
            <Link to="/register" className="register-button"> Click here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
