import { useState } from 'react'
import styles from './App.module.css';

function App() {
  const [count, setCount] = useState(0)
  const [inp, setInp] = useState('');
  const [weatherObj, setWeatherObj] = useState({});

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
        <h1>{inp}</h1>
      </div>
      <div>
        <h1>{JSON.stringify(weatherObj)}</h1>
      </div>
    </>
  )
}

export default App
