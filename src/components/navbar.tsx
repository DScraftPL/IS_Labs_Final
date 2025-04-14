import { NavLink } from "react-router-dom";

const Navbar = (props: {
  isLoggedIn: boolean
}) => {
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
        </div>
        <div className="flex space-x-8">
          {!props.isLoggedIn ? (
            <NavLink to="/login" className="text-sm text-gray-500 border-2 rounded-lg p-1 font-semibold" end>
              Login
            </NavLink>
          ) : (
            <p>Logged in</p>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;