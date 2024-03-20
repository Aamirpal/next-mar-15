import { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme between 'light' and 'dark'
  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark"); // Optional: Save theme preference
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light"); // Optional: Save theme preference
    }
  };

  // Effect hook to set the initial theme based on user preference or system setting
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <button onClick={toggleTheme} className="btn btn-ghost">
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
};

export default ThemeToggle;
