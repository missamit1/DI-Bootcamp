import Car from './Components/Car.js';
import Events from './Components/Events.js';
import Phone from './Components/Phone.js';
import Color from './Components/Color.js';
import './App.css';

const carinfo = { name: 'Ford', model: 'Mustang' };

export default function App() {
  return (
    <main>
      <h1>React Components and Events</h1>
      <section aria-label="Car"><h2>Exercise 1: Car</h2><Car carInfo={carinfo} /></section>
      <section aria-label="Events"><h2>Exercise 2: Events</h2><Events /></section>
      <section aria-label="Phone"><h2>Exercise 3: Phone</h2><Phone /></section>
      <section aria-label="Favorite color"><h2>Exercise 4: useEffect</h2><Color /></section>
    </main>
  );
}
