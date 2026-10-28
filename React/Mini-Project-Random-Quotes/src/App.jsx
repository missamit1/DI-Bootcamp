import React, { useState } from 'react';
import { drawQuote, uniqueQuotes } from './quotePicker.js';
export default function App() {
  const [selection, setSelection] = useState(() => drawQuote(uniqueQuotes));
  function newQuote() {
    setSelection(current => drawQuote(current.remaining, current.color) || current);
  }
  return (
    <main style={{ '--theme': selection.color }}>
      <section className="quote-box" aria-label="Random quote">
        <div aria-live="polite" aria-atomic="true">
          <h1>“{selection.quote.quote}”</h1>
          <p className="author">— {selection.quote.author || 'Unknown'}</p>
        </div>
        <button onClick={newQuote} disabled={!selection.remaining.length}>New quote</button>
        {!selection.remaining.length && <p className="finished">You have seen every quote. Reload to start again.</p>}
      </section>
    </main>
  );
}
