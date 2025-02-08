import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-center gap-4">
        <NavLink
          to="/"
          className="text-white hover:text-gray-300"
          activeClassName="font-bold"
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className="text-white hover:text-gray-300"
          activeClassName="font-bold"
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
