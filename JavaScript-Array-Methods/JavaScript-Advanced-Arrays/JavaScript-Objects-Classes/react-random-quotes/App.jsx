
import { useState } from "react";
import "./App.css";

const quotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { quote: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
];

const colors = [
  "#B86C72",
  "#587F88",
  "#866B9B",
  "#CB8058",
  "#63846B",
  "#B08C47",
];

function getRandomIndex(length, previousIndex) {
  if (length <= 1) return 0;

  let index;

  do {
    index = Math.floor(Math.random() * length);
  } while (index === previousIndex);

  return index;
}

export default function App() {
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * quotes.length)
  );

  const [colorIndex, setColorIndex] = useState(() =>
    Math.floor(Math.random() * colors.length)
  );

  function generateQuote() {
    setQuoteIndex(previous =>
      getRandomIndex(quotes.length, previous)
    );

    setColorIndex(previous =>
      getRandomIndex(colors.length, previous)
    );
  }

  const currentQuote = quotes[quoteIndex];
  const currentColor = colors[colorIndex];

  return (
    <main
      className="app"
      style={{ backgroundColor: currentColor }}
    >
      <section className="quote-box">
        <h1 style={{ color: currentColor }}>
          “{currentQuote.quote}”
        </h1>

        <p className="author">
          — {currentQuote.author}
        </p>

        <button
          onClick={generateQuote}
          style={{ backgroundColor: currentColor }}
        >
          New Quote
        </button>
      </section>
    </main>
  );
}
