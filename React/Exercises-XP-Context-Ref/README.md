# React Exercises: Context and Ref

```sh
npm ci
npm run dev
```

Open the local URL. `npm run build` creates a production build, and `npm run preview` serves it.

## Exercise 1

ThemeProvider uses useState to hold light/dark mode and exposes the theme and toggle function through ThemeContext. ThemeSwitcher, App and CharacterCounter use useContext to apply the current theme. Switching themes preserves the text and character count.

## Exercise 2

CharacterCounter attaches a useRef to its input. Its onInput handler reads inputRef.current.value.length and updates the displayed count with useState. Typing, pasting and deleting update the count immediately; an empty field shows zero. Counting follows JavaScript string.length, as specified, including spaces and UTF-16 code units.
