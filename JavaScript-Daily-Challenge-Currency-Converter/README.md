# Currency Converter

Run `python3 -m http.server 8000` in this directory, then visit http://localhost:8000.

Create a free account at https://app.exchangerate-api.com/sign-up, confirm your email and copy your API key from the dashboard. Enter the key on the page and click **Load currencies**. Choose From and To currencies, enter an amount, then click **Convert**. The switch button reverses the currencies and converts the same amount again.

The app uses async/await and fetch with the required `/codes` and `/pair/BASE/TARGET` endpoints. The pair rate is multiplied by the entered amount. Loading, timeout, network and API errors are displayed on the page.

The key is kept only in browser memory for this page session, not saved in local storage or the repository. Reloading requires entering it again. As in any client-side API app, it is visible in your browser's network requests. Do not hardcode a personal key into the source files.

Browser behavior is tested with simulated API responses. Live authenticated conversion requires your own valid API key.
