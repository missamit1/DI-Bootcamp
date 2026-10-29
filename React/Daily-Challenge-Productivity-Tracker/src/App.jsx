import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, addCategory, editCategory, deleteCategory } from './store.js';
import { selectCategories, selectCompletedTasks } from './selectors.js';
import CategorySelector from './CategorySelector.jsx';
import TaskList from './TaskList.jsx';
function CategoryEditor({ category, onDelete }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [name, setName] = useState(category.name);
  const duplicate = categories.some(c => c.id !== category.id && c.name.toLowerCase() === name.trim().toLowerCase());
  return <form className="category-row" onSubmit={event => { event.preventDefault(); dispatch(editCategory({ id: category.id, name })); }}>
    <label>Category name: {category.name}<input value={name} onChange={event => setName(event.target.value)} /></label>
    <button disabled={!name.trim() || duplicate}>Save category</button><button type="button" className="delete" onClick={() => onDelete(category.id)}>Delete category</button>
    {duplicate && <span role="alert">Category name already exists.</span>}
  </form>;
}
export default function App() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const completed = useSelector(selectCompletedTasks);
  const [filter, setFilter] = useState('all');
  const [categoryId, setCategoryId] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; });
  const duplicate = categories.some(c => c.name.toLowerCase() === name.trim().toLowerCase());
  function removeCategory(id) { dispatch(deleteCategory(id)); if (filter === id) setFilter('all'); if (categoryId === id) setCategoryId(''); }
  return <main><h1>Productivity Tracker</h1><p role="status">Completed tasks: {completed}</p>
    <section><h2>Log a task</h2><form onSubmit={event => { event.preventDefault(); if (text.trim() && date) { dispatch(addTask({ text, date, categoryId })); setText(''); } }}>
      <label>Task<input value={text} onChange={event => setText(event.target.value)} /></label>
      <label>Date<input type="date" required value={date} onChange={event => setDate(event.target.value)} /></label>
      <CategorySelector label="Task category" value={categoryId} onChange={setCategoryId} /><button disabled={!text.trim() || !date}>Add task</button>
    </form></section>
    <section><h2>Your tasks</h2><CategorySelector label="Filter category" includeAll value={filter} onChange={setFilter} /><TaskList categoryId={filter} /></section>
    <section><h2>Manage categories</h2><p>Deleting a category keeps its tasks as Uncategorized.</p>
      <form onSubmit={event => { event.preventDefault(); if (name.trim() && !duplicate) { dispatch(addCategory(name)); setName(''); } }}><label>New category<input value={name} onChange={event => setName(event.target.value)} /></label><button disabled={!name.trim() || duplicate}>Add category</button>{duplicate && <p role="alert">Category name already exists.</p>}</form>
      {categories.map(category => <CategoryEditor key={category.id} category={category} onDelete={removeCategory} />)}
    </section></main>;
}
