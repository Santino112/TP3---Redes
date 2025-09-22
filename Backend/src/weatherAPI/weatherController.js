import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function getWeatherHistory(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Debe especificar una ciudad con ?city=" });
  }

  try {
    const { data, error } = await supabase
      .from("weather_data_week")
      .select("*")
      .eq("city", city)
      .order("timestamp_utc", { ascending: false })
      .limit(48);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("❌ Error obteniendo histórico:", err.message);
    res.status(500).json({ error: err.message });
  }
}