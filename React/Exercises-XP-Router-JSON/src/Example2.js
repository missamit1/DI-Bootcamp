import { Component } from 'react';
import data from './data/data.json';
export default class Example2 extends Component {
  render() {
    return <>{data.Skills.map(skill => (
      <div key={skill.Area}>
        <h3>{skill.Area}</h3>
        <ul>{skill.SkillSet.map(item => <li key={item.Name}>{item.Name}</li>)}</ul>
      </div>
    ))}</>;
  }
}
