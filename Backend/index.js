import fetch from "node-fetch";

// 🔑 Reemplaza con tu API key de WeatherAPI
const API_KEY = "e65b12a6ef784ac48bb213120250109";
const CITY = "Berlin";
const cities = ["Shanghai", "Berlin", "Rio de Janeiro"]

async function getWeather() {
  try {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&units=metric`
    );
    const data = await response.json();
    console.log("Clima en", city);
    console.log("Temperatura:", data.current.temp_c, "°C");
    console.log("Condición:", data.current.condition.text);
    console.log("Humedad:", data.current.humidity, "%");
  } catch (error) {
    console.error("Error al obtener el clima:", error);
  }
}

setInterval(getWeather, 5000);
getWeather();