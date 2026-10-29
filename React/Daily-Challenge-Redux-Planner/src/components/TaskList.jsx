import React from 'react';
import { useSelector } from 'react-redux';
import EditTask from './EditTask.jsx';
import DeleteTask from './DeleteTask.jsx';
export default function TaskList() {
  const day = useSelector(state => state.planner.selectedDay);
  const tasks = useSelector(state => state.planner.tasksByDay[day]);
  return <section aria-label="Tasks"><h2>Tasks for {day}</h2>
    {tasks?.length ? <ul>{tasks.map(task => <li key={`${day}-${task.id}`}><EditTask day={day} task={task} /><DeleteTask day={day} task={task} /></li>)}</ul> : <p>No tasks for this day.</p>}
  </section>;
}
