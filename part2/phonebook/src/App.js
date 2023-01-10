import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    const name = event.target.value;
    let findings = persons.filter((person) => person.name === name);
    if (findings.length > 0) {
      alert(`${name} is already added to phonebook`);
    } else { setNewName(name); }
  }

  const handleNumberChange = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject));
    setNewName('');
  }

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
  }, [])
  console.log('render', persons.length, 'persons');

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Person persons={persons} />
    </div>
  )
}

export default App