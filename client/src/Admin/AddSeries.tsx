import React, { useState } from "react";

const AddSeries = () => {
  const [seriesName, setSeriesName] = useState("");
  const [seriesDescription, setSeriesDescription] = useState("");
  const [category, setCategory] = useState("U");
  const [seasons, setSeasons] = useState(1);
  const [episodesPerSeason, setEpisodesPerSeason] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(1);

  const episodeDetails= [];
  for (let s = 1; s <= seasons; s++) {
    for (let e = 1; e <= episodesPerSeason; e++) {
      episodeDetails.push({ season: s, episode: e, description: "", file: null });
    }
  }

  const handleEpisodeChange = (season: number, episode: number, field: string, value: string | File | null) => {
    episodeDetails.forEach((ep) => {
      if (ep.season === season && ep.episode === episode) {
        ep[field] = value;
      }
    });
  };

  const handleSubmit = () => {
    console.log(`Series Name: ${seriesName}, Description: ${seriesDescription}, Category: ${category}`);
    console.log(`Seasons: ${seasons}, Episodes per Season: ${episodesPerSeason}`);
    console.log("Selected Season Episodes:", episodeDetails.filter(ep => ep.season === selectedSeason));
    alert(`Series Saved: ${seriesName}`);
  };

  return (
    <div className="mt-6">
      <p className="text-lg font-semibold">Series Name</p>
      <input type="text" value={seriesName} onChange={(e) => setSeriesName(e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2" />

      <p className="text-lg font-semibold mt-4">Series Description</p>
      <textarea value={seriesDescription} onChange={(e) => setSeriesDescription(e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2 h-24" />

      <p className="text-lg font-semibold mt-4">Select Category</p>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-800 px-4 py-2 rounded mt-2">
        <option value="U">U (Universal)</option>
        <option value="U/A">U/A (Parental Guidance)</option>
        <option value="A">A (Adult)</option>
      </select>

      <p className="text-lg font-semibold mt-4">Seasons</p>
      <input type="number" value={seasons} onChange={(e) => setSeasons(Number(e.target.value))} className="bg-gray-800 px-4 py-2 rounded w-full mt-2" min={1} />

      <p className="text-lg font-semibold mt-4">Episodes Per Season</p>
      <input type="number" value={episodesPerSeason} onChange={(e) => setEpisodesPerSeason(Number(e.target.value))} className="bg-gray-800 px-4 py-2 rounded w-full mt-2" min={1} />

      <div className="mt-6">
        <p className="text-lg font-semibold">Select Season to Edit</p>
        <select value={selectedSeason} onChange={(e) => setSelectedSeason(Number(e.target.value))} className="bg-gray-800 px-4 py-2 rounded mt-2">
          {Array.from({ length: seasons }, (_, i) => (
            <option key={i + 1} value={i + 1}>Season {i + 1}</option>
          ))}
        </select>
      </div>

      {episodeDetails.filter(ep => ep.season === selectedSeason).map((ep, index) => (
        <div key={index} className="mt-4 bg-gray-900 p-4 rounded">
          <p className="text-lg font-semibold">Episode {ep.episode}</p>
          <textarea value={ep.description} onChange={(e) => handleEpisodeChange(ep.season, ep.episode, "description", e.target.value)} className="bg-gray-800 px-4 py-2 rounded w-full mt-2 h-16" />
          <input type="file" accept="video/*" onChange={(e) => handleEpisodeChange(ep.season, ep.episode, "file", e.target.files?.[0] || null)} className="mt-2 text-white" />
        </div>
      ))}

      <button onClick={handleSubmit} className="mt-6 bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded">
        Save Series
      </button>
    </div>
  );
};

export default AddSeries;
