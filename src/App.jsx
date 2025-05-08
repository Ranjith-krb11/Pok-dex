import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [error, setError] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchPokemonList() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await response.json();
      setAllPokemon(data.results.map(pokemon => pokemon.name));
    }
    fetchPokemonList();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPokemonName(value);
    if (value.length > 1) {
      const filtered = allPokemon.filter(pokemon => pokemon.startsWith(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setPokemonName(name);
    setSuggestions([]);
  };

  async function fetchData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) {
      setPokemonSprite(null);
      setError("Name does not match");
    } else {
      setError(null);
      const data = await response.json();
      setPokemonSprite(data.sprites.front_default);
    }
    setSuggestions([]);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full scale-[0.7] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 transform-origin-center">
      <h1 className='text-4xl font-bold'>Pokédex</h1>
      <div name="box" className='flex justify-center items-center'>
        <div name="left-box"
          className="bg-red-500 w-[350px] h-[550px] mt-20 flex flex-col relative"
        >
          <div>
            <div className='bg-blue-200 h-[60px] w-[60px] rounded-full absolute border-4 border-white ml-2 mt-2'></div>
            <div className='bg-red-500 h-[20px] w-[20px] rounded-full absolute border-2 border-black ml-[110px] mt-2'></div>
            <div className='bg-green-500 h-[20px] w-[20px] rounded-full absolute border-2 border-black ml-[140px] mt-2'></div>
            <div className='bg-orange-500 h-[20px] w-[20px] rounded-full absolute border-2 border-black ml-20 mt-2'></div>
            <div className='bg-red-700 h-[40px]'></div>
            <div className='bg-red-700 h-[40px] w-[200px]'></div>
          </div>
          <div className='flex items-center justify-center'>
            <div
              name="img"
              className="bg-gray-200 w-[200px] h-[200px] mt-12 flex items-center justify-center">
              {pokemonSprite && (
                <img src={pokemonSprite} alt='pokemonSprite' className='w-full h-full'/>
              )}
              {error && (
                <span className="text-red-600">{error}</span>
              )}
            </div>
          </div>
          
          <div className="flex mt-4 space-x-8">
            <div
              name="blue-circle"
              className="bg-blue-300 w-[70px] h-[70px] ml-6 rounded-full"
            ></div>
            <div className="flex flex-col space-y-2">
              <div
                name="blue-line"
                className="bg-green-400 w-[60px] h-[20px] mt-6 ml-6 rounded-md"
              ></div>
              <div
                name="red-line"
                className="bg-yellow-300 w-[60px] h-[20px] rounded-md mb-3"
              ></div>
            </div>
          </div>
          <div name="plus" className="flex items-center justify-center h-20 w-20 ml-64 relative">
            <div className="bg-gray-800 w-16 h-5 absolute"></div>
            <div className="bg-gray-800 w-5 h-16 absolute"></div>
          </div>       
          <div name="rectangle" className='w-24 h-11 bg-yellow-200 ml-40 mb-3'></div>
        </div>
        <div className='bg-red-700 h-[511px] w-[15px] mt-[119px] absolute'></div>
        <div className='flex flex-col'>
          <div name='right-box' className='bg-red-500 w-[350px] h-[512px] mt-[118px] flex flex-col'>
            <div className='bg-white w-40 h-10 ml-48'></div>
            <div className='flex relative'>
              <input
                type="text"
                placeholder="Enter Pokemon Name"
                className="bg-gray-800 h-11 w-60 mt-10 ml-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 px-2"
                value={pokemonName} 
                onChange={handleInputChange}
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-10 top-[84px] w-60 bg-gray-800 text-white rounded-lg shadow-lg z-10">
                  {suggestions.map((name) => (
                    <li
                      key={name}
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSuggestionClick(name)}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
              <button type='button' onClick={fetchData} className='text-2xl mt-10 bg-gray-800 h-11 px-2'>🔍</button>
            </div>
            <div name='blue-boxes'>
              <div name='row-1' className='flex space-x-3 items-center justify-center mt-4'>
                <div className='bg-blue-300 w-16 h-10'></div>
                <div className='bg-blue-300 w-16 h-10'></div>
                <div className='bg-blue-300 w-16 h-10'></div>
                <div className='bg-blue-300 w-16 h-10'></div>
              </div>
              <div name='row-2' className='flex space-x-3 items-center justify-center mt-4'>
                <div className='bg-blue-300 w-16 h-10'></div>
                <div className='bg-blue-300 w-16 h-10'></div>
                <div className='bg-blue-300 w-16 h-10'></div>
                <div className='bg-blue-300 w-16 h-10'></div>
              </div>
            </div>
            <div name='squares,oval' className='flex space-x-24 mt-10'>
              <div name='squares' className='flex space-x-3'>
                <div className='bg-yellow-100 w-14 h-14 ml-8'></div>
                <div className='bg-yellow-100 w-14 h-14 ml-8'></div>
              </div>
              <div name='oval' className='bg-yellow-500 w-12 h-15 rounded-full'></div>
            </div>
            <div name='black-squares' className='flex mt-12 space-x-20'>
              <div className='bg-gray-800 w-24 h-8 ml-7'></div>
              <div className='bg-gray-800 w-24 h-8 ml-7'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;