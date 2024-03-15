import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div> {/* Logo or navigation can go here */}</div>
      <ThemeToggle /> {/* Theme toggle button */}
    </header>
  );
};

export default Header;
