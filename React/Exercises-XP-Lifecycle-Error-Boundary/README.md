# React Lifecycle and Error Boundaries

All three exercises share one app.

```sh
npm ci
npm run dev
```

Open the displayed local URL. `npm run build` builds the app; `npm run preview` serves the build.

## Demonstrations

1. Each BuggyCounter starts at zero and throws `I crashed!` when its rendered value reaches five. A shared ErrorBoundary replaces both counters; separate boundaries isolate failures. The final counter is deliberately unprotected, so crashing it unmounts the entire app. Reload to restore the page.
2. The Color class starts red and changes to yellow after two seconds. The button changes it to blue. `shouldComponentUpdate` returns true. Updates log `in getSnapshotBeforeUpdate` followed by `after update`. Returning false would prevent the updated state from appearing in the DOM; state itself can still change.
3. Color also stores `show: true`. Delete hides Child, whose `componentWillUnmount` displays an alert. The timer is cleared when Color unmounts, or when blue is selected before the timer finishes.

ErrorBoundary sets error and stack details in componentDidCatch as requested, and also uses getDerivedStateFromError for the fallback render. Errors in the console are intentional. StrictMode is omitted to keep lifecycle demonstrations from repeating in development.

Reference: https://react.dev/reference/react/Component
