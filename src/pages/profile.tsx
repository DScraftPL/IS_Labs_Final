import React, { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { jwtDecode } from "jwt-decode"
import authService from "../services/authService"
import { stat } from "fs"

const Profile = () => {
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState<string>('')

  const { state } = useAuth()

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.user?.token) {
      const updateTimeLeft = () => {
        if (state.user?.token) {
          const decodedToken = jwtDecode(state.user.token) as { exp: number };
          const currentTime = Math.floor(Date.now() / 1000);
          const timeRemaining = decodedToken.exp - currentTime;

          if (timeRemaining > 0) {
            setTimeLeft(`${Math.floor(timeRemaining / 60)} minutes ${timeRemaining % 60} seconds`);
          } else {
            setTimeLeft("Token expired");
            clearInterval(interval); // Stop the interval if the token is expired
          }
        }
      };

      updateTimeLeft(); // Call immediately to set the initial value
      interval = setInterval(updateTimeLeft, 1000); // Update every second
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [state.user?.token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user?.token}`,
        },
        body: JSON.stringify({
          email: state.user?.email,
          password,
          username,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Username updated successfully!");
      } else {
        alert(data.message || "Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("An error occurred. Please try again.");
    }
  }

  const handleRefresh = async (e: any) => {
    e.preventDefault();
    authService.refreshToken()
      .then((token) => {
        const decodedToken = jwtDecode(token) as { exp: number }
        const currentTime = Math.floor(Date.now() / 1000)
        const timeRemaining = decodedToken.exp - currentTime
        
        if(state.user?.token){
          state.user.token = token
        }

        if (timeRemaining > 0) {
          setTimeLeft(`${Math.floor(timeRemaining / 60)} minutes ${timeRemaining % 60} seconds`)
        } else {
          setTimeLeft("Token expired")
        }
        alert("Token refreshed successfully!");
      })
  }


  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
      <div className="flex flex-col border-2 rounded-lg p-4 w-full space-y-4">
        <h1>Profile of <strong>{state.user?.username}</strong></h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
        >
          <div className="space-x-2">
            <label htmlFor="email">New Username:</label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your new username"
              required
            />
          </div>

          <div className="space-x-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 border-black rounded-lg p-2 hover:border-blue-500 hover:text-blue-500 w-auto self-start"
          >
            Change Username
          </button>
        </form>
        <p>Token expires in: {timeLeft}</p>
        <button
          onClick={handleRefresh}
          className="border-2 border-black rounded-lg p-2 hover:border-blue-500 hover:text-blue-500 w-auto self-start"
        >
          Refresh Token
        </button>
      </div>
    </div>
  )
}

export default Profile