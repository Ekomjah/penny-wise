import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      title={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
