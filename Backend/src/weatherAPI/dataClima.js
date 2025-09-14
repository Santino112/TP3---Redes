import express from "express";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get("/obtenerClima", async (req, res) => {
    const city = req.params;
    try {
        const { data, error } = await supabase
        . from("weather_data")
        .select("*")
        .eq("city", city)
        .order("timestamp_utc", { ascending: false })

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error("❌ Error obteniendo datos de la API:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () =>
  console.log("📩 Servidor de datos de clima escuchando en http://localhost:5000/obtenerClima")
);