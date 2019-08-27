import React, { useState } from 'react';
import Filter from './Components/Filter';
import Form from './Components/Form';
import People from './Components/People';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const addName = e => {
    e.preventDefault();

    //Checks if name was already added (isn't case sensitive)
    if (checkName()) return;

    const personObj = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(personObj));
    setNewName('');
    setNewNumber('');
  };

  const handleNewName = e => {
    setNewName(e.target.value);
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
