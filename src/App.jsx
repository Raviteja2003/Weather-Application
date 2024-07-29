import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './components';

function App() {
  const [input, setInput] = useState("");
  const { weather, values, place, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput('');
  }

  return (
    <div className='w-full h-screen text-white px-4 sm:px-8'>
      <nav className='w-full p-3 flex flex-col sm:flex-row justify-between items-center'>
        <h1 className='font-bold tracking-wide text-xl sm:text-3xl mb-4 sm:mb-0'>WEATHER APPLICATION</h1>
        <div className='bg-white w-full sm:w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} className='w-[1.5rem] h-[1.5rem]' alt='search'/>
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // submit the form
                submitCity();
              }
            }}
            type='text'
            className='focus:outline-none w-full text-gray-900 text-lg'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={place}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />
        <div className='flex justify-center gap-8 flex-wrap w-full sm:w-[60%]'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App;
