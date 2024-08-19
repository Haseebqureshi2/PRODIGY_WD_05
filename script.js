const searchButton = document.getElementById('search-button');
const locationButton = document.getElementById('location-button');
const locationInput = document.getElementById('location-input');
const weatherResult = document.getElementById('weather-result');

// Fetch weather by city name using Open-Meteo API
searchButton.addEventListener('click', () => {
    const city = locationInput.value;
    if (city) {
        getCoordinates(city);
    }
});

// Fetch weather using geolocation
locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Get coordinates from city name using Open-Meteo’s Geocoding API
function getCoordinates(city) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const { latitude, longitude } = data.results[0];
                getWeather(latitude, longitude);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => alert('Error fetching city coordinates!'));
}

// Fetch weather data by coordinates
function getWeather(lat, lon) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(response => response.json())
        .then(data => displayWeather(data.current_weather))
        .catch(error => alert('Error fetching weather data!'));
}

// Display weather data
function displayWeather(data) {
    weatherResult.innerHTML = `
        <h2>Weather Info</h2>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Wind Speed: ${data.windspeed} km/h</p>
        <p>Weather Code: ${data.weathercode}</p>
    `;
}
