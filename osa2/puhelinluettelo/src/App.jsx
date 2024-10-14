import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value)
    setNewPhoneNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameAlreadyExists = persons.some(person => person.name === newName)
    if (nameAlreadyExists) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const person = persons.find(person => person.name === newName)
        const changedPersonPhoneNumber = { ...person, number: newPhoneNumber }
        personService
          .update(person.id, changedPersonPhoneNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewPhoneNumber('')
            setNotification({ message: `Changed number for ${person.name}`, type: 'information' })
            setTimeout(() => {
              setNotification({ message: null, type: null })
            }, 5000)
          })
          .catch(error => {
            console.error(error)
            setNotification({ message: `Information of ${person.name} has already been removed from the server`, type: 'error' })
            setPersons(persons.filter(p => p.id !== person.id))
            setTimeout(() => {
              setNotification({ message: null, type: null })
            }, 5000)
          })
      }
    } else {

      const personObject = {
        name: newName,
        number: newPhoneNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhoneNumber('')
          setNotification({ message: `Added ${returnedPerson.name}`, type: 'information' })
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
        })
    }
  }

  const erasePerson = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({ message: `Deleted ${person.name}`, type: 'information' })
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
        })
    }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhoneNumber={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange} />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={personsToShow} erasePerson={erasePerson} />
      </ul>
    </div>
  )

}

export default App