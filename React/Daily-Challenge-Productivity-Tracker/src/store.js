import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'tracker',
  initialState: { tasks: [], categories: [{ id: 'work', name: 'Work' }, { id: 'personal', name: 'Personal' }] },
  reducers: {
    addCategory: { prepare(name) { return { payload: { id: nanoid(), name: name.trim() } }; }, reducer(state, { payload }) {
      if (payload.name && !state.categories.some(c => c.name.toLowerCase() === payload.name.toLowerCase())) state.categories.push(payload);
    } },
    editCategory(state, { payload: { id, name } }) {
      const category = state.categories.find(c => c.id === id);
      if (category && name.trim() && !state.categories.some(c => c.id !== id && c.name.toLowerCase() === name.trim().toLowerCase())) category.name = name.trim();
    },
    deleteCategory(state, { payload: id }) {
      state.categories = state.categories.filter(c => c.id !== id);
      state.tasks.forEach(task => { if (task.categoryId === id) task.categoryId = ''; });
    },
    addTask: { prepare({ text, categoryId, date }) { return { payload: { id: nanoid(), text: text.trim(), categoryId, date, progress: 0 } }; }, reducer(state, { payload }) {
      if (payload.text && /^\d{4}-\d{2}-\d{2}$/.test(payload.date)) state.tasks.push({ ...payload, categoryId: state.categories.some(c => c.id === payload.categoryId) ? payload.categoryId : '' });
    } },
    editTask(state, { payload: { id, text } }) { const task = state.tasks.find(t => t.id === id); if (task && text.trim()) task.text = text.trim(); },
    deleteTask(state, { payload: id }) { state.tasks = state.tasks.filter(t => t.id !== id); },
    updateTaskProgress(state, { payload: { id, progress } }) { const task = state.tasks.find(t => t.id === id); if (task && Number.isFinite(progress)) task.progress = Math.max(0, Math.min(100, progress)); },
  },
});
export const { addCategory, editCategory, deleteCategory, addTask, editTask, deleteTask, updateTaskProgress } = slice.actions;
export const createStore = () => configureStore({ reducer: { tracker: slice.reducer } });
export const store = createStore();
