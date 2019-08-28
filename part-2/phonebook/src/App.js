import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import Form from './Components/Form';
import People from './Components/People';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {
      setPersons(res.data);
    });
  }, []);

  const addName = e => {
    e.preventDefault();

    //Checks if name was already added (isn't case sensitive)
    if (checkName()) return;

    const personObj = {
      name: newName,
      number: newNumber
    };

    axios.post('http://localhost:3001/persons', personObj).then(res => {
      setPersons(persons.concat(res.data));
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
      alert(`${newName} was already added to phonebook`);
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
      <People search={search} persons={persons} />
    </div>
  );
};
export default App;
