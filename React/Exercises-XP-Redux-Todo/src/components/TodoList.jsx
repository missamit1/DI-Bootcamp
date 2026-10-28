import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem.jsx';
export default function TodoList() {
  const todos = useSelector(state => state.todos.todos);
  return <section aria-label="Todos">
    <p role="status">{todos.filter(todo => todo.completed).length} of {todos.length} completed</p>
    {todos.length ? <ul>{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul> : <p>No todos yet. Add your first one above.</p>}
  </section>;
}
