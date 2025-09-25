import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="Navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/saved-news">Saved Articles</NavLink>
    </nav>
  );
}

export default Navigation;
