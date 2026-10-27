# React Router, Error Boundaries and JSON

Run `npm ci`, then `npm run dev`. Open the local URL. `npm run build` creates the production build; `npm run preview` serves it.

## Exercises

1. Bootstrap navigation uses NavLink for Home, Profile and Shop. Each route has its own keyed ErrorBoundary. Shop intentionally throws; navigating Home or Profile recovers without reloading.
2. PostList renders the original supplied posts.json titles and contents.
3. Example1, Example2 and Example3 are class components rendering social media, nested skills and nested experiences from the original data.json. Mapped elements have stable keys.
4. App.js contains async postData using POST, JSON headers and the exact assignment payload. The button logs the Response and response text. Success and failure messages also appear on the page.

## Webhook

A CORS-enabled temporary test URL is prefilled. Request viewer: https://webhook.site/#!/d0bdeb90-2aab-43d3-af48-4c8fe184cab0

Free URLs expire. To replace it, visit https://webhook.site/, copy Your unique URL, enable CORS in Edit, and paste it into the application's URL field. Only the supplied demonstration data is sent. No API key is stored.

For a static deployment, configure a fallback to index.html for BrowserRouter paths.

References: https://reactrouter.com/6.30.1/components/nav-link and https://docs.webhook.site/api/tokens.html
