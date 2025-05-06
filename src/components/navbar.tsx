import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import authService from "../services/authService";

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <div className="px-10 mx-10">
      <nav className="flex border-2 rounded-lg my-4 w-full place-content-between space-x-8 px-8 py-4">
        <div className="flex space-x-8">
          <NavLink to="/" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
            Home
          </NavLink>
          <NavLink to="/about" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
            About
          </NavLink>
          <NavLink to="/import" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
            Import
          </NavLink>
          <NavLink to="/multiple" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
            Multiple
          </NavLink>
        </div>
        <div className="flex space-x-8">
          {!state.isAuthenticated ? (
            <>
              <NavLink to="/login" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
                Login
              </NavLink>
              <NavLink to="/register" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
                Register
              </NavLink>
            </>) : (<>
              <NavLink to="/profile" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
                Profile
              </NavLink>
              <button onClick={handleLogout} className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold">
                Logout
              </button>
            </>)
          }
        </div>
      </nav>
    </div>
  )
}

export default Navbar;