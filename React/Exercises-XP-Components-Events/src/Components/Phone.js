import { useState } from 'react';

export default function Phone() {
  const [brand] = useState('Samsung');
  const [model] = useState('Galaxy S20');
  const [color, setColor] = useState('black');
  const [year] = useState(2020);
  const changeColor = () => setColor('blue');

  return (
    <>
      <h3>My phone is a {brand}</h3>
      <p>It is a {color} {model} from {year}.</p>
      <button onClick={changeColor}>Change phone color</button>
    </>
  );
}
