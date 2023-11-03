import "./App.css";
import axios from "axios";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_KEY_WEATHER = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");
  const [number, setNumber] = useState(10);
  const [weather, setWeather] = useState([]);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    const res = await axios.get(API);

    setLocation(res.data[0]);

    getWeather(response.data[0]);
  }

  function handleNumber(mod) {
    setNumber(number + mod);
  }

  async function getWeather(tempLocation) {
    const API = `https://api.weatherbit.io/v2.0/current?lat=${tempLocation.lat}&lon=${tempLocation.lon}&key=${API_KEY_WEATHER}&include=minutely`;
    const response = await axios.get(API);
    const processedData = response.data.data.map((day) => {
      return {
        description: day.weather.description,
        date: day.datetime,
      };
    });
    setWeather(processedData);
  }

  return (
    <>
      <h1>City Explorer Hub</h1>
      <form onSubmit={getLocation}>
        <input onChange={handleChange} placeholder="Location" />
        <button>Get Location</button>
      </form>

      {location.lat && (
        <div>
          <button onClick={() => handleNumber(-1)}>-</button>
          <span>{number}</span>
          <button onClick={() => handleNumber(1)}>+</button>

          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=${number}&format=png`}
          />
        </div>
      )}

      <h2>{location.display_name}</h2>
      <h2>{location.lat}</h2>
      <h2>{location.lon}</h2>

      {weather.map((day) => {
        return <p>The weather is currently {day.description}</p>;
      })}
    </>
  );
}

export default App;
