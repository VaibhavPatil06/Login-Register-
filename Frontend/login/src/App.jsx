import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Dashboard';
// import './styles.css'; // Import styles if needed

const App = () => {
  const { token } = useSelector(state => state.auth);

  return (
      <div className="container">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
          <Route path="/login" element={token ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/profile" /> : <Register />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={
            <div className="container">
              <h1>404 Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </div>
  );
};

export default App;
