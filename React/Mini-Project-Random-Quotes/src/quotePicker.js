import quotes from './QuotesDatabase.js';
export const uniqueQuotes = [...new Map(quotes.map(item => [item.quote.trim(), item])).values()];
export const colors = ['#235789', '#8b3655', '#376349', '#73502f', '#64458c', '#23696c', '#93402d'];
export function drawQuote(remaining, previousColor = '') {
  if (!remaining.length) return null;
  const index = Math.floor(Math.random() * remaining.length);
  const availableColors = colors.filter(color => color !== previousColor);
  return {
    quote: remaining[index],
    remaining: remaining.filter((_, i) => i !== index),
    color: availableColors[Math.floor(Math.random() * availableColors.length)],
  };
}
