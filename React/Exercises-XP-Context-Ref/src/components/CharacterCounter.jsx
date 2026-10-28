import React, { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);
  const { theme } = useContext(ThemeContext);

  function handleInput() {
    setCount(inputRef.current.value.length);
  }

  return (
    <section className={`card ${theme}`}>
      <h2>Character counter</h2>
      <label htmlFor="message">Type a message</label>
      <input id="message" ref={inputRef} onInput={handleInput} type="text" aria-describedby="character-count" placeholder="Start typing…" />
      <p id="character-count" role="status">Characters: {count}</p>
    </section>
  );
}
