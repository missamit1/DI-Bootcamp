import { Component } from 'react';
import './Exercise.css';
import landscape from './landscape.svg';

export default class Exercise extends Component {
  render() {
    const style_header = {
      color: 'white',
      backgroundColor: 'DodgerBlue',
      padding: '10px',
      fontFamily: 'Arial',
    };

    return (
      <section aria-label="Exercise 3: HTML tags and styling">
        <h2>Exercise 3: HTML tags and styling</h2>
        <h1 style={{ color: 'red', backgroundColor: 'lightblue' }}>Part I: Inline styling</h1>
        <h1 style={style_header}>Part II: This is a Header</h1>
        <p className="para">This is a Paragraph</p>
        <a href="https://react.dev/">Learn about React</a>
        <h3>This is a Form</h3>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name">Enter your name:</label>
          <input id="name" name="name" type="text" />
          <button type="submit">Submit</button>
        </form>
        <h3>This is an Image</h3>
        <img src={landscape} alt="Sun above green hills under a blue sky" width="360" height="180" />
        <h3>This is a List</h3>
        <ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>
      </section>
    );
  }
}
