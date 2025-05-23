import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  isAdmin: boolean;
}


export const getToken = (): string | null => {
  return localStorage.getItem("accessToken"); 
};


export const getUserInfo = (): DecodedToken | null => {
  const token = getToken();
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Token decode failed:", error);
    return null;
  }
};
