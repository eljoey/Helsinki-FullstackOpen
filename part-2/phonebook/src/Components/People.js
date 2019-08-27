import React from 'react';

const People = props => {
  const searchPersons = string => {
    return props.persons
      .filter(person =>
        person.name.toLowerCase().includes(string.toLowerCase())
      )
      .map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ));
  };
  return searchPersons(props.search);
};

export default People;
