import { useEffect, useState } from 'react';

export default function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red');
  useEffect(() => {
    alert('useEffect reached');
  }, [favoriteColor]);

  return (
    <>
      <h3>My favorite color is {favoriteColor}</h3>
      <button onClick={() => setFavoriteColor('blue')}>Change favorite color</button>
    </>
  );
}
