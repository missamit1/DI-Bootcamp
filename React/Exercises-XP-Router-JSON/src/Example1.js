import { Component } from 'react';
import data from './data/data.json';
export default class Example1 extends Component {
  render() {
    return <ul>{data.SocialMedias.map(url => <li key={url}><a href={url}>{url}</a></li>)}</ul>;
  }
}
