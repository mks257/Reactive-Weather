import React, { useEffect, useState } from "react";

function Location({ location }) {
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [unit, setUnit] = useState("celsius");

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        // Step 1: Convert city name to coordinates
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

        // Step 2: Get weather using coordinates
        const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=${unit}&timezone=auto`
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
      <p>Current Temp: {weatherData.current.temperature}°C</p>
      <p>Forecast:</p>
      <ul>
        {weatherData.forecast.time.map((day, index) => (
          <li key={day}>
            {day}: {weatherData.forecast.temperature_2m_min[index]}°C - {weatherData.forecast.temperature_2m_max[index]}°C, Precipitation: {weatherData.forecast.precipitation_sum[index]} mm
          </li>
        ))}
      </ul>
    </div>
  );
  <button onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}>
   Switch to {unit === "celsius" ? "Fahrenheit" : "Celsius"}
  </button>

}

export default Location;
