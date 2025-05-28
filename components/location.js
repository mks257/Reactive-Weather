import React from 'react';
import sunny from 'url:../assets/Sunny.svg';
import rainy from 'url:../assets/Rainy.svg';
import cloudy from 'url:../assets/Cloudy.svg';
import partlyCloudy from 'url:../assets/PartlyCloudy.svg';

const iconMap = {
  Sunny: sunny,
  Rainy: rainy,
  Cloudy: cloudy,
  "Partly cloudy": partlyCloudy,
};

function Location({ data, location }) {
  const cityData = data.find((item) => item.city === location);

  if (!cityData) return <p>No weather data found for {location}</p>;

  const icon = iconMap[cityData.forecast] || sunny;

  return (
    <div className="card">
      <div className="img-container">
        <img className="card-img-top" src={icon} alt={cityData.forecast} id="icon" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{cityData.city}</h3>
        <h5 className="card-text">Temperature: {cityData.temperature}°C</h5>
        <h5 className="card-text">Forecast: {cityData.forecast}</h5>
      </div>
    </div>
  );
}

export default Location;
