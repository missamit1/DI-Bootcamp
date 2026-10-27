import { useState } from 'react';
import Garage from './Garage.js';

export default function Car({ carInfo }) {
  const [color] = useState('red');
  return (
    <>
      <h3>This car is {color} {carInfo.model}</h3>
      <Garage size="small" />
    </>
  );
}
