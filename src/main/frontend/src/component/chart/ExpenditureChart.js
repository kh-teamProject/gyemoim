import {useEffect, useState} from "react";
import axios from "axios";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";

const ExpenditureChart = () => {
  const [expenditure, setExpenditure] = useState([
    {
      CULTURALCOST: 0,
      ETC: 0,
      FOODCOST: 0,
      HOUSINGCOST: 0,
      MEDICALCOST: 0
    }
  ]);

  useEffect(() => {
    axios.get('/getAverageExpenditure')
      .then((res) => {
        setExpenditure(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ['문화비', '식비', '주거비', '의료비', '기타'],
    datasets: [
      {
        label: '지출내역 평균',
        data: [expenditure[0].CULTURALCOST, expenditure[0].FOODCOST, expenditure[0].HOUSINGCOST, expenditure[0].MEDICALCOST, expenditure[0].ETC],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)'
        ],
        borderColor: [
          'rgb(255, 255, 255, 1)',
          'rgb(255, 255, 255, 1)',
          'rgb(255, 255, 255, 1)',
          'rgb(255, 255, 255, 1)',
          'rgb(255, 255, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <Pie data={data}/>
  );
};

export default ExpenditureChart;