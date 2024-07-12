const apiKey = 'YOUR_API_KEY'; 

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeatherData(data);
        updateBackground(data.weather[0].main);
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
    }
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('weather-description').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;

        document.querySelector('.weather-info').style.display = 'block';
    } else {
        alert('City not found. Please try again.');
    }
}

function updateBackground(weatherMain) {
    let backgroundUrl;
    switch(weatherMain) {
        case 'Clear':
            backgroundUrl = 'url(clear.jpg)';
            break;
        case 'Clouds':
            backgroundUrl = 'url(clouds.jpg)';
            break;
        case 'Rain':
            backgroundUrl = 'url(rain.jpg)';
            break;
        case 'Snow':
            backgroundUrl = 'url(snow.jpg)';
            break;
        default:
            backgroundUrl = 'url(default.jpg)';
            break;
    }
    document.body.style.backgroundImage = backgroundUrl;
}
