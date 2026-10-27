# React Form Container

```sh
npm ci
npm run dev
```

Open http://localhost:3000 (or the URL Vite prints if the port is occupied). `npm run build` builds the app and `npm run preview` serves the build.

App.js is a stateful class component receiving a title prop. It passes state and handleChange to FormComponent. handleChange reads event.target and uses a ternary to store checkbox checked values or other input values. The entered-information section updates immediately.

Submitting uses a native GET form. Checked checkboxes submit `on`, unchecked ones are omitted. Input names and ordering match the assignment example:

```text
/?firstName=John&lastName=Doe&age=25&gender=male&destination=Japan&lactoseFree=on
```

The app reads query parameters on load, preserving the submitted form and preview after navigation. Layout and fields follow the supplied screenshots, including nuts-free, lactose-free and vegan choices.
