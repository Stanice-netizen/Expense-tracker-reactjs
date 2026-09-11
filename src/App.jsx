import { Routes, Route } from "react-router";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Categories from "./pages/Categories";
import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar"
import "./App.css"

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [theme]);
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="budgets" element={<Budgets />} />
        <Route path="categories" element={<Categories />} />
      </Route>
    </Routes>
        </>

  );
}

export default App;