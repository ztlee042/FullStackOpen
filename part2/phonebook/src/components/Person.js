const Person = ({ persons, handleDelete }) => (
    persons.map((person) => <div className="person" key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></div>)
)

export default Person;