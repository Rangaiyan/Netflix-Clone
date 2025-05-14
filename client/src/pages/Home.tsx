// import React from 'react';
import { useNavigate } from 'react-router-dom';
import NFlogo from "../assets/netflix-logo.png";
const Home = () => {
  const navigate = useNavigate();
  console.log("Home")
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    navigate('/login');
  };

  return (
      <div className="flex justify-between items-center p-5 text-white">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition font-bold"
        >
          Logout
        </button>
      </div>
  );
};

export default Home;
