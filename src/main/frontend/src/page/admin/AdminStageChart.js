import { useEffect, useRef, useState } from "react";
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import axios from "axios";

const AdminStageChart = () => {
  const chartRef = useRef(null);
  const [stageChart, setStageChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/stage/chart");
        const data = response.data.Stage;

        const ctx = chartRef.current.getContext('2d');
        Chart.register(CategoryScale, LinearScale, BarController, BarElement);

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: '# of Votes',
                data: data.values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 500,
                  callback: function (value) {
                    return value + "만원";
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>계모임 영업현황</h2>
      <canvas ref={chartRef} />
    </>
  );
};

export default AdminStageChart;
