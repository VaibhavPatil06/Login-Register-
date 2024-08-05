import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setError } from '../store/slice/authSlice';
import { registerUser } from '../store/api/auth';
import '../assets/css/register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setErrorState] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setCompany('');
    setErrorState('');
  }, []);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('Password must be at least 8 characters long');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('Password must contain one number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must contain one symbol');
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }
    try {
      await registerUser({ email, password, name, company });
      navigate('/login');
    } catch (err) {
      setErrorState(err.message);
      dispatch(setError(err.message));
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
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
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => !passwordErrors.length && setPasswordFocused(false)}
                onChange={handlePasswordChange}
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye  /> : <FaEyeSlash/>}
              </button>
            </div>
            {passwordFocused && (
              <ul className="password-requirements">
                <li>Password must contain</li>
                <li className={password.length >= 8 ? 'valid' : 'invalid'}> At least 8 characters long</li>
                <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>one uppercase letter</li>
                <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>one lowercase letter</li>
                <li className={/[0-9]/.test(password) ? 'valid' : 'invalid'}>one number</li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid'}>one symbol</li>
              </ul>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company (Optional)</label>
            <input
              id="company"
              type="text"
              placeholder="Enter your company (Optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login" className="login-button">Click here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
