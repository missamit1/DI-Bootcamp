# Random Quote Generator

Run `npm ci`, then `npm run dev`. Open the printed URL. `npm run build` builds the app; `npm run preview` serves it. `npm test` checks the complete quote cycle.

Quotes come from https://github.com/devtlv/RandomQuotesProject-JSBOOTCAMP-Week8Day5. The supplied dataset is retained in QuotesDatabase.js. Duplicate quote text is removed when creating the pool.

The first quote is random. New quote draws randomly from the remaining unseen quotes and selects a different color for the background, quote heading, author and button. After the pool is exhausted, the button is disabled. Reloading starts a new session; quotes do not repeat within a session.
