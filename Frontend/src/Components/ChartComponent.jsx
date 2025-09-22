import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ChartComponent = ({ 
  title = "Temperature Overview", 
  subtitle = "Last 24 hours", 
  labels = [], 
  data = [], 
  color = "rgb(59, 130, 246)" 
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: `${color.replace("rgb", "rgba").replace(")", ", 0.2)")}`,
        borderColor: color,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: color,
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
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
        grid: { color: "rgba(255,255,255,0.1)", drawBorder: false },
        ticks: {
          color: "#ccc",
          callback: (value) => `${value}°C`,
        },
      },
    },
  };

  return (
    <div className="relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700/20 flex flex-col">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 text-center">
        {title}
        {subtitle && (
          <span className="block text-sm sm:text-base font-normal text-gray-400 mt-1">
            {subtitle}
          </span>
        )}
      </h2>
      <div className="flex-grow relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ChartComponent;