import React, { useState } from 'react';

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

  const handleNewNumber = e => {
    setNewNumber(e.target.value);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const searchPersons = string => {
    return persons
      .filter(person =>
        person.name.toLowerCase().includes(string.toLowerCase())
      )
      .map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name <input value={search} onChange={handleSearch} />
      </div>

      <h1>Add New Person</h1>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchPersons(search)}
    </div>
  );
};
export default App;
