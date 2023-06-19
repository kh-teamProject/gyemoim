import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import classes from '../../../page/css/Home.module.css';

Chart.register(ArcElement, Tooltip, Legend);


const HomeChart = (props) => {
  const data = {
    labels: ['대기중 스테이지 수', '참여중 스테이지 수', '완료 스테이지 수'],
    datasets: [
      {
        data: [props.waitingPf, props.partPf, props.completePf],
        backgroundColor: ['#f96c6c', '#fed081', '#7bc1b2'],
      },
    ],
  };

  return <Pie data={data} options={{ responsive: true }} style={{ width: '300px' , height: '300px'}}/>;
};

export default HomeChart;