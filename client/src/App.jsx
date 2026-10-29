import { useState } from 'react'
import styles from './App.module.css';

function App() {
  const [inp, setInp] = useState('');
  const [weatherObj, setWeatherObj] = useState(null);

  async function getWeatherDetails(){
    try{
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: inp
      });
      if(response.ok){
        const jsonRes = await response.json();
        setWeatherObj((prev) => ({
          ...prev,
          code: jsonRes.code,
          city: jsonRes.nameInfo,
          temp: jsonRes.tempInfo,
          humidity: jsonRes.humidityInfo,
          desc: jsonRes.description
        }));
      }else{
        const errMsg = await response.json()
        throw new Error(errMsg.error);
      }
    }catch(e){
      window.alert(e.message);
    };
  }

  function getWeatherIcon(code){
    if(code >= 200 && code <= 232){
      return '⛈️';
    }else if(code >= 300 && code <= 321){
      return '🌦️';      
    }else if(code >= 500 && code <= 531){
      return '🌧️';
    }else if(code >= 600 && code <= 622){
      return '❄️';      
    }else if(code >= 701 && code <= 781){
      return '🌪️';      
    }else if(code === 800){
      return '☀️';
    }else if(code >= 800 && code <= 804){
      return '☁️';
    }
  }

  function getWeatherBackground(code){
    if(code >= 200 && code <= 232){
      return 'thunderstorm';
    }else if(code >= 300 && code <= 321){
      return 'sunnyStorm';      
    }else if(code >= 500 && code <= 531){
      return 'rain';
    }else if(code >= 600 && code <= 622){
      return 'snow';      
    }else if(code >= 701 && code <= 781){
      return 'tornado';      
    }else if(code === 800){
      return 'sunny';
    }else if(code >= 800 && code <= 804){
      return 'cloudy';
    }
  }

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>Weather App</h1>
        <p>Enter the city, state and country of the location you wish to check e.g: London,England,GB</p>
        <div className={styles.inpContainer}>
          <input type="text" className={styles.countryInp} onChange={(event) => setInp(event.target.value)} value={inp}/>
          <button className={styles.getWeatherBtn} onClick={getWeatherDetails}>Get Weather</button>  
        </div>
      </div>
      {weatherObj && (
        <div className={`${styles.results} ${styles[getWeatherBackground(weatherObj.code)]}`}>
          <h1 className={styles.city}>{weatherObj.city}</h1>
          <h1 className={styles.temp}>{`${weatherObj.temp}°C`}</h1>
          <p className={styles.humidity}>{`Humidity: ${weatherObj.humidity}%`}</p>
          <p className={styles.weatherDesc}>{weatherObj.desc}</p>
          <p className={styles.weatherIcon}>{getWeatherIcon(weatherObj.code)}</p>
        </div>
      )}
    </>
  )
}

export default App
