import { WebSocketServer } from "ws";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

const subscriptions = new Map(); // socket -> array de ciudades

wss.on("connection", (socket) => {
  console.log("🔗 Nuevo cliente conectado");

  // Inicializamos con array vacío
  subscriptions.set(socket, []);

  socket.on("message", async (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "subscribe") {
      // Ejemplo: { type: "subscribe", city: "Berlin" }
      const cities = subscriptions.get(socket) || [];
      subscriptions.set(socket, [...cities, data.city]);
      console.log(`🔔 Cliente suscrito a: ${data.city}`);
      return;
    }

    // Data meteorológica enviada por clientes WS
    const weather = data;

    // Enviar solo a clientes suscritos a esa ciudad
    wss.clients.forEach((client) => {
      if (
        client.readyState === 1 &&
        subscriptions.get(client)?.includes(weather.city)
      ) {
        client.send(JSON.stringify(weather));
      }
    });

    // Enviar al webhook
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

  socket.on("close", () => {
    subscriptions.delete(socket);
  });
});

console.log("🌐 WebSocket Server corriendo en ws://localhost:8080");