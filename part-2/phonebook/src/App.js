import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import Form from './Components/Form';
import People from './Components/People';
import personService from './services/persons';
import Notification from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialData => {
      setPersons(initialData);
    });
  }, []);

  const addName = e => {
    e.preventDefault();

    //Checks if name was already added (isn't case sensitive) then asks if they want to update number
    if (checkName()) {
      handleNewPhone();
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber
    };

    personService
      .create(personObj)
      .then(newPerson => {
        setMessage({
          message: `Added ${personObj.name}`,
          type: 'success'
        });
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');

        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch(error => {
        setMessage({
          message: error.response.data.error,
          type: 'error'
        });
      });
  };

  const checkName = () => {
    if (
      persons
        .map(person => person.name.toLowerCase())
        .includes(newName.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleNewName = e => {
    setNewName(e.target.value);
  };
  const handleSearch = e => {
    setSearch(e.target.value);
  };
  const handleNewNumber = e => {
    setNewNumber(e.target.value);
  };

  const handleClick = id => {
    const selPerson = persons.find(person => person.id === id);
    const newList = persons.filter(person => person.id !== id);

    if (window.confirm(`Delete ${selPerson.name}?`)) {
      personService
        .delObj(id)
        .then(res => setPersons(newList))
        .catch(`${selPerson.name} was already deleted from the phonebook`);
    }
  };

  const handleNewPhone = () => {
    const selPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );
    const newInfo = { ...selPerson, number: newNumber };

    if (
      window.confirm(
        `${newName} is already added, replace the old number with the new one?`
      )
    ) {
      personService
        .update(selPerson.id, newInfo)
        .then(updatedInfo => {
          setPersons(
            persons.map(person =>
              person.id !== selPerson.id ? person : updatedInfo
            )
          );
          setNewName('');
          setNewNumber('');
        })
        .catch(err => {
          setMessage({
            message: `Information of ${selPerson.name} has already been removed from the server`,
            type: 'error'
          });
          setPersons(persons.filter(person => person.id !== selPerson.id));
          setNewName('');
          setNewNumber('');

          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add New Person</h2>
      <Form
        handleSubmit={addName}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <People search={search} persons={persons} handleClick={handleClick} />
    </div>
  );
};
export default App;
