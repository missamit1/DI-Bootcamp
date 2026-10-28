import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import Greeting from './Greeting';
import Counter from './Counter';
import UserCard from './UserCard';
import UserList from './UserList';
import './App.css';
export default function App() {
  return <main>
    <header><img src={viteLogo} alt="Vite logo" /><img src={reactLogo} alt="React logo" /><h1>Vite + React + TypeScript</h1><p>Welcome! Five React and TypeScript exercises.</p></header>
    <section><h2>Exercise 2: Typed props</h2><Greeting name="Amit" messageCount={3} /></section>
    <section><h2>Exercise 3: Typed state</h2><Counter /></section>
    <section aria-label="Optional props"><h2>Exercise 4: Optional props</h2><div className="cards"><UserCard name="Amit" age={25} role="Student" /><UserCard name="Bob" /><UserCard /><UserCard name="Newborn" age={0} /></div></section>
    <section aria-label="API users"><h2>Exercise 5: Users from the API</h2><UserList /></section>
  </main>;
}
