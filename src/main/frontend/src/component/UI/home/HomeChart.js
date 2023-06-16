import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';


import classes from '../../../page/css/Home.module.css';

const HomeChart = (props) => {
    console.log('allPf', props.allPf);
const chartRef = useRef(null);

  useEffect(() => {
    // Register necessary chart components and plugins
    Chart.register(...registerables);

    // Create the chart
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: ['7-8', '8-9', '9-10', '10-11'],
        datasets: [
          {
            type: 'bar',
            label: '총 스테이지 수',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [1, 2, 3],
            borderColor: 'red',
            borderWidth: 2,
          },
          {
            type: 'bar',
            label: '"대기중" 스테이지 수',
            backgroundColor: 'rgb(75, 192, 192)',
            data: [1, 2, 3],
          },
          {
            type: 'bar',
            label: '"참여중" 스테이지 수',
            backgroundColor: '#67db37',
            data: [1, 2, 3],
          },
          {
            type: 'bar',
            label: '"완료" 스테이지 수',
            backgroundColor: '#ffc029',
            data: [1, 2, 3],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '계이득의 스테이지',
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} className={classes.chart} />;
};


export default HomeChart;