import React, { useContext, useEffect, useRef, useState } from 'react';
import { TaskContext } from './TaskContext.jsx';

export default function TaskItem({ task }) {
  const { dispatch } = useContext(TaskContext);
  const [editing, setEditing] = useState(false);
  const editRef = useRef(null);
  useEffect(() => {
    if (editing) { editRef.current.focus(); editRef.current.select(); }
  }, [editing]);
  function save(event) {
    event.preventDefault();
    const text = editRef.current.value.trim();
    if (!text) { editRef.current.setCustomValidity('Enter a task'); editRef.current.reportValidity(); return; }
    dispatch({ type: 'EDIT_TASK', id: task.id, text });
    setEditing(false);
  }
  return (
    <li className="task">
      <input type="checkbox" aria-label={`Complete ${task.text}`} checked={task.completed} onChange={() => dispatch({ type: 'TOGGLE_TASK', id: task.id })} />
      {editing ? (
        <form onSubmit={save} className="edit-form">
          <input ref={editRef} defaultValue={task.text} aria-label="Edit task text" required maxLength={200}
            onInput={event => event.currentTarget.setCustomValidity('')}
            onKeyDown={event => { if (event.key === 'Escape') setEditing(false); }} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <button className={`task-text ${task.completed ? 'completed' : ''}`} onClick={() => setEditing(true)}>{task.text}</button>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <button className="delete" aria-label={`Delete ${task.text}`} onClick={() => dispatch({ type: 'DELETE_TASK', id: task.id })}>Delete</button>
    </li>
  );
}
