import { useState } from 'react'
import styles from './App.module.css';

function App() {
  const [count, setCount] = useState(0)
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
        setWeatherObj((res) => ({
          code: jsonRes.code,
          city: jsonRes.nameInfo,
          temp: jsonRes.tempInfo,
          humidity: jsonRes.humidityInfo,
          desc: jsonRes.description
        }));
      }
    }catch(e){
      console.log(e.message);
    };
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
        <div className={styles.results}>
          <h1 className={styles.city}>{weatherObj.city}</h1>
          <h1 className={styles.temp}>{`${weatherObj.temp}°C`}</h1>
          <p className={styles.humidity}>{`Humidity: ${weatherObj.humidity}%`}</p>
          <p className={styles.weatherDesc}>{weatherObj.desc}</p>
          <p className={styles.weatherIcon}>{weatherObj.code}</p>
        </div>
      )}
    </>
  )
}

export default App
