import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/person'; // default export can have any name;
import Message from './components/Message';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [messageContent, setMessageContent] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response);
      })
  }, [])

  // modified from FullstackOpen example anwser
  const message = (content) => {
    setMessageContent(content)
    setTimeout(() => {
      setMessageContent(null)
    }, 3000)
  }

  const handleDelete = (id) => {
    const existingPersonName = persons.find(person => person.id === id).name;
    // const name = persons.filter((person) => person.id === id)[0].name;
    if (window.confirm(`Delete ${existingPersonName}?`)) {
      personService.delete(id);
      setPersons(persons.filter(p => p.id !== id))
      message(`Deleted ${existingPersonName}`);
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setNewName('');
    setNewNumber('');

    const existingPerson = persons.find(person => person.name === newPerson.name);
    if (existingPerson) {
      const ok = window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      if (ok) {
        console.log('ok', ok);
        // example answer only puts 'newNumber' here, I wonder if it works, since it was set to '' previsouly
        personService
          .update(existingPerson.id, { ...existingPerson, number: newPerson.number })
          .then(response => {
            const savedPerson = response.data;
            // this looks like the step that I am looking for, which can update the data on page!
            setPersons(persons.map(p => p.id === existingPerson.id ? savedPerson : p))
            message(`Update info of ${savedPerson.name}`)
          });
      }
      return;
    }
    personService
      .create(newPerson)
      .then(response => {
        const savedPerson = response.data;
        setPersons(persons.concat(savedPerson));
        message(`Added ${savedPerson.name}`);
      })
      .catch(error => {
        console.log('error', error)
      })

  }

  // from FullStackOpen example answer
  const personsToShow = (filter.length === 0) ? persons :
    persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={messageContent} />
      {/* Filter is from FullStackOpen example answer */}
      <Filter
        value={filter}
        handleFilter={({ target }) => setFilter(target.value)}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={({ target }) => setNewName(target.value)}
        newNumber={newNumber}
        handleNumberChange={({ target }) => setNewNumber(target.value)} />
      <h1>Numbers</h1>
      <Person persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App