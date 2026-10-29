import React from 'react';
import { useSelector } from 'react-redux';
import Calendar from './components/Calendar.jsx';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
export default function App() {
  const day = useSelector(state => state.planner.selectedDay);
  return <main><h1>Daily Planner</h1><Calendar /><AddTask key={day} /><TaskList /></main>;
}
