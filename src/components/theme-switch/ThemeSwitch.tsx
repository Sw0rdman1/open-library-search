import { useTheme } from "../../context/ThemeContext";

import './ThemeSwitch.css';

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {theme === 'dark' ? (
                <span className="icon sun-icon">☀️</span>
            ) : (
                <span className="icon moon-icon">🌙</span>
            )}
        </button>
    )
}

export default ThemeSwitch