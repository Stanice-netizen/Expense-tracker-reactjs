import { NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Expense Tracker</h2>

      <ThemeToggle />
    </nav>
  );
}

export default Navbar;