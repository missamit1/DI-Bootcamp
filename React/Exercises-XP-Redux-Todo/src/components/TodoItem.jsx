import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../todoSlice.js';
export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  return <li>
    <label className={todo.completed ? 'completed' : ''}>
      <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
      <span>{todo.text}</span>
    </label>
    <button className="remove" aria-label={`Remove ${todo.text}`} onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
  </li>;
}
