import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBooks, selectHorrorBooks, selectFantasyBooks, selectScienceFictionBooks } from './selectors.js';
const genreSelectors = {
  All: selectBooks,
  Horror: selectHorrorBooks,
  Fantasy: selectFantasyBooks,
  'Science Fiction': selectScienceFictionBooks,
};
export default function BookList() {
  const [genre, setGenre] = useState('All');
  const books = useSelector(genreSelectors[genre]);
  return <section>
    <label htmlFor="genre">Filter by genre</label>
    <select id="genre" value={genre} onChange={event => setGenre(event.target.value)}>
      {Object.keys(genreSelectors).map(value => <option key={value}>{value}</option>)}
    </select>
    <p role="status">{books.length} books · {genre}</p>
    <ul>{books.map(book => <li key={book.id}><h2>{book.title}</h2><p>by {book.author}</p><span>{book.genre}</span></li>)}</ul>
    {books.length === 0 && <p>No books in this genre.</p>}
  </section>;
}
