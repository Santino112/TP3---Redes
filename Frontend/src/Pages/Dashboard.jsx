import ChartComponent from "../Components/ChartComponent.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClimaPorCiudad } from "../Api/TemperaturaApi.js";

const Dashboard = () => {
  const [dataBeijing, setDataBeijing] = useState({ labels: [], temps: [] });
  const [dataMadrid, setDataMadrid] = useState({ labels: [], temps: [] });
  const [dataRio, setDataRio] = useState({ labels: [], temps: [] });
  const navigate = useNavigate();

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
    <div className="flex flex-col min-h-screen bg-neutral-900 text-neutral-100">
      <div className="w-full bg-neutral-800 p-2 flex flex-col sm:flex-row items-center justify-between">
        {/* Título */}
        <h1 className="order-1 sm:order-none text-lg sm:text-lg md:text-2xl lg:text-2xl font-bold text-center mb-3 sm:mb-0">
          📊 Panel Principal
        </h1>

        {/* Texto explicativo */}
        <p className="order-3 sm:order-none text-neutral-200 text-center max-w-xs mb-2 sm:mb-0">
          Resumen de estadísticas de temperatura.
          <span className="block mt-2 text-sm text-neutral-200">
            (Datos solicitados cada media hora)
          </span>
        </p>
        <button
          onClick={handleLogout}
          className="order-2 sm:order-none w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
      <div className="w-[100%] p-6 overflow-y-auto m-auto">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ChartComponent
            title="Rio de Janeiro"
            subtitle="Temperaturas de últimas 24h"
            labels={dataRio.labels}
            data={dataRio.temps}
            color="rgb(59, 130, 246)"
          />

          <ChartComponent
            title="Madrid"
            subtitle="Temperaturas de últimas 24h"
            labels={dataMadrid.labels}
            data={dataMadrid.temps}
            color="rgb(239, 68, 68)"
          />

          <ChartComponent
            title="Beijing"
            subtitle="Temperaturas de últimas 24h"
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