// Weather module - handles WeatherAPI.com API integration
const WEATHER_API_KEY = "1f6ab7334bdc46a6ade225640250812"; // Replace with your WeatherAPI.com API key
const WEATHER_API_URL = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=-36.85646280918705,174.7760109734543&aqi=no`;

const weatherElements = {
    temperature: document.querySelector("#temperature"),
    icon: document.querySelector("#weather-icon"),
    conditions: document.querySelector("#conditions")
};

/**
 * Fetches weather data from WeatherAPI.com API
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
 * @param {Object} data - Weather data from WeatherAPI.com API
 */
function displayWeather(data) {
    const temp = data.current.temp_c;
    const iconUrl = data.current.condition.icon;
    const description = data.current.condition.text;

    weatherElements.temperature.innerHTML = `${temp}&deg;C`;
    weatherElements.icon.setAttribute("src", `https:${iconUrl}`);
    weatherElements.icon.setAttribute("alt", description);
    weatherElements.conditions.textContent = description;
}

/**
 * Initialize weather module
 */
export function initWeather() {
    fetchWeather();
}
