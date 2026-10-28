import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drawQuote, uniqueQuotes, colors } from './quotePicker.js';
test('all quotes are drawn once, with a different color each time', () => {
  let remaining = uniqueQuotes;
  let color = '';
  const seen = new Set();
  while (remaining.length) {
    const before = remaining.length;
    const next = drawQuote(remaining, color);
    assert.ok(!seen.has(next.quote.quote.trim()));
    seen.add(next.quote.quote.trim());
    assert.notEqual(next.color, color);
    assert.ok(colors.includes(next.color));
    assert.equal(remaining.length, before);
    assert.equal(next.remaining.length, before - 1);
    ({ remaining, color } = next);
  }
  assert.equal(seen.size, uniqueQuotes.length);
  assert.equal(drawQuote([], color), null);
});
