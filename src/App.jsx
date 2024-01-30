import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard';
const APIkey = '484ace294a1b18aa178d4dab7ebc606e';

function App() {

  const [coords, setcoords] = useState();
  const [weather, setweather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [finder, setFinder] = useState();
  const [hasError, sethasError] = useState(false);
  
  const success = position => {
    //console.log(position);
    const obj ={
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
    setcoords(obj);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`;
    axios.get(url)
    .then(res => {
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(2),
          fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
        }
        setTemp(obj);
        sethasError(false);
      setweather(res.data)
    })
    .catch(err => {
      sethasError(true);
      console.log(err)
    })
    .finally(() => {
      //setTimeout(() => {
      setIsLoading(false);
      //}, 2000);
    })
    }
  }, [coords])

  useEffect(() => {
    if(textInput){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${APIkey}`;
      axios.get(url)
        .then (res => {
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(2),
            fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
          }
          setTemp(obj);
          sethasError(false);
          setFinder(res.data)
        })
        .catch(err => {
          sethasError(true);
          console.log(err)
        });
    }
  }, [textInput]);

  //console.log(finder);
  
  
  return (
    <div className='app'>
      {
        isLoading? 
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        :
        textInput? 
        <WeatherCard
      weather={finder}
      temp={temp}
      setTextInput={setTextInput}
      hasError={hasError}
      />
        :
      <WeatherCard
      weather={weather}
      temp={temp}
      setTextInput={setTextInput}
      hasError={hasError}
      />
    
      }
    </div>
  )
}

export default App
