import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './Components/Results';
import Information from './Components/Information';
import Weather from './Components/Weather';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all/').then(res => {
      setCountries(res.data);
    });
  }, []);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const setCountryInfo = () => {
    if (country.length === 0) {
      return;
    } else {
      return (
        <div>
          <Information result={country} />
          <Weather country={country} />
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        Find Countries: <input value={search} onChange={handleSearch} />
      </div>
      <Results
        countries={countries}
        search={search}
        country={country}
        setCountry={setCountry}
      />
      <div>{setCountryInfo()}</div>
    </div>
  );
}

export default App;
