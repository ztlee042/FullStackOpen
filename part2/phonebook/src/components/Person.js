const Person = ({ persons, handleDelete }) => (
    persons.map((person) => <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></div>)
)

export default Person;