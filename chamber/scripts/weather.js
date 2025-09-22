// weather.js

const lat = 49.75; 
const lon = 6.64;
const apiKey = "5d7efd0392a80d8a6d722e6a6445d296"; //API key

// URLs de la API de OpenWeatherMap
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

// Función para obtener y mostrar el clima actual
async function getCurrentWeather() {
    try {
        const response = await fetch(currentUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Clima actual:", data);

        // Actualiza el HTML con la información del clima actual
        document.getElementById("display-temp").textContent = data.main.temp.toFixed(0);
        document.getElementById("display-conditions").textContent = data.weather[0].description;
        document.getElementById("display-wind-speed").textContent = data.wind.speed.toFixed(1);

        // Actualiza el icono del clima
        const weatherIcon = document.querySelector(".weather-icon img");
        const iconCode = data.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.setAttribute("src", iconSrc);
        weatherIcon.setAttribute("alt", data.weather[0].description);

    } catch (error) {
        console.error("Error al obtener los datos del clima actual:", error);
    }
}

// Funtión to get and display time for 3 days
async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Pronóstico:", data);

        
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        if (dailyForecasts.length >= 3) {
            // day 1 (today)
            const today = dailyForecasts[0];
            document.getElementById("forecast-today-temp").textContent = today.main.temp.toFixed(0);

            // day 2 (Tomorrow)
            const tomorrow = dailyForecasts[1];
            document.getElementById("forecast-wednesday-temp").textContent = tomorrow.main.temp.toFixed(0);

            // day 3 ()
            const dayAfterTomorrow = dailyForecasts[2];
            document.getElementById("forecast-thursday-temp").textContent = dayAfterTomorrow.main.temp.toFixed(0);
        } else {
            console.warn("No se encontraron suficientes datos para 3 días.");
        }

    } catch (error) {
        console.error("Error al obtener los datos del pronóstico:", error);
    }
}

// call functions
document.addEventListener("DOMContentLoaded", function() {
    getCurrentWeather();
    getForecast();
});

// 
function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed >= 3) {
        return (35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16))).toFixed(1);
    } else {
        return "N/A"; 
    }
}