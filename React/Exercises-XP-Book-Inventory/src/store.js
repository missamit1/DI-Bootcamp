import { configureStore } from '@reduxjs/toolkit';
import inventory from './booksSlice.js';
export const store = configureStore({ reducer: { inventory } });
