import React from 'react';

const People = props => {
  const searchPersons = string => {
    return props.persons
      .filter(person =>
        person.name.toLowerCase().includes(string.toLowerCase())
      )
      .map(person => (
        <div key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => props.handleClick(person.id)}>Delete</button>
        </div>
      ));
  };
  return searchPersons(props.search);
};

export default People;
