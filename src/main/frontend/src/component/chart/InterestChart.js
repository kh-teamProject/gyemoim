import {useEffect, useState} from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";
import axios from "axios";

const InterestChart = () => {
  const [interest, setInterest] = useState([
    {
      COUNT: 0,
      INTEREST: '여행'
    },
    {
      COUNT: 0,
      INTEREST: '전자제품'
    },
    {
      COUNT: 0,
      INTEREST: '없음'
    },
    {
      COUNT: 0,
      INTEREST: '패션잡화'
    },
    {
      COUNT: 0,
      INTEREST: '취미'
    },
    {
      COUNT: 0,
      INTEREST: '목돈'
    },
    {
      COUNT: 0,
      INTEREST: '자동차'
    },
    {
      COUNT: 0,
      INTEREST: '웨딩'
    }
  ]);

  useEffect(() => {
    axios.get('/getInterest')
      .then((res) => {
        const dbData = res.data;
        dbData.forEach((item) => {
          interest.map((value, index) => {
            if(interest[index].INTEREST === item.INTEREST) {
              return interest[index.COUNT] += item.COUNT;
            }
          });
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [interest[4].INTEREST, interest[3].INTEREST, interest[0].INTEREST, interest[5].INTEREST, interest[2].INTEREST, interest[6].INTEREST, interest[7].INTEREST, interest[1].INTEREST],
    datasets: [
      {
        label: '관심사',
        data: [interest[4].COUNT, interest[3].COUNT, interest[0].COUNT, interest[5].COUNT, interest[2].COUNT, interest[6].COUNT, interest[7].COUNT, interest[1].COUNT],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(239,167,241,0.83)',
          'rgba(172,172,171,0.4)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(239, 167, 241, 1)',
          'rgba(172, 172, 171, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <Pie data={data}/>
  );
};

export default InterestChart;