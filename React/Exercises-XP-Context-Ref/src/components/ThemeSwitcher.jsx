import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <section className={`card ${theme}`}>
      <h2>Theme switcher</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme} aria-pressed={theme === 'dark'}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </section>
  );
}
