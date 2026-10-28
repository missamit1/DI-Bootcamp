# React Calculator

Run `npm ci`, then `npm run dev`. Open the local URL shown. `npm run build` creates a production build; `npm run preview` serves it. Run `npm test` for arithmetic checks.

Two number inputs are managed with React state. Addition is the default and its button says Add Them. The bonus selector also supports subtraction, multiplication and division. Results appear on the same page after clicking the button or pressing Enter.

Empty/invalid input, division by zero and numeric overflow show errors. Changing inputs clears the previous result. Decimal and negative values are supported. Display uses 12 significant digits to avoid common floating-point display artifacts; calculations use JavaScript numbers.
