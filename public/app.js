const btn = document.getElementById('getWeather');

async function getWeatherDetails(){
    const input = document.getElementById('country');
    const results = document.querySelector('.results');
    const city = document.getElementById('city');
    const temp = document.getElementById('temp');
    const humidity = document.getElementById('humidity');
    const weatherDesc = document.getElementById('weatherDesc');
    const weatherIcon = document.getElementById('weatherIcon');

    try{
        const response = await fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: input.value
        });
        if(response.ok){
            const jsonResponse = await response.json();
            results.style.display = 'flex';
            city.textContent = jsonResponse.nameInfo;
            temp.textContent = `${jsonResponse.tempInfo}°C`;
            humidity.textContent = `Humidity: ${jsonResponse.humidityInfo}%`;
            weatherDesc.textContent = jsonResponse.description;
            const code = jsonResponse.code;
            if(code >= 200 && code <= 232){
                weatherIcon.textContent = '⛈️';
                results.style.backgroundImage = 'linear-gradient(to bottom, hsl(240, 20%, 30%), hsl(240, 15%, 50%))';
            }else if(code >= 300 && code <= 321){
                weatherIcon.textContent = '🌦️';
                results.style.backgroundImage = 'linear-gradient(to bottom, hsl(200, 30%, 60%), hsl(200, 20%, 75%))';
            }else if(code >= 500 && code <= 531){
                weatherIcon.textContent = '🌧️';
                results.style.backgroundImage = 'linear-gradient(to bottom, hsl(210, 40%, 45%), hsl(210, 20%, 65%))';
            }else if(code >= 600 && code <= 622){
                weatherIcon.textContent = '❄️';
                results.style.backgroundImage = 'linear-gradient(to bottom, hsl(200, 30%, 80%), hsl(0, 0%, 95%))';
            }else if(code >= 701 && code <= 781){
                weatherIcon.textContent = '🌪️';
                results.style.backgroundImage = 'linear-gradient(to bottom, hsl(0, 0%, 70%), hsl(0, 0%, 85%))';
            }else if(code === 800){
                weatherIcon.textContent = '☀️';
                results.style.backgroundImage = 'linear-gradient(to bottom, hsl(210, 100%, 75%), hsl(40, 100%, 75%))';
            }else if(code >= 800 && code <= 804){
                weatherIcon.textContent = '☁️';
                results.style.backgroundImage = 'linear-gradient(to bottom, hsl(210, 30%, 70%), hsl(0, 0%, 80%))';
            }
        }else{
            const errResponse = await response.json()
            console.log(errResponse);
        }
    }catch (error){
        console.log(`Something went wrong: ${error}`);
    }
}

btn.addEventListener('click', getWeatherDetails);