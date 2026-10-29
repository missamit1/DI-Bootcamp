import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore, addTask, editTask, deleteTask, addCategory, editCategory, deleteCategory, updateTaskProgress } from './store.js';
import { selectTasksByCategory, selectCompletedTasks, selectCategoryById } from './selectors.js';
test('task/category CRUD, progress and category deletion preserve task data', () => {
 const store=createStore(); const dispatch=store.dispatch; const state=()=>store.getState();
 dispatch(addCategory('Study'));const category=state().tracker.categories.at(-1);
 dispatch(editCategory({id:category.id,name:'Learning'}));assert.equal(selectCategoryById(state(),category.id).name,'Learning');
 dispatch(addCategory('learning'));assert.equal(state().tracker.categories.length,3);
 dispatch(addTask({text:'Read',categoryId:category.id,date:'2026-10-29'}));const task=state().tracker.tasks[0];
 dispatch(editTask({id:task.id,text:'Read book'}));dispatch(updateTaskProgress({id:task.id,progress:50}));assert.equal(selectCompletedTasks(state()),0);
 dispatch(updateTaskProgress({id:task.id,progress:100}));assert.equal(selectCompletedTasks(state()),1);
 const selected=selectTasksByCategory(state(),category.id);const count=selectTasksByCategory.recomputations();
 dispatch(editCategory({id:category.id,name:'Study again'}));assert.equal(selectTasksByCategory(state(),category.id),selected);assert.equal(selectTasksByCategory.recomputations(),count);
 dispatch(deleteCategory(category.id));assert.equal(state().tracker.tasks[0].text,'Read book');assert.equal(selectTasksByCategory(state(),'').length,1);assert.equal(selectCategoryById(state(),category.id),undefined);
 dispatch(updateTaskProgress({id:task.id,progress:0}));assert.equal(selectCompletedTasks(state()),0);
 dispatch(deleteTask(task.id));assert.deepEqual(state().tracker.tasks,[]);
 dispatch(addTask({text:'  ',categoryId:'',date:'2026-10-29'}));assert.deepEqual(state().tracker.tasks,[]);
});
