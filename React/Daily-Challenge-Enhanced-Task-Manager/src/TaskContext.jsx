import React, { createContext, useReducer } from 'react';
export const TaskContext = createContext(null);
export const initialState = { tasks: [], filter: 'all' };

export function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const text = action.text.trim();
      return text ? { ...state, tasks: [...state.tasks, { id: action.id, text, completed: false }] } : state;
    }
    case 'TOGGLE_TASK':
      return { ...state, tasks: state.tasks.map(task => task.id === action.id ? { ...task, completed: !task.completed } : task) };
    case 'EDIT_TASK': {
      const text = action.text.trim();
      return text ? { ...state, tasks: state.tasks.map(task => task.id === action.id ? { ...task, text } : task) } : state;
    }
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.id) };
    case 'FILTER_TASKS':
      return ['all', 'active', 'completed'].includes(action.filter) ? { ...state, filter: action.filter } : state;
    default:
      return state;
  }
}
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}
