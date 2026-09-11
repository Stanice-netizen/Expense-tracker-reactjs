import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

export default ThemeToggle;