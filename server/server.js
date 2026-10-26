import express from 'express';

const PORT = process.env.PORT || 8000
const api = process.env.WEATHER_API_KEY;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.text());

app.post('/', async (req, res) => {
    const userInput = req.body;

    const weatherInfo = await requestWeatherData(userInput);

    res.status(200).json(weatherInfo);
});

async function requestWeatherData(city) {

    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api}`);
        if(response.ok){
            const jsonResponse = await response.json();
            const id = jsonResponse.weather[0].id;
            const name = jsonResponse.name;
            const temp = Math.round(jsonResponse.main.temp);
            const humidity = jsonResponse.main.humidity;
            const weatherDesc = jsonResponse.weather[0].description;
            const weatherInfo = {
                code: id,
                nameInfo: name,
                tempInfo: temp,
                humidityInfo: humidity,
                description: weatherDesc
            };
            
            return weatherInfo;
        }else{
            const errorResponse = await response.json();
            console.log(`Something went wrong: ${errorResponse}`)
        }
    }catch(err){
        console.log(`Something went wrong: ${err}`)
    }
}

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});