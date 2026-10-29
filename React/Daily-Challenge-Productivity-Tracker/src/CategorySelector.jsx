import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategories } from './selectors.js';
export default function CategorySelector({ value, onChange, label, includeAll = false }) {
  const categories = useSelector(selectCategories);
  return <label>{label}<select aria-label={label} value={value} onChange={event => onChange(event.target.value)}>
    {includeAll && <option value="all">All categories</option>}
    <option value="">Uncategorized</option>
    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
  </select></label>;
}
