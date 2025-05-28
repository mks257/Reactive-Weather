import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import Location from './components/location';
import cities from './data';

function App() {
  const [location, setLocation] = useState("New York City"); // You can pick your default city

  return (
    <>
      <h1 className="title">REACTIVE WEATHER</h1>
      <h3 className="subtitle">Up to the minute weather news</h3>
      <div className="app">
        <Location data={cities} location={location} setLocation={setLocation} />
      </div>
    </>
  );
}

export default App;
