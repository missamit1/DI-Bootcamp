import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../plannerSlice.js';
export default function DeleteTask({ day, task }) {
  const dispatch = useDispatch();
  return <button className="delete" aria-label={`Delete ${task.text}`} onClick={() => dispatch(deleteTask({ day, id: task.id }))}>Delete</button>;
}
