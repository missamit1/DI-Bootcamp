import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../todoSlice.js';
export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText('');
  }
  return <form onSubmit={handleSubmit}>
    <label htmlFor="todo">New todo</label>
    <div className="input-row"><input id="todo" value={text} onChange={event => setText(event.target.value)} maxLength={200} placeholder="What needs to be done?" />
    <button type="submit" disabled={!text.trim()}>Add todo</button></div>
  </form>;
}
