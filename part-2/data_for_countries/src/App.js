import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './Components/Display';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all/').then(res => {
      setCountries(res.data);
    });
  }, []);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div>
        Find Countries: <input value={search} onChange={handleSearch} />
      </div>
      <Display countries={countries} search={search} />
    </div>
  );
}

export default App;
