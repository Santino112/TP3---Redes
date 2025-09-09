// src/components/HeroChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // registra todos los componentes

const ChartComponent = ({ 
  title = "Temperature Overview", 
  subtitle = "Last 24 hours", 
  labels = [], 
  data = [], 
  color = "rgb(59, 130, 246)" // azul-500 por defecto
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: `${color.replace("rgb", "rgba").replace(")", ", 0.2)")}`, // color con transparencia
        borderColor: color,
        tension: 0.4, // curva suave
        pointRadius: 5,
        pointBackgroundColor: color,
        pointBorderColor: "#fff",
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: color,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}°C`;
          },
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255,255,255,0.3)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#ccc" },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(255,255,255,0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#ccc",
          callback: function (value) {
            return value + "°C";
          },
        },
      },
    },
  };

  return (
    <div className="relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border border-gray-700/20 h-96 md:h-[600px] flex flex-col">
      <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
        {title}
        {subtitle && (
          <span className="block text-base font-normal text-gray-400 mt-2">
            {subtitle}
          </span>
        )}
      </h2>
      <div className="flex-grow">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ChartComponent;
