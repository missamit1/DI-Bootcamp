# RSS Facts Feed — EJS

Run `npm ci`, then `npm start`, and open http://localhost:3000. Set `PORT` to choose another port.

The home page loads all current posts from https://thefactfile.org/feed/. The search page initially shows no posts and provides separate POST forms for a case-insensitive title search and exact category matching. Categories are populated from the feed.

Axios downloads the feed with a timeout; rss-parser converts the XML to objects. Express renders the EJS templates. Feed text is escaped rather than rendered as untrusted HTML, and article links allow only HTTP/HTTPS.

The assignment mentions The Fact Site for article links but specifies The Fact File as its feed source. This app preserves the actual article links supplied by The Fact File.

An upstream failure displays an error instead of crashing. `npm test` checks all four routes using a small test feed without relying on the external site's availability.
