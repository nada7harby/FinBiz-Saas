import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center p-2 rounded-md border border-border bg-white dark:bg-[#0B0B0D] text-black dark:text-white transition-colors duration-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
    >
      {theme === "dark" ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}
