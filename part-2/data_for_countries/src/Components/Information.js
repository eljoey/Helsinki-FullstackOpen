import React from 'react';

const Information = ({ result }) => {
  const showInfo = obj => {
    return (
      <div key={obj.alpha2Code}>
        <h1>{obj.name}</h1>
        <div>Capital: {obj.capital}</div>
        <div>Population: {obj.population}</div>
        <h2>Languages</h2>
        <ul>{languages(obj.languages)}</ul>
        <img
          src={obj.flag}
          alt="This countries flag"
          width="200"
          height="100"
        />
      </div>
    );
  };

  const languages = arr => {
    return arr.map(language => <li key={language.name}>{language.name}</li>);
  };
  return <div>{showInfo(result)}</div>;
};

export default Information;
