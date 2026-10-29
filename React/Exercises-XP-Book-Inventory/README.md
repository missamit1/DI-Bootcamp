# Book Inventory Selector

Run `npm ci` and `npm run dev`. Use the genre dropdown to view all books, Horror, Fantasy or Science Fiction.

`booksSlice.js` holds the initial inventory. `store.js` uses configureStore and its default middleware. `selectors.js` defines selectBooks and three module-level createSelector selectors. Each genre selector reuses its previous result when the books reference is unchanged. BookList passes the selected selector to useSelector. The dropdown selection is local UI state; inventory is Redux state.

Run `npm test` for filtering, empty data, cache reuse and recomputation checks. Run `npm run build` for a production build, and `npm run preview` to serve it.
