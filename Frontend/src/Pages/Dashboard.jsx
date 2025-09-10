// src/pages/Dashboard.jsx
import ChartComponent from "../Components/ChartComponent.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [dataBeijing, setDataBeijing] = useState([]);
    const [dataMadrid, setDataMadrid] = useState([]);
    const [dataRio, setDataRio] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/Login');
      localStorage.removeItem('datosLogin');
    };

    useEffect(() => {
        // Función para obtener datos de temperatura desde la API
        const fetchTemperatureData = async (city, setData) => {
            try {
                const response = await fetch(`http://localhost:5000/temperature/${city}`);
                const result = await response.json();
                setData(result.temperatures); // Asumiendo que la respuesta tiene un campo 'temperatures'
            } catch (error) {
                console.error(`Error fetching data for ${city}:`, error);
            }
        }
        
        fetchTemperatureData("Beijing", setDataBeijing);

        fetchTemperatureData("Madrid", setDataMadrid);

        fetchTemperatureData("Rio", setDataRio);
    }, []);

  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-100">

      {/* Panel izquierdo fijo (30%) */}
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

      {/* Panel derecho scrolleable (70%) */}
      <div className="w-[70%] p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartComponent
          title="Rio de Janeiro"
          subtitle="Temperaturas últimas 24h"
          labels={["00:00","01:00","02:00","03:00","04:00","05:00","06:00"]}
          data={[20, 21, 20.5, 22, 23, 22.5, 24]}
          color="rgb(59, 130, 246)" // azul
        />

        <ChartComponent
          title="Madrid"
          subtitle="Temperaturas últimas 24h"
          labels={["00:00","01:00","02:00","03:00","04:00","05:00","06:00"]}
          data={[15, 16, 17, 18, 18.5, 19, 20]}
          color="rgb(239, 68, 68)" // rojo
        />

        <ChartComponent
          title="Beijing"
          subtitle="Temperaturas últimas 24h"
          labels={["00:00","01:00","02:00","03:00","04:00","05:00","06:00"]}
          data={[10, 12, 11, 13, 14, 15, 16]}
          color="rgb(34, 197, 94)" // verde
        />

          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
