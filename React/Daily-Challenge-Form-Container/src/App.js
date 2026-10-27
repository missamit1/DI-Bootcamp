import { Component } from 'react';
import FormComponent from './FormComponent.js';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    this.state = {
      firstName: params.get('firstName') || '',
      lastName: params.get('lastName') || '',
      age: params.get('age') || '',
      gender: params.get('gender') || '',
      destination: params.get('destination') || '',
      nutsFree: params.get('nutsFree') === 'on',
      lactoseFree: params.get('lactoseFree') === 'on',
      vegan: params.get('vegan') === 'on',
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  render() {
    return <FormComponent title={this.props.title} data={this.state} handleChange={this.handleChange} />;
  }
}
