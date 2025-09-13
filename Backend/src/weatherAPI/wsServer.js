import { WebSocketServer } from "ws";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("🔗 Nuevo cliente conectado");

  socket.on("message", async (msg) => {
    const weather = JSON.parse(msg);

    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === 1) {
        client.send(JSON.stringify(weather));
      }
    });

    console.log("📡 WS Server recibió y retransmitió:", weather);

    try {
        await fetch(process.env.WEBHOOK_URL + "/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weather),
        });
      console.log("📤 Enviado al webhook:", weather);
    } catch (err) {
      console.error("❌ Error enviando al webhook:", err);
    }
  });
});

console.log("🌐 WebSocket Server corriendo en ws://localhost:8080");