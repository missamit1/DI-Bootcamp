import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../plannerSlice.js';
export default function AddTask() {
  const [text, setText] = useState('');
  const day = useSelector(state => state.planner.selectedDay);
  const dispatch = useDispatch();
  function submit(event) { event.preventDefault(); if (!text.trim()) return; dispatch(addTask({ day, text })); setText(''); }
  return <form onSubmit={submit}><label htmlFor="new-task">New task</label><div className="row">
    <input id="new-task" value={text} onChange={event => setText(event.target.value)} maxLength={200} />
    <button disabled={!text.trim()}>Add task</button></div></form>;
}
