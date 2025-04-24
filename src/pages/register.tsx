import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      dispatch({ type: "REGISTER_REQUEST" });
      const userData = await authService.register(username, email, password);
      dispatch({ type: "REGISTER_SUCCESS", payload: userData });
      navigate("/home");
    } catch (error: any) {
      setError(error.message);
      dispatch({ type: "REGISTER_FAIL", payload: error.message });
    }
  }
  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
      <div className="flex border-2 rounded-lg p-4 w-full max-w-d items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-lg p-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;