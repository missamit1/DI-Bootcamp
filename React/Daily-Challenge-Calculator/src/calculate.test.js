import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from './calculate.js';
test('arithmetic and invalid inputs', () => {
  assert.equal(calculate('2', '3', 'add'), 5);
  assert.equal(calculate('-2.5', '1.25', 'add'), -1.25);
  assert.equal(calculate('2', '5', 'subtract'), -3);
  assert.equal(calculate('-3', '4', 'multiply'), -12);
  assert.equal(calculate('5', '2', 'divide'), 2.5);
  assert.equal(calculate('0', '5', 'add'), 5);
  assert.throws(() => calculate('', '1', 'add'), /both/);
  assert.throws(() => calculate('x', '1', 'add'), /valid/);
  assert.throws(() => calculate('1', '0', 'divide'), /zero/);
  assert.throws(() => calculate('1e308', '1e308', 'multiply'), /large/);
});
