import React, { useState } from "react";

const AddMovie = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("U");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(event.target.files?.[0] || null);
  };

  const handleSubmit = () => {
    console.log(`Movie Name: ${name}, Description: ${description}, Category: ${category}`);
    if (videoFile) console.log("Uploaded Video:", videoFile.name);
    alert(`Movie Saved: ${name}`);
  };

  return (
    <div className="mt-6">
      <p className="text-lg font-semibold">Movie Name</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2" />
      <p className="text-lg font-semibold">Genre</p>
      <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2" />
      <p className="text-lg font-semibold">Director</p>
      <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2" />
      <p className="text-lg font-semibold">Year</p>
      <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2" />

      <p className="text-lg font-semibold mt-4">Description</p>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2 h-24" />

      <p className="text-lg font-semibold mt-4">Select Category</p>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-800 px-4 py-2 rounded mt-2">
        <option value="U">U (Universal)</option>
        <option value="U/A">U/A (Parental Guidance)</option>
        <option value="A">A (Adult)</option>
      </select>

      <p className="text-lg font-semibold mt-4">Upload Video</p>
      <input type="file" accept="photo/*" onChange={handleFileChange} className="w-full text-white bg-amber-400 mt-2" />

      <button onClick={handleSubmit} className="mt-6 bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded">
        Save Movie
      </button>
    </div>
  );
};

export default AddMovie;

