import { createSlice, nanoid } from '@reduxjs/toolkit';
const todoSlice = createSlice({
  name: 'todos',
  initialState: { todos: [] },
  reducers: {
    addTodo: {
      prepare(text) { return { payload: { id: nanoid(), text: text.trim(), completed: false } }; },
      reducer(state, action) { if (action.payload.text) state.todos.push(action.payload); },
    },
    toggleTodo(state, action) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo(state, action) { state.todos = state.todos.filter(todo => todo.id !== action.payload); },
  },
});
export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
