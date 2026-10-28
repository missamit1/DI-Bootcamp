import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Book } from './types';
import List from './List';
const initialBooks: Book[] = [
  { id: 'book-1', title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { id: 'book-2', title: 'Alice in Wonderland', author: 'Lewis Carroll' },
  { id: 'book-3', title: 'Pride and Prejudice', author: 'Jane Austen' },
];
export default function BookApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [error, setError] = useState<string>('');
  function addBook(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!title.trim() || !author.trim()) { setError('Enter both a title and an author.'); return; }
    const newBook: Book = { id: crypto.randomUUID(), title: title.trim(), author: author.trim() };
    setBooks(current => [...current, newBook]);
    setTitle(''); setAuthor(''); setError('');
  }
  return <main>
    <h1>My Book List</h1>
    <form onSubmit={addBook} noValidate>
      <label htmlFor="title">Book title</label>
      <input id="title" value={title} onChange={event => setTitle(event.target.value)} maxLength={200} />
      <label htmlFor="author">Author</label>
      <input id="author" value={author} onChange={event => setAuthor(event.target.value)} maxLength={200} />
      <button type="submit">Add book</button>
    </form>
    {error && <p role="alert">{error}</p>}
    <p role="status">{books.length} books</p>
    <List<Book> items={books} getKey={book => book.id} renderItem={book => <article><h2>{book.title}</h2><p>by {book.author}</p></article>} />
  </main>;
}
