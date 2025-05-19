import NFLogo from "../assets/netflix-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "./AddMovie";
import Series from "./AddSeries";

const Add = () => {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState("movie");
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("isAdmin");
    navigate("/login"); 
  };
  return (
    <>
    <div className="flex justify-between items-center p-5 text-white">
        <img src={NFLogo} alt="Netflix Logo" className="w-36" />
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition font-bold"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col justify-center ml-10 items-center">
        <p className="text-lg font-semibold">Select Content Type</p>
        <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="bg-gray-800 px-4 py-2 rounded mt-2">
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

      
      {contentType === "movie" ? <Movie /> : <Series />}
      </div>
    
    </>
   
  );
};

export default Add;
