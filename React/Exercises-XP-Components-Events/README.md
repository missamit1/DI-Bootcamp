# React Components, Events and Hooks

One app contains all four exercises, using functional components under `src/Components`.

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. `npm run build` creates a production build, and `npm run preview` serves it.

- Car receives the Ford Mustang object from App, stores its color in state and renders a small Garage.
- Events demonstrates a click alert, an Enter-key alert and an ON/OFF toggle.
- Phone stores brand, model, color and year in state; its button changes black to blue.
- Color starts red and changes to blue. Its effect alerts `useEffect reached` on mount and when favoriteColor changes.

An alert on initial page load is intentional. The root omits StrictMode so the exercise's mount alert is shown once during development. JSX in `.js` files is supported by the Vite configuration.
