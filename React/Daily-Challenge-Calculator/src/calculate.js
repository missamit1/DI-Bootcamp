export function calculate(first, second, operation) {
  if (first.trim() === '' || second.trim() === '') throw new Error('Enter both numbers.');
  const a = Number(first);
  const b = Number(second);
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('Enter valid finite numbers.');
  let result;
  switch (operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide':
      if (b === 0) throw new Error('Cannot divide by zero.');
      result = a / b;
      break;
    default: throw new Error('Choose a valid operation.');
  }
  if (!Number.isFinite(result)) throw new Error('The result is too large.');
  return result;
}
