import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="px-10">
            <nav className="flex border-2 rounded-lg my-4 w-full items-start space-x-8 px-8 py-4">
                <NavLink to="/" className="border-2 rounded-lg p-1" end>
                    Home
                </NavLink>
                <NavLink to="/about" className="border-2 rounded-lg p-1" end>
                    About
                </NavLink>
            </nav>
        </div>
    )
}

export default Navbar;