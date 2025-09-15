import ChartComponent from "../Components/ChartComponent.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClimaPorCiudad } from "../Api/TemperaturaApi.js";

const Dashboard = () => {
  const [dataBeijing, setDataBeijing] = useState({ labels: [], temps: [] });
  const [dataMadrid, setDataMadrid] = useState({ labels: [], temps: [] });
  const [dataRio, setDataRio] = useState({ labels: [], temps: [] });
  const navigate = useNavigate();
    const [dataBeijing, setDataBeijing] = useState([]);
    const [dataMadrid, setDataMadrid] = useState([]);
    const [dataRio, setDataRio] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/Login');
      localStorage.removeItem('datosLogin');
    };

  const handleLogout = () => {
    navigate('/Login');
    localStorage.removeItem('datosLogin');
  };

  useEffect(() => {
    const fetchTemperatureData = async (city, setData) => {
      try {
        const result = await getClimaPorCiudad(city);

        const labels = result.map(item =>
          new Date(item.timestamp_utc).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })
        );

        const temps = result.map(item => item.temp);

        setData({ labels, temps });
      } catch (error) {
        console.error(`Error fetching data for ${city}:`, error);
      }
    };

    fetchTemperatureData("Beijing", setDataBeijing);
    fetchTemperatureData("Madrid", setDataMadrid);
    fetchTemperatureData("Rio", setDataRio);
  }, []);

  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-100">
      {/* Panel izquierdo */}
      <div className="w-[30%] bg-neutral-800 p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          📊 Panel Principal
        </h1>
        <p className="text-neutral-400 text-center max-w-xs">
          Resumen de estadísticas de temperatura.
          <span className="block mt-2 text-sm text-neutral-500">
            (Datos solicitados cada media hora)
          </span>
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Panel derecho */}
      <div className="w-[70%] p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartComponent
            title="Rio de Janeiro"
            subtitle="Temperaturas últimas 24h"
            labels={dataRio.labels}
            data={dataRio.temps}
            color="rgb(59, 130, 246)"
          />

          <ChartComponent
            title="Madrid"
            subtitle="Temperaturas últimas 24h"
            labels={dataMadrid.labels}
            data={dataMadrid.temps}
            color="rgb(239, 68, 68)"
          />

          <ChartComponent
            title="Beijing"
            subtitle="Temperaturas últimas 24h"
            labels={dataBeijing.labels}
            data={dataBeijing.temps}
            color="rgb(34, 197, 94)"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;