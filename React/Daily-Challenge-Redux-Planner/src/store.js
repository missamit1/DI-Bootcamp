import { configureStore } from '@reduxjs/toolkit';
import planner from './plannerSlice.js';
export const store = configureStore({ reducer: { planner } });
