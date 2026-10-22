# HTTP, Forms and JSON

## Run

From this directory, run `python3 -m http.server 8000` and open:

- http://localhost:8000/exercise1.html
- http://localhost:8000/exercise2.html
- http://localhost:8000/exercise3.html

Use HTTP rather than opening the HTML files with a `file://` URL.

## Exercise 1: GET

Enter a name and message, then click Send. The data appears in the URL query string, for example:

`exercise1.html?name=John&message=Hello`

In Developer Tools, the Network request also shows these values under Payload → Query String Parameters. The controls' `name` attributes supply the parameter names.

## Exercise 2: POST

The form has the same structure and sends its data to `exercise2.html` using POST. The values are in the HTTP request body, not appended to the URL. Open Developer Tools → Network before submitting, enable Preserve log, select the POST request, and inspect Payload → Form Data. The default encoding is `application/x-www-form-urlencoded`.

Python's simple static server does not handle POST and returns 501 Unsupported method. This is expected with that server: inspect the outgoing POST request to see the submitted data. A successful response requires a server that handles POST; the HTML file itself cannot process the request.

## Exercise 3: JSON Mario

`JSON.stringify(marioGame)` converts the JavaScript object into a JSON **string**. Its nested objects are serialized recursively, preserving their structure and numeric values. The original JavaScript object is unchanged. `JSON.parse(marioJSON)` would turn the string back into a JavaScript object.

`JSON.stringify(marioGame, null, 2)` produces the same data formatted with line breaks and two-space indentation. Both strings are logged in the Console; the formatted version is also displayed on the page.

### Inspect with a breakpoint

1. Open `exercise3.html` and Developer Tools → Sources (or Debugger in Firefox).
2. Open `exercise3.js` and click the line number beside `console.log(marioJSON)` to add a breakpoint.
3. Reload the page. Execution pauses after both JSON strings have been assigned.
4. Inspect `marioGame`, `marioJSON`, and `prettyMarioJSON` in Scope or Watch. `typeof marioJSON` and `typeof prettyMarioJSON` are both `"string"`; `marioGame` remains an object.
5. Evaluate `JSON.parse(marioJSON).characters.mario.height`: the result is `10`. Inspect the other nested characters too.
6. Resume execution to display the formatted JSON.

Reference: [MDN — Sending form data](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data).
