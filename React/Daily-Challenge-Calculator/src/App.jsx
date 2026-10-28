import React, { useState } from 'react';
import { calculate } from './calculate.js';
const buttonLabels = { add: 'Add Them', subtract: 'Subtract Them', multiply: 'Multiply Them', divide: 'Divide Them' };
export default function App() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  function change(setter, value) { setter(value); setResult(null); setError(''); }
  function handleSubmit(event) {
    event.preventDefault();
    try { setResult(calculate(first, second, operation)); setError(''); }
    catch (error) { setError(error.message); setResult(null); }
  }
  return (
    <main>
      <h1>React Calculator</h1>
      <p>Enter two numbers and choose an operation.</p>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="first">First number</label>
        <input id="first" type="number" step="any" value={first} onChange={event => change(setFirst, event.target.value)} />
        <label htmlFor="second">Second number</label>
        <input id="second" type="number" step="any" value={second} onChange={event => change(setSecond, event.target.value)} />
        <label htmlFor="operation">Operation</label>
        <select id="operation" value={operation} onChange={event => change(setOperation, event.target.value)}>
          <option value="add">Addition (+)</option><option value="subtract">Subtraction (−)</option>
          <option value="multiply">Multiplication (×)</option><option value="divide">Division (÷)</option>
        </select>
        <button type="submit">{buttonLabels[operation]}</button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="result" role="status">{result !== null ? `Result: ${Number(result.toPrecision(12))}` : 'Your result will appear here.'}</div>
    </main>
  );
}
