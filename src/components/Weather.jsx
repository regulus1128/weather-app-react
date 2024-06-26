import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import sunny from '../assets/sunny.png'
import wind from '../assets/icons8-wind-96.png'
import humidity from '../assets/icons8-humidity-96.png'
import clearnight from '../assets/clearnight.png'
import cloudy from '../assets/cloudy.png'
import partlycloudy from '../assets/partlycloudy.png'
import partlycloudynight from '../assets/partlycloudynight.png'
import lightrain from '../assets/lightrain.png'
import lightrainnight from '../assets/lightrainnight.png'
import rainy from '../assets/rainy.png'
import rainynight from '../assets/rainynight.png'
import foggy from '../assets/foggy.png'
import foggynight from '../assets/foggynight.png'
import snowy from '../assets/snowy.png'
import thunderstorm from '../assets/thunderstorm.png'
import sunrise from '../assets/sunrise.png'
import sunset from '../assets/sunset.png'

const Weather = () => {

  const [weatherdetails, setWeatherDetails] = useState('');
  const inputRef = useRef()

  const iconsList = {
    '01d': sunny,
    '01n': clearnight,
    '02d': partlycloudy,
    '02n': partlycloudynight,
    '03d': cloudy,
    '03n': cloudy,
    '04d': cloudy,
    '04n': cloudy,
    '09d': lightrain,
    '09n': lightrainnight,
    '10d': rainy,
    '10n': rainynight,
    '11d': thunderstorm,
    '11n': thunderstorm,
    '13d': snowy,
    '13n': snowy,
    '50d': foggy,
    '50n': foggynight,
  }

  async function search(city){

    if(city === ''){
      alert('Please enter city name!')
      return;
    }

    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data)
      const icon = iconsList[data.weather[0].icon] || sunny
      console.log(icon);

      const sunrise =  data.sys.sunrise;
      const sunset =  data.sys.sunset;

      const sunriseDate = new Date(sunrise * 1000); // Multiply by 1000 to convert seconds to milliseconds
      const sunsetDate = new Date(sunset * 1000);

      const timeOptions = { 
        hour: 'numeric', 
        minute: 'numeric' 
      };      

      setWeatherDetails({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        city: data.name,
        temperature: Math.floor(data.main.temp),
        feelslike: Math.floor(data.main.feels_like),
        info: data.weather[0].main,
        icon: icon,
        maxtemp: Math.floor(data.main.temp_max),
        mintemp: Math.floor(data.main.temp_min),
        sunriseTime: sunriseDate.toLocaleString(undefined, timeOptions),
        sunsetTime: sunsetDate.toLocaleString(undefined, timeOptions),


      })
    }
    catch{
      setWeatherDetails(false);
      console.log('Error');
    }
  }

  useEffect(() => {
    search('')

  }, [])


  return (
    <>
        <div className="container">
            <div className="search-bar">
                <input type="text" ref={inputRef} name="" id="" placeholder='Search a city...'/>
                <img src={search_icon} alt="" width="30px" height="30px" onClick={() => search(inputRef.current.value)}/>
                {/* <img src={refresh} alt="" width="30px" height="30px" onClick={refreshData}/> */}
            </div>
            <div className="weather-info">
              <img src={weatherdetails.icon} alt="" />
              <p className='city'>{weatherdetails.city}</p>
              <p className='other'>{weatherdetails.temperature}&deg; C</p>
              <p className='other'>{weatherdetails.info}</p>
              <p className='other'>Feels like {weatherdetails.feelslike}&deg; C</p>
            </div>
            <div className='additional-info'>
              <div className="wind">
              <img src={wind} alt="" width="45px" height="45px"/>
              <p id='wind-text'>{weatherdetails.windspeed} km/h</p>
              </div>
              <div className="wind">
              <img src={sunrise} alt="" width="50px" height="50px"/>
              <p>{weatherdetails.sunriseTime}</p>
              </div>
              <div className="wind">
              <img src={sunset} alt="" width="50px" height="50px"/>
              <p>{weatherdetails.sunsetTime}</p>
              </div>
              
              <div className="humidity">
              <img src={humidity} alt="" width="50px" height="50px"/>
              <p>{weatherdetails.humidity}%</p>
              </div>
              
            </div>
        </div>
    </>
  )
}

export default Weather