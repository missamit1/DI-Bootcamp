import { useState } from 'react';
type Action = 'None' | 'Increment' | 'Decrement';
export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<Action>('None');
  function update(amount: number, action: Action): void {
    setCount(previous => previous + amount);
    setLastAction(action);
  }
  return <div><p role="status">Count: {count}</p><p>Last action: {lastAction}</p>
    <button onClick={() => update(1, 'Increment')}>Increment</button>
    <button onClick={() => update(-1, 'Decrement')}>Decrement</button></div>;
}
