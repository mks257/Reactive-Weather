import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import Location from './components/Location';
import Form from './components/Form';
import cities from './data';

function App() {
  const [location, setLocation] = useState("New York City");

  return (
    <>
      <h1 className="title">REACTIVE WEATHER</h1>
      <h3 className="subtitle">Up to the minute weather news</h3>
      <Form location={location} setLocation={setLocation} />
      <div className="app">
        <Location data={cities} location={location} />
      </div>
    </>
  );
}

export default App;
