# Generic Book List with React and TypeScript

Run `npm ci`, then `npm run dev`. Open the printed URL. `npm run build` checks TypeScript and creates the production build. `npm run lint` checks the source.

The Book type defines id, title and author. BookApp uses useState<Book[]> with three initial entries. addBook validates the fields, creates a UUID and appends the new book without mutating existing state.

List<T> accepts items, renderItem and getKey. It does not depend on the Book type: another item type can provide its own renderer and stable key. BookApp passes a custom book renderer. Empty and whitespace-only inputs are rejected, and successful submissions reset the form. Books are stored in memory and reset on refresh.
