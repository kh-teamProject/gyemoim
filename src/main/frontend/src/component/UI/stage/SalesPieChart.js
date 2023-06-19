import {useEffect, useRef, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import {Chart} from 'chart.js/auto';
import {common} from "@mui/material/colors";

const SalesPieChart = () => {
  const [stageFromDB, setStageFromDB] = useState([]);
  const [startFlag, setStartFlag] = useState('전체');
  const paymentRef = useRef(null); // 캔버스 요소를 참조하기 위한 useRef 훅
  const interstRef = useRef(null);

  useEffect(() => {
    axios
      .get('/admin/stage/list')
      .then((res) => {
        console.log(res.data);
        setStageFromDB(res.data.Stage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // 파이 차트를 그릴 조건 확인 후 그리기
    if (stageFromDB.length > 0) {
      if (paymentRef.current) {
        const ctx1 = paymentRef.current.getContext('2d');
        const existingPayment = Chart.getChart(paymentRef.current); // 기존 차트 가져오기
        if (existingPayment) {
          existingPayment.destroy(); // 기존 차트 파괴
        }
        // startFlag 별 관심사 필터링
        let filteredData = stageFromDB;
        if (startFlag !== '전체') {
          filteredData = stageFromDB.filter((item) => item.startFlag === startFlag);
        }

        // payment 값의 개수를 합산
        const paymentCounts = {};
        filteredData.forEach((item) => {
          const payment = item.payment;
          if (paymentCounts[payment]) {
            paymentCounts[payment]++;
          } else {
            paymentCounts[payment] = 1;
          }
        });

        // 합산된 개수를 배열로 변환
        const paymentData = Object.values(paymentCounts);

        new Chart(ctx1, {
          type: 'pie',
          data: {
            labels: ['10만원', '20만원', '30만원', '40만원', '50만원'],
            datasets: [
              {
                label: '금액별 계모임 갯수 ',
                backgroundColor: ['#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb'],
                data: paymentData,
                borderColor: 'white',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right', //레이블을 옆에 표시
              },
              title: {
                display: true,
                text: '월 납입금별 생성현황',
              },
            },
          },
        });
      }
    }

    if (interstRef.current) {
      const ctx2 = interstRef.current.getContext('2d');
      const exixstingInterst = Chart.getChart(interstRef.current);
      if (exixstingInterst) {
        exixstingInterst.destroy();
      }
      // startFlag 별 관심사 필터링
      let filteredData = stageFromDB;
      if (startFlag !== '전체') {
        filteredData = stageFromDB.filter((item) => item.startFlag === startFlag);
      }

      // interest 별 갯수 계산
      const interestCounts = {
        목돈: 0,
        여행: 0,
        전자제품: 0,
        패션잡화: 0,
        취미: 0,
        웨딩: 0,
        자동차: 0,
      };

      filteredData.forEach((item) => {
        const interest = item.interest;
        if (interestCounts.hasOwnProperty(interest)) {
          interestCounts[interest]++;
        }
      });

      const interestData = Object.values(interestCounts);

      new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['목돈', '여행', '전자제품', '패션잡화', '취미', '웨딩', '자동차'],
          datasets: [
            {
              label: '관심사 별 계모임 곗수',
              backgroundColor: [
                '#ff6384',
                '#ff9f40',
                '#ffcd56',
                '#4bc0c0',
                '#36a2eb',
                '#9966ff',
                '#ff4444',
              ],
              data: interestData,
              borderColor: 'white',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right', //레이블을 옆에 표시
            },
            title: {
              display: true,
              text: '관심사 별 분류',
            },
          },
        },
      });

    }
  }, [stageFromDB, startFlag]);

  const handleStartFlag = (e) => {
    setStartFlag(e.target.value);
  }
  return (
    <>
      <div style={{width: '350px', height: '350px'}}>
        <div>
          <select onChange={handleStartFlag}>
            <option value="전체">전체</option>
            <option value="대기중">대기중</option>
            <option value="참여중">참여중</option>
            <option value="완료">완료</option>
          </select>
        </div>
        <span style={{display: 'flex'}}>
      <canvas ref={paymentRef} id="payment-chart"/>
      <canvas ref={interstRef} id="pfEntry-chart"/>
      </span>
      </div>
    </>
  );
};

export default SalesPieChart;