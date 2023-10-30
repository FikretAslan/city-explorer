import "./App.css";
import axios from "axios";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");
  const [map, setMap] = useState({});

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function displayMap(event) {
    setMap(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    const res = await axios.get(API);

    setLocation(res.data[0]);
  }

  return (
    <>
      <h1>Location APIs</h1>
      <form onSubmit={getLocation}>
        <input onChange={handleChange} placeholder="Location" />
        <button>Explore!</button>
      </form>
      <h2>Location: {location.display_name}</h2>
      <h2>Longitude: {location.lon}</h2>
      <h2>Latitude: {location.lat}</h2>
    </>
  );
}
export default App;
