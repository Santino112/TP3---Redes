import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get("/obtenerClima/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const { data, error } = await supabase
      .from("weather_data_week")
      .select("*")
      .ilike("city", city)
      .order("timestamp_utc", { ascending: false });
    console.log("📥 Recibió datos:", data);
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("❌ Error obteniendo datos:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () =>
  console.log("📩 Servidor de datos de clima escuchando en http://localhost:5000")
);