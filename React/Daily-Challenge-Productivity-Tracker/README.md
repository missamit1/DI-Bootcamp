# Productivity Tracker

Run `npm ci`, `npm run dev`. Run `npm test` for Redux and selector checks; `npm run build` builds the application.

Log dated tasks, assign categories, filter, edit or delete tasks, and set progress from 0–100%. The completion checkbox sets progress to 100% (or resets it to 0%). The completed count covers all tasks. Add, rename and delete categories; deleted categories leave tasks intact as Uncategorized. Blank text and duplicate category names are rejected.

Redux Toolkit manages tasks and categories. Module-level createSelector selectors filter tasks by category, count completed tasks and find category details. TaskList uses useCallback for editing, progress and deletion handlers, with memoized task rows. State is stored in memory and resets on refresh.
