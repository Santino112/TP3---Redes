import fetch from "node-fetch";
import WebSocket from "ws";

const API_KEY = "e65b12a6ef784ac48bb213120250109";
const cities = ["Shanghai", "Berlin", "Rio de Janeiro"];

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("✅ Cliente WebSocket conectado al servidor");

  setInterval(async () => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    const data = await response.json();

    const weather = {
      city,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      timestamp_utc: new Date().toISOString(),
    };

    ws.send(JSON.stringify(weather));
    console.log("📤 Cliente WS envió:", weather);
  }, 600000);
});