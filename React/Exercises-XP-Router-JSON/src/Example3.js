import { Component } from 'react';
import data from './data/data.json';
export default class Example3 extends Component {
  render() {
    return <>{data.Experiences.map(experience => (
      <div key={experience.companyName} className="experience mb-4">
        <img src={experience.logo} alt={`${experience.companyName} logo`} width="100" height="80" />
        <h3><a href={experience.url}>{experience.companyName}</a></h3>
        {experience.roles.map(role => (
          <div key={`${role.title}-${role.startDate}`}>
            <h4>{role.title}</h4>
            <p>{role.startDate} – {role.endDate} | {role.location}</p>
            <p>{role.description}</p>
          </div>
        ))}
      </div>
    ))}</>;
  }
}
