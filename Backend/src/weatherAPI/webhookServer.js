import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post("/webhook", async (req, res) => {
  const { city, temp, condition, humidity } = req.body;

  // Validación simple
  if (!city || temp == null || !humidity || !condition) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const weather = {
    city,
    temp,
    condition,
    humidity,
    timestamp_utc: new Date().toISOString(),
  };

  console.log("📥 Webhook recibió:", weather);

  try {
    const { error } = await supabase.from("weather_data_week").insert([weather]);
    if (error) throw error;

    res.json({ status: "ok" });
  } catch (err) {
    console.error("❌ Error guardando en Supabase:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () =>
  console.log("📩 Webhook server escuchando en http://localhost:4000/webhook")
);