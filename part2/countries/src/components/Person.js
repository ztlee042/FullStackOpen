const Person = ({ persons }) => (
    persons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)
)

export default Person;