import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/person'; // default export can have any name;
import person from './services/person';
import Message from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null);

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNewName(name);
    // let findings = persons.filter((person) => person.name === name);
    // if (findings.length > 0) {
    //   alert(`${name} is already added to phonebook`);
    // } else { setNewName(name); }
  }

  const handleNumberChange = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  }

  const handleDelete = (id) => {
    const name = persons.filter((person) => person.id === id)[0].name;
    if (window.confirm(`Delete ${name}?`)) {
      personService.delete(id);
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    const findings = persons.filter((person) => person.name === newName);
    if (findings.length > 0) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = findings[0].id;
        person.update(id, personObject);
        setNewName('');
        setNewNumber('');
        // refresh automatically?
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setMessage(`Added ${personObject.name}`);
          setNewName('');
          setNewNumber('');
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={message} />
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h1>Numbers</h1>
      <Person persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App