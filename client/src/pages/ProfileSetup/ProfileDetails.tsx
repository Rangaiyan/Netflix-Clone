import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/netflix-logo.png";
interface ProfileData {
  userName: string;
  email: string;
  memberCount: number;
  hasKidsProfile: boolean;
}

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileData>({
    userName: "",
    email: "",
    memberCount: 1,
    hasKidsProfile: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "memberCount" ? Math.min(Number(value), 5) : value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      hasKidsProfile: !prev.hasKidsProfile,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(formData));
    localStorage.setItem("isNewUser", "false");
    navigate("/languages");
  };

  return (
    <div className="flex flex-col items-center text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
      <img src={profileImage} alt="Profile" className="w-28 h-28 rounded-full mb-4" />

      <form onSubmit={handleSubmit} className="flex flex-col max-w-md w-full">
        <label className="text-lg mb-1">Name:</label>
        <input type="text" name="userName" value={formData.userName} onChange={handleChange} 
               className="p-2 border border-gray-300 rounded mb-3" required />

        <label className="text-lg mb-1">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} 
               className="p-2 border border-gray-300 rounded mb-3" required />

        <label className="text-lg mb-1">Number of Members (Max: 5):</label>
        <input type="number" name="memberCount" value={formData.memberCount} onChange={handleChange} 
               className="p-2 border border-gray-300 rounded mb-3" min="1" max="5" />

        <div className="flex items-center mb-4">
          <input type="checkbox" checked={formData.hasKidsProfile} onChange={handleCheckboxChange} className="mr-2" />
          <span className="text-lg">Add Kids Profile?</span>
        </div>

        <button type="submit" className="bg-red-600 text-white p-3 rounded hover:bg-red-700 transition">
          Next
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
