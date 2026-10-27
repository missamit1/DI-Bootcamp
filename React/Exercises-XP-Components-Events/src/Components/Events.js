import { useState } from 'react';

export default function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const clickMe = () => alert('I was clicked');
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') alert(event.currentTarget.value);
  };
  const toggle = () => setIsToggleOn(previous => !previous);

  return (
    <div className="controls">
      <button onClick={clickMe}>Click me</button>
      <label htmlFor="event-text">Type a message and press Enter</label>
      <input id="event-text" type="text" onKeyDown={handleKeyDown} />
      <button onClick={toggle} aria-pressed={isToggleOn}>{isToggleOn ? 'ON' : 'OFF'}</button>
    </div>
  );
}
