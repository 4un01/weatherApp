import express from 'express';

const PORT = process.env.PORT || 8000
const api = process.env.WEATHER_API_KEY;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.text());

app.post('/api/weather', async (req, res) => {
    const userInput = req.body;
    if(typeof userInput != 'string' || userInput.trim() === '' || userInput.length > 50){
        return res.status(400).json({
            error: `400: Incorrect input`
        });
    }

    const weatherInfo = await requestWeatherData(userInput);

    return res.status(weatherInfo.status).json(weatherInfo.info);
});

async function requestWeatherData(city) {
    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api}`);
        if(response.ok){
            const jsonResponse = await response.json();
            const weatherInfo = {
                code: jsonResponse.weather[0].id,
                nameInfo: jsonResponse.name,
                tempInfo: Math.round(jsonResponse.main.temp),
                humidityInfo: jsonResponse.main.humidity,
                description: jsonResponse.weather[0].description
            };
            return { status: 200, info: weatherInfo };
        }else{
            const errorResponse = await response.json();
            const error = new Error(errorResponse.message);
            error.status = Number(errorResponse.cod);
            throw error;
        }
    }catch(err){
        console.log(`Something went wrong: ${err.message}`);
        const status = err.status || 500;
        return {
            status: status,
            info: { error: `${status}: ${err.message}` }
        };
    }
}

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});