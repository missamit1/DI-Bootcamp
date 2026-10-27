# Type Guard with Union Types

Run `tsc -p .` to compile, then `node handle-data.js` to run the examples.

`handleData` accepts an array of `User | Product | Order` and returns one message per item in the original order. The type guards validate each object's discriminator and required properties before using it.

Invalid items from runtime data produce `Unknown or invalid data item.` without preventing valid items from being processed. An empty array returns an empty array. A non-array runtime input returns a descriptive error message. Numeric fields must be finite numbers.
