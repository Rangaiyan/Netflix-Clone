import NFLogo from "../assets/netflix-logo.png";
import { useState } from "react";
import Movie from "../Admin/AddMovie";
import Series from "../Admin/AddSeries";

const Add = () => {
  const [contentType, setContentType] = useState("movie");

  return (
    <>
    <div className="pt-15 pl-20 text-white">
      <img src={NFLogo} alt="Netflix Logo" className="w-36 " />
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
