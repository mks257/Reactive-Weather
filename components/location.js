import React, { useEffect, useState } from "react";
import sunny from 'url:../assets/Sunny.svg';
import rainy from 'url:../assets/Rainy.svg';
import cloudy from 'url:../assets/Cloudy.svg';
import partlyCloudy from 'url:../assets/PartlyCloudy.svg';

function getWeatherIcon(code) {
  if (code === 0) return sunny; // Clear
  if (code === 1 || code === 2) return partlyCloudy;
  if (code === 3) return cloudy;
  if ([61, 63, 65, 80].includes(code)) return rainy;
  return sunny; // Default fallback
}

function Location({ location }) {
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [unit, setUnit] = useState("celsius");

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}`
        );
        const geoData = await geoRes.json();
        const city = geoData.results?.[0];

        if (!city) {
          setNotFound(true);
          setWeatherData(null);
          return;
        }

        const { latitude, longitude } = city;

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&temperature_unit=${unit}&timezone=auto`
        );
        const weather = await weatherRes.json();

        setNotFound(false);
        setWeatherData({
          city: city.name,
          current: weather.current_weather,
          forecast: weather.daily,
        });
      } catch (err) {
        console.error("Error fetching weather:", err);
        setNotFound(true);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [location, unit]);

  if (notFound) {
    return <p>No weather data found for "{location}"</p>;
  }

  if (!weatherData) return <p>Loading...</p>;

  return (
    <div className="card">
      <h3>{weatherData.city}</h3>
      <p>Current Temp: {weatherData.current.temperature}°{unit === "celsius" ? "C" : "F"}</p>

      <button onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}>
        Switch to {unit === "celsius" ? "Fahrenheit" : "Celsius"}
      </button>

      <p>Forecast:</p>
      <ul>
        {weatherData.forecast.time.map((day, index) => (
          <li key={day}>
            <img
              src={getWeatherIcon(weatherData.forecast.weathercode[index])}
              alt="forecast icon"
              style={{ width: "24px", verticalAlign: "middle", marginRight: "8px" }}
            />
            {day}: {weatherData.forecast.temperature_2m_min[index]}°{unit === "celsius" ? "C" : "F"} - 
            {weatherData.forecast.temperature_2m_max[index]}°{unit === "celsius" ? "C" : "F"}, 
            Precipitation: {weatherData.forecast.precipitation_sum[index]} mm
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Location;
