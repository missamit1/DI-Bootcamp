import { createSlice, nanoid } from '@reduxjs/toolkit';
export function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function validDay(day) {
  if (typeof day !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  const date = new Date(day + 'T12:00:00Z');
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === day;
}
const slice = createSlice({
  name: 'planner', initialState: { selectedDay: today(), tasksByDay: {} },
  reducers: {
    selectDay(state, action) { if (validDay(action.payload)) state.selectedDay = action.payload; },
    addTask: {
      prepare({ day, text }) { return { payload: { day, text: text.trim(), id: nanoid() } }; },
      reducer(state, { payload }) {
        if (!validDay(payload.day) || !payload.text) return;
        (state.tasksByDay[payload.day] ??= []).push({ id: payload.id, text: payload.text });
      },
    },
    editTask(state, { payload }) {
      const task = state.tasksByDay[payload.day]?.find(task => task.id === payload.id);
      if (task && payload.text.trim()) task.text = payload.text.trim();
    },
    deleteTask(state, { payload }) {
      if (state.tasksByDay[payload.day]) state.tasksByDay[payload.day] = state.tasksByDay[payload.day].filter(task => task.id !== payload.id);
    },
  },
});
export const { selectDay, addTask, editTask, deleteTask } = slice.actions;
export default slice.reducer;
