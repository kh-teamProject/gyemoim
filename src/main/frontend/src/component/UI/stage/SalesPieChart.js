import React from 'react';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const app = () => {

  const data =  {
    labels: ['10', '20', '30', '40', '50'],
    datasets: [
      {
        label: '약정금별 생성현황',
        backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        data: [7,8,9,10,11],
        borderColor: 'black',
        borderWidth: 2,
      }
    ],
  };
  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    },
  };
  const options = {
    // responsive 속성을 false로 지정한다.
    // responsive: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Pie type="pie" data={data} config={config} options={options}/>
    </div>
  );

}

export default app;