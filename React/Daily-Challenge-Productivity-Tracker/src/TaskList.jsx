import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasksByCategory, selectCategoryById } from './selectors.js';
import { editTask, deleteTask, updateTaskProgress } from './store.js';
const TaskItem = memo(function TaskItem({ task, onEdit, onProgress, onDelete }) {
  const category = useSelector(state => selectCategoryById(state, task.categoryId));
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  return <li>
    {editing ? <form onSubmit={event => { event.preventDefault(); if (text.trim()) { onEdit(task.id, text); setEditing(false); } }}>
      <label>Edit task<input autoFocus value={text} onChange={event => setText(event.target.value)} /></label><button disabled={!text.trim()}>Save</button><button type="button" onClick={() => setEditing(false)}>Cancel</button>
    </form> : <><h3>{task.text}</h3><button onClick={() => { setText(task.text); setEditing(true); }}>Edit</button></>}
    <p>{task.date} · {category?.name ?? 'Uncategorized'}</p>
    <label>Progress for {task.text}<input type="range" min="0" max="100" step="10" value={task.progress} onChange={event => onProgress(task.id, Number(event.target.value))} /></label>
    <output>{task.progress}%</output>
    <label className="check"><input type="checkbox" checked={task.progress === 100} onChange={event => onProgress(task.id, event.target.checked ? 100 : 0)} />Completed: {task.text}</label>
    <button className="delete" onClick={() => onDelete(task.id)}>Delete task</button>
  </li>;
});
export default function TaskList({ categoryId }) {
  const tasks = useSelector(state => selectTasksByCategory(state, categoryId));
  const dispatch = useDispatch();
  const handleEdit = useCallback((id, text) => dispatch(editTask({ id, text })), [dispatch]);
  const handleProgress = useCallback((id, progress) => dispatch(updateTaskProgress({ id, progress })), [dispatch]);
  const handleDelete = useCallback(id => dispatch(deleteTask(id)), [dispatch]);
  return tasks.length ? <ul>{tasks.map(task => <TaskItem key={task.id} task={task} onEdit={handleEdit} onProgress={handleProgress} onDelete={handleDelete} />)}</ul> : <p>No tasks in this category.</p>;
}
