import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setError, logout } from '../store/slice/authSlice.js';
import { getUserProfile } from '../store/api/auth.js';
// import './styles.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { token, user, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await getUserProfile(token);
        dispatch(setUser(response.data));
        setLoading(false);
      } catch (err) {
        dispatch(setError(err.message));
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page
  };

  if (loading) return <div className="container">Loading...</div>;

  if (error) return <div className="container"><div className="error">{error}</div></div>;

  return (
    <div className="container">
      <h1>Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Company:</strong> {user.company || 'N/A'}</p>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
