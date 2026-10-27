import UserFavoriteAnimals from './UserFavoriteAnimals.js';
import Exercise from './Exercise3.js';
import './App.css';

const myelement = <h1>I Love JSX!</h1>;
const sum = 5 + 5;
const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
};

export default function App() {
  return (
    <main>
      <section aria-label="Exercise 1: JSX">
        <h2>Exercise 1: JSX</h2>
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
      </section>
      <section aria-label="Exercise 2: Objects and props">
        <h2>Exercise 2: Objects and props</h2>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </section>
      <Exercise />
    </main>
  );
}
