import React from 'react';

const Results = ({ countries, search, country, setCountry }) => {
  const searchResult = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  //Ugly handling of search. Hardest part was getting the button to display what I wanted.
  //Eventually got it working by setting the country with handleClick and then displaying country in main App.js
  if (searchResult.length === 0) {
    return <div>Start your search by typing in the searchbox</div>;
  } else if (searchResult.length > 10) {
    return <div>Too many matches, narrow your search</div>;
  } else if (searchResult.length > 1) {
    return searchResult.map(country => {
      return (
        <div key={country.alpha2Code}>
          {country.name}
          <button onClick={() => setCountry(country)}>Show</button>
        </div>
      );
    });
  } else {
    setCountry(searchResult[0]);
    return null;
  }
};

export default Results;
