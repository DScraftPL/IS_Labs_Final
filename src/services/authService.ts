import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(API_URL + "register", {
    username,
    password,
    email,
  });
  if (response.data) {  
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

const logout = () => {
  localStorage.removeItem("user");
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
}

export default {
  register,
  login,
  logout,
  getCurrentUser
}