import React, { useState } from "react";
import axios from "axios";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setWeatherData(null);

    try {
      const apiKey = "0f8bc384a7c31b717a18cfe38a95ae06"; // Replace with your OpenWeatherMap API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      // Extract data from response
      const { temp } = response.data.main;
      const { description } = response.data.weather[0];
      const { humidity } = response.data.main;
      const { speed } = response.data.wind;

      // Set the state with the extracted data
      setWeatherData({
        temperature: temp,
        description,
        humidity,
        windSpeed: speed,
      });
    } catch (err) {
      setError("City not found");
    }
  };

  return (
    <div>
      <h1>Weather Search Engine</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weatherData && (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {Math.round(weatherData.temperature)}°C</p>
          <p>Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind: {weatherData.windSpeed} km/h</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherSearch;
