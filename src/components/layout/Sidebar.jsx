import { NavLink } from "react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Tags,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transactions">
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/budgets">
          <Wallet size={20} />
          <span>Budgets</span>
        </NavLink>

        <NavLink to="/categories">
          <Tags size={20} />
          <span>Categories</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;