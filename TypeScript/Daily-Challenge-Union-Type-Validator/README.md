# Union Type Validator

`validateUnionType(value: any, allowedTypes: string[]): boolean` loops through the allowed type names and compares each one with `typeof value`.

Run `tsc -p .` to compile, then `node validator.js` to run the examples.

Expected output: `true`, `true`, `false`, `true`, `true`, `true`, `false` (one per line).

Type names follow JavaScript's `typeof` behavior: arrays and `null` are `"object"`; functions are `"function"`. An empty allowed-types list returns `false`.
