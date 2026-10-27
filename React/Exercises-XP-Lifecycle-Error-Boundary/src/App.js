import { Component } from 'react';
import ErrorBoundary from './ErrorBoundary.js';
import Color from './Color.js';
import './App.css';

export class BuggyCounter extends Component {
  state = { counter: 0 };

  handleClick = () => {
    this.setState(previous => ({ counter: previous.counter + 1 }));
  };

  render() {
    if (this.state.counter === 5) throw new Error('I crashed!');
    return <button className="counter" aria-label={this.props.label} onClick={this.handleClick}>{this.state.counter}</button>;
  }
}

export default function App() {
  return (
    <main>
      <h1>React Lifecycle and Error Boundaries</h1>
      <section>
        <h2>Exercise 1: Error boundaries</h2>
        <p>Click a counter five times to make it crash. Reload the page to reset the demonstrations.</p>
        <article aria-label="Simulation 1">
          <h3>Simulation 1: One shared boundary</h3>
          <p>If one counter crashes, both are replaced.</p>
          <ErrorBoundary>
            <BuggyCounter label="Shared counter 1" />
            <BuggyCounter label="Shared counter 2" />
          </ErrorBoundary>
        </article>
        <article aria-label="Simulation 2">
          <h3>Simulation 2: Separate boundaries</h3>
          <p>A crash affects only its own counter.</p>
          <ErrorBoundary><BuggyCounter label="Independent counter 1" /></ErrorBoundary>
          <ErrorBoundary><BuggyCounter label="Independent counter 2" /></ErrorBoundary>
        </article>
        <article aria-label="Simulation 3">
          <h3>Simulation 3: No boundary</h3>
          <p>This counter intentionally clears the entire app when it crashes. Reload to restore it.</p>
          <BuggyCounter label="Unprotected counter" />
        </article>
      </section>
      <Color />
    </main>
  );
}
