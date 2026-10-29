# Daily Planner with React-Redux

Run `npm ci`, then `npm run dev`. `npm test` checks day-specific Redux actions; `npm run build` builds the app; `npm run preview` serves it.

The Redux Toolkit store holds selectedDay and a tasksByDay object keyed by YYYY-MM-DD. Calendar selects the day; TaskList reads its tasks using useSelector. AddTask, EditTask and DeleteTask dispatch addTask, editTask and deleteTask with an explicit day and unique task ID.

Choose a date, add tasks, edit/save or cancel, and delete. Blank task text is rejected. Moving between days retains saved tasks and discards unsaved form edits. The initial selection uses the local calendar date. Tasks are in memory and reset on page refresh.
