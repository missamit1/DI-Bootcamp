import { createSelector } from '@reduxjs/toolkit';
export const selectTasks = state => state.tracker.tasks;
export const selectCategories = state => state.tracker.categories;
export const selectTasksByCategory = createSelector([selectTasks, (_state, categoryId) => categoryId], (tasks, categoryId) => categoryId === 'all' ? tasks : tasks.filter(task => task.categoryId === categoryId));
export const selectCompletedTasks = createSelector([selectTasks], tasks => tasks.filter(task => task.progress === 100).length);
export const selectCategoryById = createSelector([selectCategories, (_state, id) => id], (categories, id) => categories.find(category => category.id === id));
