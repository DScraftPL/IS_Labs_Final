import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      const userData = await authService.login(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      navigate('/');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAIL', payload: message });
      setFormError(message);
    }
  };
  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
      <div className="flex border-2 rounded-lg p-4 w-full max-w-d items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
          {formError && <p className="text-red-500">{formError}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;