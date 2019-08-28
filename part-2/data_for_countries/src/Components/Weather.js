import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});
  //wouldnt work when its false. assuming its because it goes through once
  //and because its false the render below would cause it to break
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let apiURL =
      'http://api-cdn.apixu.com/v1/current.json?key=f6b84ad54c2544f5afe103205192808&q=' +
      country.name;

    setLoading(true);
    axios.get(apiURL).then(res => {
      setWeather(res.data);
      setLoading(false);
    });
  }, [country]);

  return (
    <div>
      <h2>Weather in Helsinki</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Temperature: {weather.current.temp_f} Fahrenheit</div>
          <img src={weather.current.condition.icon} alt="" />
          <div>
            Wind: {weather.current.wind_mph} mph direction{' '}
            {weather.current.wind_dir}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
