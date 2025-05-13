import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import NFlogo from "../../assets/netflix-logo.png";
import bgImg from "../../assets/hero.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
  
    setError("");
  
    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        email,
        password,
      });
  
      console.log(response.data.access_token); 
  
      if (response.status===201) {
        const {token,isAdmin} = response.data; 
        if (token || isAdmin) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem("userRole", isAdmin ? "admin" : "user");
          console.log("navi")
          navigate(isAdmin ? "/admin" : "/home");
        } else {
          setError("Token not found in response.");
        }
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="relative w-full h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})`, filter: "brightness(50%)" }}
      ></div>

      <img src={NFlogo} alt="Netflix Logo" className="absolute top-10 left-12 w-44 h-auto z-10" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full max-w-md p-8 bg-black bg-opacity-80 rounded text-white">
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email or mobile number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword?"text":"password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition"
            >
              Sign In
            </button>

            <div className="flex items-center justify-between text-sm text-gray-400 mt-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </div>
              <button className="hover:underline">Forgot password?</button>
            </div>
          </form>

          <p className="text-sm text-gray-400 mt-6">
            New to Netflix?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-white hover:underline"
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
