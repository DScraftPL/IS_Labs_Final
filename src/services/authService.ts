import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3000/api/auth/";

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

axios.interceptors.request.use(
  async (config) => {
    const user = getCurrentUser();
    const token = user?.token;

    if (token && isTokenExpired(token)) {
      logout();
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(API_URL + "register", {
    username,
    password,
    email,
  });

  console.log(response.data);

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

  console.log(response.data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

const logout = () => {
  localStorage.removeItem("user")
  window.location.href = "/login"
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
}

const refreshToken = async () => {
  const user = getCurrentUser();
  if (!user?.token) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(API_URL + "refresh", {
      refreshToken: user.token,
    });

    if (response.data) {
      const updatedUser = { ...user, token: response.data.token };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return response.data.token;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logout();
    throw error;
  }
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const user = getCurrentUser();
  let token = user?.token;

  if (token && isTokenExpired(token)) {
    try {
      token = await refreshToken();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
      throw error;
    }
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    throw new Error("Unauthorized. Please log in again.");
  }

  return response;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
  isTokenExpired,
  fetchWithAuth
}