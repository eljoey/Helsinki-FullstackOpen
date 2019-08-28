import React from 'react';

const Display = ({ countries, search }) => {
  const searchResult = countries.filter(country =>
    country.name.toLowerCase().includes(search)
  );
  console.log(searchResult);

  const languages = arr => {
    return arr.map(language => <li key={language.name}>{language.name}</li>);
  };

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
          width="100"
          height="100"
        />
      </div>
    );
  };

  if (searchResult.length === 0) {
    return <div>Start your search by typing in the searchbox</div>;
  } else if (searchResult.length > 10) {
    return <div>Too many matches, narrow your search</div>;
  } else if (searchResult.length > 1) {
    return searchResult.map(country => (
      <div key={country.alpha2Code}>{country.name}</div>
    ));
  } else {
    return searchResult.map(country => showInfo(country));
  }
};

export default Display;
