// import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Home;
