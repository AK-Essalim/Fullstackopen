import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city, country }) => {
  const [weather, setWeather] = useState({});
  const [isWeather, setIsWeather] = useState(false);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      )
      .then((res) => res.data)
      .then((data) => {
        setWeather({
          temperature: data.current.temperature,
          icon: data.current.weather_icons[0],
          windSpeed: data.current.wind_speed,
          humidity: data.current.humidity,
          clouds: data.current.cloudcover,
          visibility: data.current.visibility,
        });
      })
      .catch((err) => console.log(err));

    setIsWeather(true);
  }, [country]);

  return isWeather ? (
    <div>
      <h3>Current Weather</h3>
      <p>The temperature at the moment is {weather.temperature} Celsius</p>
      <img src={weather.icon} alt="weather_icon" />
      <p>The Wind Speed is {weather.humidity}</p>
      <p>The Humidity is {weather.windSpeed}</p>
      <p>The Cloudcover is {weather.clouds}</p>
      <p>The visibility is {weather.visibility}</p>
    </div>
  ) : null;
};

export default Weather;
