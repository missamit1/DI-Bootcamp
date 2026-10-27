import { Component } from 'react';

export class Child extends Component {
  componentWillUnmount() {
    alert('The component named Child is about to be unmounted.');
  }

  render() {
    return <h3>Hello World!</h3>;
  }
}

export default class Color extends Component {
  state = { favoriteColor: 'red', show: true };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 2000);
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate(previousProps, previousState) {
    console.log('in getSnapshotBeforeUpdate');
    return previousState.favoriteColor;
  }

  componentDidUpdate() {
    console.log('after update');
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  changeColor = () => {
    clearTimeout(this.timer);
    this.setState({ favoriteColor: 'blue' });
  };

  deleteChild = () => this.setState({ show: false });

  render() {
    return (
      <>
        <section aria-label="Updating lifecycle">
          <h2>Exercise 2: Updating</h2>
          <h3>My favorite color is {this.state.favoriteColor}</h3>
          <p>The color changes to yellow after two seconds. Open the console to see the lifecycle messages.</p>
          <button onClick={this.changeColor}>Change color to blue</button>
        </section>
        <section aria-label="Unmounting lifecycle">
          <h2>Exercise 3: Unmounting</h2>
          {this.state.show && <Child />}
          <button onClick={this.deleteChild} disabled={!this.state.show}>Delete</button>
        </section>
      </>
    );
  }
}
