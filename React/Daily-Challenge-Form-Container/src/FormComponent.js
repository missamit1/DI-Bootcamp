export default function FormComponent({ title, data, handleChange }) {
  return (
    <main>
      <h1>{title}</h1>
      <form method="get" action="/">
        <label className="visually-hidden" htmlFor="firstName">First Name</label>
        <input className="text-input" id="firstName" name="firstName" placeholder="First Name" value={data.firstName} onChange={handleChange} />
        <label className="visually-hidden" htmlFor="lastName">Last Name</label>
        <input className="text-input" id="lastName" name="lastName" placeholder="Last Name" value={data.lastName} onChange={handleChange} />
        <label className="visually-hidden" htmlFor="age">Age</label>
        <input className="text-input" id="age" name="age" type="number" min="0" step="1" placeholder="Age" value={data.age} onChange={handleChange} />
        <fieldset className="gender">
          <legend className="visually-hidden">Gender</legend>
          <label><input type="radio" name="gender" value="male" checked={data.gender === 'male'} onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="female" checked={data.gender === 'female'} onChange={handleChange} /> Female</label>
        </fieldset>
        <label className="destination-label" htmlFor="destination">Select your destination</label>
        <select id="destination" name="destination" value={data.destination} onChange={handleChange}>
          <option value="">-- Please Choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="Thailand">Thailand</option>
          <option value="Brazil">Brazil</option>
        </select>
        <fieldset className="diet">
          <legend>Dietary restrictions:</legend>
          <label><input type="checkbox" name="nutsFree" checked={data.nutsFree} onChange={handleChange} /> Nuts free</label>
          <label><input type="checkbox" name="lactoseFree" checked={data.lactoseFree} onChange={handleChange} /> Lactose free</label>
          <label><input type="checkbox" name="vegan" checked={data.vegan} onChange={handleChange} /> Vegan</label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <section className="entered" aria-labelledby="entered-title">
        <h2 id="entered-title">Entered information:</h2>
        <p>Your name: {data.firstName} {data.lastName}</p>
        <p>Your age: {data.age}</p>
        <p>Your gender: {data.gender}</p>
        <p>Your destination: {data.destination}</p>
        <p>Your dietary restrictions:</p>
        <ul>
          <li>**Nuts free : {data.nutsFree ? 'Yes' : 'No'}</li>
          <li>**Lactose free : {data.lactoseFree ? 'Yes' : 'No'}</li>
          <li>**Vegan meal : {data.vegan ? 'Yes' : 'No'}</li>
        </ul>
      </section>
    </main>
  );
}
