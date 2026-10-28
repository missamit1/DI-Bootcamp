import React, { useContext, useRef } from 'react';
import { TaskContext } from './TaskContext.jsx';
import TaskItem from './TaskItem.jsx';
export default function App() {
  const { state, dispatch } = useContext(TaskContext);
  const inputRef = useRef(null);
  function addTask(event) {
    event.preventDefault();
    const text = inputRef.current.value.trim();
    if (!text) { inputRef.current.setCustomValidity('Enter a task'); inputRef.current.reportValidity(); return; }
    dispatch({ type: 'ADD_TASK', id: crypto.randomUUID(), text });
    inputRef.current.value = '';
    inputRef.current.focus();
  }
  const visibleTasks = state.tasks.filter(task => state.filter === 'all' || (state.filter === 'completed' ? task.completed : !task.completed));
  return (
    <main>
      <h1>Enhanced Task Manager</h1>
      <p>Click a task or choose Edit to change its text.</p>
      <form className="add-form" onSubmit={addTask}>
        <label htmlFor="new-task">New task</label>
        <input id="new-task" ref={inputRef} required maxLength={200} placeholder="What needs to be done?" onInput={event => event.currentTarget.setCustomValidity('')} />
        <button type="submit">Add task</button>
      </form>
      <div className="filters" role="group" aria-label="Filter tasks">
        {['all', 'active', 'completed'].map(filter => (
          <button key={filter} aria-pressed={state.filter === filter} onClick={() => dispatch({ type: 'FILTER_TASKS', filter })}>{filter[0].toUpperCase() + filter.slice(1)}</button>
        ))}
      </div>
      <p role="status">{state.tasks.filter(task => !task.completed).length} active / {state.tasks.length} total</p>
      {visibleTasks.length ? <ul>{visibleTasks.map(task => <TaskItem key={task.id} task={task} />)}</ul> : <p>No {state.filter === 'all' ? '' : state.filter + ' '}tasks to show.</p>}
    </main>
  );
}
