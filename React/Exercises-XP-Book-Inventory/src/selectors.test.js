import { test } from 'node:test';
import assert from 'node:assert/strict';
import { store } from './store.js';
import { selectBooks, selectHorrorBooks, selectFantasyBooks, selectScienceFictionBooks } from './selectors.js';
test('all books and each genre are selected correctly', () => {
  const state = store.getState();
  assert.equal(selectBooks(state).length, 6);
  for (const [selector, ids] of [[selectHorrorBooks, [1, 2]], [selectFantasyBooks, [3, 4]], [selectScienceFictionBooks, [5, 6]]]) {
    assert.deepEqual(selector(state).map(book => book.id), ids);
    assert.deepEqual(selector({ inventory: { books: [] } }), []);
  }
});
test('selectors reuse cached arrays when books are unchanged and recompute for new books', () => {
  const state = store.getState();
  for (const selector of [selectHorrorBooks, selectFantasyBooks, selectScienceFictionBooks]) {
    const result = selector(state);
    const count = selector.recomputations();
    assert.equal(selector(state), result);
    assert.equal(selector({ ...state, unrelated: true }), result);
    assert.equal(selector.recomputations(), count);
    const updated = { inventory: { books: state.inventory.books.filter(book => book.id !== result[0].id) } };
    assert.equal(selector(updated).length, result.length - 1);
    assert.equal(selector.recomputations(), count + 1);
    assert.equal(selectBooks(state).length, 6);
  }
});
