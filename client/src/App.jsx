import { useState } from 'react'
import styles from './App.module.css';

function App() {
  const [count, setCount] = useState(0)
  const [inp, setInp] = useState('');

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>Weather App</h1>
        <p>Enter the city, state and country of the location you wish to check e.g: London,England,GB</p>
        <div className={styles.inpContainer}>
          <input type="text" className={styles.countryInp} onChange={(event) => setInp(event.target.value)} value={inp}/>
          <button className={styles.getWeatherBtn}>Get Weather</button>  
        </div>
        <h1>{inp}</h1>
      </div>
    </>
  )
}

export default App
