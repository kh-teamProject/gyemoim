import { useEffect, useState } from "react";
import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

const MemberRoleChart = () => {
  const [userRole, SetUserRole] = useState([
    {
      COUNT: 0,
      USERROLE: '가회원'
    },
    {
      COUNT: 0,
      USERROLE: '정회원'
    }
  ]);

  useEffect(() => {
    axios.get('/getMemberRole')
      .then((res) => {
        const roleDB = res.data;
        const updateUserRole = userRole.map((value) => {
          const dbItem = roleDB.find(item => item.USERROLE === value.USERROLE);
          if (dbItem) {
            return { ...value, COUNT: value.COUNT + dbItem.COUNT };
          }
          return value;
        });
        SetUserRole(updateUserRole);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    ChartJS.register(ArcElement, Tooltip, Legend);
  }, []);

  const calcPer = (count) => {
    const totalCount = userRole.reduce((total, role) => total + role.COUNT, 0);
    return ((count / totalCount) * 100).toFixed(2);
  };

  const data = {
    labels: [userRole[0].USERROLE, userRole[1].USERROLE],
    datasets: [
      {
        label: '회원권한',
        data: [userRole[0].COUNT, userRole[1].COUNT],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const count = context.parsed;
            const percentage = calcPer(count);
            return `${count}명 (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Pie data={data} options={options} />
  );
};

export default MemberRoleChart;