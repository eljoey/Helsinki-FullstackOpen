import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addName = e => {
    e.preventDefault();

    if (checkName()) return;

    const personObj = {
      name: newName
    };
    setPersons(persons.concat(personObj));
    setNewName('');
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};
export default App;
