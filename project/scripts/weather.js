// Weather module - handles OpenWeatherMap API integration
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?lat=-36.85646280918705&lon=174.7760109734543&appid=4699897b20e248b1b6f5f515e8636dcb&units=metric";

const weatherElements = {
    temperature: document.querySelector("#temperature"),
    icon: document.querySelector("#weather-icon"),
    conditions: document.querySelector("#conditions")
};

/**
 * Fetches weather data from OpenWeatherMap API
 */
async function fetchWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherElements.conditions.textContent = "Unable to load weather";
    }
}

/**
 * Displays weather data on the page
 * @param {Object} data - Weather data from API
 */
function displayWeather(data) {
    const temp = data.main.temp;
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    weatherElements.temperature.innerHTML = `${temp}&deg;C`;
    weatherElements.icon.setAttribute("src", `https://openweathermap.org/img/w/${iconCode}.png`);
    weatherElements.icon.setAttribute("alt", description);
    weatherElements.conditions.textContent = `${description.charAt(0).toUpperCase() + description.slice(1)}`;
}

/**
 * Initialize weather module
 */
export function initWeather() {
    fetchWeather();
}
