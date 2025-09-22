import fetch from "node-fetch";
import WebSocket from "ws";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;
const CITY = process.argv[2];
const INTERVAL = 600000; 

function connectWS() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.on("open", () => {
    console.log(`✅ Cliente WS (${CITY}) conectado al servidor`);
    ws.send(JSON.stringify({ type: "subscribe", city: CITY }));

    setInterval(async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`
        );
        const data = await response.json();
        if (!data || !data.current) {
          console.error(`❌ La API no devolvió datos válidos para ${CITY}:`, data);
          return;
        }
        const weather = {
          city: CITY,
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          humidity: data.current.humidity,
          timestamp_utc: new Date().toISOString(),
        };

        ws.send(JSON.stringify(weather));
        console.log(`📤 Cliente WS (${CITY}) envió:`, weather);
      } catch (err) {
        console.error(`❌ Error obteniendo clima de ${CITY}:`, err);
      }
    }, INTERVAL);
  });

  ws.on("close", () => {
    console.log(`⚠️ WS desconectado (${CITY}), reintentando en 5s`);
    setTimeout(connectWS, 5000);
  });

  ws.on("error", (err) => console.error("WS error:", err));
}

connectWS();