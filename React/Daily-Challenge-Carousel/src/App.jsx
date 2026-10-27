import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

const destinations = [
  { name: 'Hong Kong', image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg' },
  { name: 'Macao', image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp' },
  { name: 'Japan', image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp' },
  { name: 'Las Vegas', image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp' },
];

export default function App() {
  return (
    <main className="container py-4 py-md-5">
      <h1 className="text-center mb-4">Travel Carousel</h1>
      <div className="travel-carousel mx-auto">
        <Carousel
          ariaLabel="Travel destinations"
          showThumbs
          showStatus
          infiniteLoop
          useKeyboardArrows
          swipeable
          emulateTouch
          labels={{ leftArrow: 'Previous destination', rightArrow: 'Next destination', item: 'Destination' }}
        >
          {destinations.map(destination => (
            <div key={destination.name}>
              <img src={destination.image} alt={destination.name} />
              <p className="legend">{destination.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </main>
  );
}
