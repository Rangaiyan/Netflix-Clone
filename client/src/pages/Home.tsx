// import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  console.log("Home")
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    navigate('/login');
  };

  return (
    <div>
      
    </div>
  );
};

export default Home;
