import { createSlice } from '@reduxjs/toolkit';
const booksSlice = createSlice({
  name: 'inventory',
  initialState: { books: [
    { id: 1, title: 'Dracula', author: 'Bram Stoker', genre: 'Horror' },
    { id: 2, title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror' },
    { id: 3, title: 'The Hobbit', author: 'J. R. R. Tolkien', genre: 'Fantasy' },
    { id: 4, title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', genre: 'Fantasy' },
    { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
    { id: 6, title: 'The Time Machine', author: 'H. G. Wells', genre: 'Science Fiction' },
  ] },
  reducers: {},
});
export default booksSlice.reducer;
