import React, { useEffect } from 'react';
import Information from './Information';

const Display = ({ countries, search }) => {
  const searchResult = countries.filter(country =>
    country.name.toLowerCase().includes(search)
  );

  if (searchResult.length === 0) {
    return <div>Start your search by typing in the searchbox</div>;
  } else if (searchResult.length > 10) {
    return <div>Too many matches, narrow your search</div>;
  } else if (searchResult.length > 1) {
    return searchResult.map((country, index) => {
      return <div key={country.alpha2Code}>{country.name}</div>;
    });
  } else {
    return <Information result={searchResult[0]} />;
  }
};

export default Display;
