import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { jwtDecode } from "jwt-decode"
import authService from "../services/authService"

const Profile = () => {
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [passwordDelete, setPasswordDelete] = useState<string>('')
  const [email, setEmail] = useState<string>('')
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
            clearInterval(interval);
            authService.logout();
            return;
          }
        }
      };

      updateTimeLeft();
      interval = setInterval(updateTimeLeft, 1000);
    }

    return () => clearInterval(interval);
  }, [state.user?.token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Updating username...");
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
        alert("Username updated successfully! Please log in again!");
        authService.logout();
        window.location.reload();
      } else {
        alert(data.message || "Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("An error occurred. Please try again.");
    }
  }

  const handleDelete = async (e: any) => { 
    e.preventDefault();
    try {
      if(email !== state.user?.email) {
        alert("Email does not match the logged-in user");
        return;
      }

      const response = await fetch("http://localhost:3000/api/auth/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user?.token}`,
        },
        body: JSON.stringify({
          email: email,
          username: state.user?.username,
          password: passwordDelete,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Account deleted successfully! Please log in again!");
        authService.logout();
        window.location.reload();
      } else {
        alert(data.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
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

        if (state.user?.token) {
          state.user.token = token
        }

        if (timeRemaining > 0) {
          setTimeLeft(`${Math.floor(timeRemaining / 60)} minutes ${timeRemaining % 60} seconds`)
        } else {
          setTimeLeft("Token expired")
          authService.logout()
          return
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
            <label htmlFor="username">New Username:</label>
            <input
              type="text"
              id="text"
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
        <form
          onSubmit={handleDelete}
          className="flex flex-col space-y-4"
        >
          <div className="space-x-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-x-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={passwordDelete}
              onChange={(e) => setPasswordDelete(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 border-black rounded-lg p-2 hover:border-blue-500 hover:text-blue-500 w-auto self-start"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile