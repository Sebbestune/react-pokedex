import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    const APIURL = import.meta.env.VITE_APIURL;
    console.log(APIURL);

    try {
      const url = APIURL + pokemon;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      toArray.push(result);
      setPokemonType(result.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter pokemon name"
        ></input>
      </form>
      {pokemonData.map((data) => {
        return (
          <div key={data.id}>
            <img src={data.sprites["front_default"]}></img>
            <h2>Name: {data.name}</h2>
            <ul>
              <li>Type: {pokemonType}</li>
              <li>Heigth: {data.height}</li>
              <li>Weigth: {data.weight}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
