import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import Form from './Components/Form';
import People from './Components/People';
import noteService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    noteService.getAll().then(initialData => {
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

    noteService.create(personObj).then(newPerson => {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
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
      noteService
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
      noteService.edit(`${selPerson.id}`, newInfo).then(updatedInfo => {
        setPersons(
          persons.map(person =>
            person.id !== selPerson.id ? person : updatedInfo
          )
        );
        setNewName('');
        setNewNumber('');
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
