# Redux Toolkit Todo List

Run `npm ci`, then `npm run dev`. Open the local URL. `npm run build` builds the app; `npm run preview` serves it. `npm test` checks actions against a real Redux store.

- todoSlice.js uses createSlice with addTodo, toggleTodo and removeTodo reducers. IDs are generated with nanoid in the action prepare callback.
- store.js combines the slice with configureStore.
- main.jsx wraps the app in React-Redux Provider.
- TodoList uses useSelector to read todos. AddTodo and TodoItem use useDispatch to change them.

Add a task, mark its checkbox complete or active, and remove it. Whitespace-only tasks are rejected. State is in memory and resets on refresh.
