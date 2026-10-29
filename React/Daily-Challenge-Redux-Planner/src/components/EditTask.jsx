import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../plannerSlice.js';
export default function EditTask({ day, task }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const dispatch = useDispatch();
  function save(event) { event.preventDefault(); if (!text.trim()) return; dispatch(editTask({ day, id: task.id, text })); setEditing(false); }
  if (!editing) return <><span className="task-text">{task.text}</span><button onClick={() => { setText(task.text); setEditing(true); }}>Edit</button></>;
  return <form className="edit-form" onSubmit={save}><input autoFocus aria-label="Edit task" value={text} maxLength={200} onChange={event => setText(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') setEditing(false); }} />
    <button disabled={!text.trim()}>Save</button><button type="button" onClick={() => setEditing(false)}>Cancel</button></form>;
}
