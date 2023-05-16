import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import styles from "../component/css/StageAgree.module.css";

/* 스테이지 확인 화면 */
const Agree = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const location = useLocation();
  const locationArr = location.pathname.split('/');
  const parameter = decodeURIComponent(locationArr[locationArr.length - 1]);
  const name = parameter;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get("/stageAgree", {
          params: {
            name: name
          }
        });
        setData1(response1.data);
        console.log(response1.data);

        const response2 = await axios.get("/stageAgree2", {
          params: {
            name: name
          }
        });
        setData2(response2.data);
        console.log(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name]);

  return (
    <>
      <div className={styles.flexD}>
        <div className={styles.box}>
          <div className={styles.flex1}>
            <h2>{name} 스테이지 생성</h2>
          </div>
          <div className={styles.flex1}>
            <div className={styles.font}>
                {data1.map((value, index) => (
                <ul key={index}>
                  <li>pf번호: {value.pfID}</li>
                </ul>
              ))}

              {data2.map((value, index) => (
                <ul key={index}>
                  <li>월 입금액(수령예정표):  {value.upayment.toLocaleString()}원</li>
                  <li>적용 이율(수령예정표): {value.urate}%</li>
                   <li>총 입금액(수령예정표): {value.utotalPayment.toLocaleString()}원</li>

                  <li>실 지급액(수령예정표): {value.utotalReceipts.toLocaleString()}원</li>

                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agree;
