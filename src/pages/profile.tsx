import { useState } from "react"
import { useAuth } from "../context/authContext"

const Profile = () => {
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const { state } = useAuth()

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
      </div>
    </div>
  )
}

export default Profile