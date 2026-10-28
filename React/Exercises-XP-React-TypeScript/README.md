# React + TypeScript Exercises XP

Created using `npm create vite@latest -- --template react-ts`. The app retains a Vite + React welcome section and adds all four component exercises.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. `npm run build` runs TypeScript checks and builds the app. `npm run lint` checks the source. `npm run preview` serves the build.

- Greeting.tsx: required typed name and messageCount props.
- Counter.tsx: numeric counter state and a union type for the last action, with increment/decrement buttons.
- UserCard.tsx: optional name, age and role with defaults; examples include full, partial, empty props and age zero.
- UserList.tsx: typed users from https://jsonplaceholder.typicode.com/users, loading and error states, runtime response validation and cancellation when unmounted.

TypeScript strict mode is enabled. Loading live users requires internet access.
