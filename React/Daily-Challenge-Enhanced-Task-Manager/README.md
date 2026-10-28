# Enhanced Task Manager

Run `npm ci` and `npm run dev`. Open the displayed URL. `npm run build` builds the app; `npm run preview` serves it.

Add tasks, toggle completion, click task text or Edit to edit, Save or Enter to confirm, Cancel or Escape to discard, and Delete to remove a task. All/Active/Completed filters preserve the full task collection.

TaskContext shares useReducer state. Reducer actions include ADD_TASK, TOGGLE_TASK, DELETE_TASK, EDIT_TASK and FILTER_TASKS. TaskItem uses useRef to focus/select the edit input and read the updated text on save. Empty and whitespace-only tasks are rejected. State is in memory and resets when the page is refreshed.
