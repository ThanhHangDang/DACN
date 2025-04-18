// LineChartComponent.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Đăng ký các thành phần
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dữ liệu ví dụ
const data = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
  datasets: [
    {
      label: "Tăng trưởng A",
      data: [40, 55, 70, 60, 80],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.4,
      pointBackgroundColor: "white",
      pointBorderColor: "rgb(75, 192, 192)",
      pointBorderWidth: 2,
    },
    {
      label: "Tăng trưởng B",
      data: [20, 35, 50, 45, 60],
      fill: false,
      borderColor: "rgb(255, 99, 132)",
      tension: 0.4,
      pointBackgroundColor: "white",
      pointBorderColor: "rgb(255, 99, 132)",
      pointBorderWidth: 2,
    },
    {
      label: "Tăng trưởng C",
      data: [10, 25, 35, 55, 75],
      fill: false,
      borderColor: "rgb(255, 206, 86)",
      tension: 0.4,
      pointBackgroundColor: "white",
      pointBorderColor: "rgb(255, 206, 86)",
      pointBorderWidth: 2,
    },
  ],
};

// Tuỳ chọn biểu đồ
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => `Giá trị: ${context.parsed.y}`,
      },
    },
    title: {
      display: true,
      text: "Biểu đồ tăng trưởng theo tháng",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const LineChartComponent = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        height: "90%",
        margin: "auto",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
