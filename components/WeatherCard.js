import React from "react";
import sunny from 'url:../assets/Sunny.svg';
import rainy from 'url:../assets/Rainy.svg';
import cloudy from 'url:../assets/Cloudy.svg';
import partlyCloudy from 'url:../assets/PartlyCloudy.svg';

function WeatherCard(props) {
  const { city, temperature, forecast } = props.data;

  const iconMap = {
    Sunny: sunny,
    Rainy: rainy,
    Cloudy: cloudy,
    "Partly cloudy": partlyCloudy,
  };

  const icon = iconMap[forecast] || sunny;

  return (
    <div className="card">
      <div className="img-container">
        <img className="card-img-top" src={icon} alt={forecast} id="icon" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{city}</h3>
        <h5 className="card-text">Temperature: {temperature}°C</h5>
        <h5 className="card-text">Forecast: {forecast}</h5>
      </div>
    </div>
  );
}

module.exports = WeatherCard;
