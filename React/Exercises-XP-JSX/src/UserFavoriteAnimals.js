import { Component } from 'react';

export default class UserFavoriteAnimals extends Component {
  render() {
    return (
      <ul>
        {this.props.favAnimals.map((animal, index) => <li key={index}>{animal}</li>)}
      </ul>
    );
  }
}
