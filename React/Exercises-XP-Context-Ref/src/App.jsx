import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import CharacterCounter from './components/CharacterCounter.jsx';

export default function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app ${theme}`}>
      <main>
        <h1>React Hooks Practice</h1>
        <p>Change the theme, then try the live character counter.</p>
        <ThemeSwitcher />
        <CharacterCounter />
      </main>
    </div>
  );
}
