import React, { useRef, useState } from 'react';
import './styles/WeatherCard.css';

const WeatherCard = ({weather, temp, setTextInput, hasError}) => {

   const [isCelsius, setIsCelsius] = useState(true);

    const hendlChange = () => {
      setIsCelsius(!isCelsius);
    }

    const city = useRef();

    const handleForm = event => {
      event.preventDefault();
      setTextInput(city.current.value.toLowerCase().trim());
    }
  return (
    <section className='weather'>
        <h1 className='weather__title'>Weather App</h1>
        <form className='weather__form' onSubmit={handleForm}>
          <input type="text" ref ={city} />
          <button className='form__btn'>Search</button>
        </form>
        {
          hasError ?
            <>
          <h2>That city was no found</h2>
          <h3>Please, try again</h3>
          </>
          :
          <>
            <h2 className='weather__city'>{weather?.name}, {weather?.sys.country} </h2>
        <article className='weather__container1'>
            <figure className='weather_fig'>
              <img 
                 className='weather_img' 
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                 alt="weather icon"
               />
            </figure>
            <div>
              <h3 className='weather__clouds'>{weather?.weather[0].description}</h3>
              <ul className='weather__info'>
                <li><span>Wind speed: </span><span>{weather?.wind.speed} m/s</span></li>
                <li><span>Clouds: </span><span>{weather?.clouds.all} %</span></li>
                <li><span>Pressure: </span><span>{weather?.main.pressure} hPa</span></li>
                <li><span>Humidity: </span><span>{weather?.main.humidity} %</span></li>
              </ul>
            </div>
        </article>
        <div className='weather__container2'>
          <h3 className='weather__temp'>{
              isCelsius?
              temp?.celsius+ ' °C'
              : 
              temp?.fahrenheit+ ' °F'
            }</h3>
          <button className='weather__btn' onClick={hendlChange}>
            Change to {isCelsius?'°F':'°C'}
            </button>
        </div>
          </>
        }
          
    </section>
  )
}

export default WeatherCard;