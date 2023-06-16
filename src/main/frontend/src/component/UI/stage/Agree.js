import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import styles from "../../../page/css/StageAgree.module.css";


import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";


/* 스테이지 확인 화면 */
const Agree = () => {

 const token = jwtDecode(Cookies.get('Set-Cookie'));
 const uNo = token.uNo;

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const location = useLocation();
  const locationArr = location.pathname.split('/');
  const parameter = decodeURIComponent(locationArr[locationArr.length - 1]);
  const pfName = parameter;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get("/stageAgree", {
          params: {
            pfName: pfName

          }
        });
        setData1(response1.data);
        console.log(response1.data);

        const response2 = await axios.get("/stageAgree2", {
          params: {
            uNo : uNo,
            pfName: pfName
          }
        });
        setData2(response2.data);
        console.log(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pfName]);

  return (
    <>


        <div className={styles.flexD}>
        <div className={styles.flex6}>
        <div className={styles.box2}>
          <div className={styles.flex1}>
            <h3>{pfName} 스테이지 생성</h3>
          </div>

          <div className={styles.flex2}>

            <div className={styles.font}>

               <div className={styles.gap}>
              <div>
              <ul >
                <li>월 입금액</li>
                <li>적용 이율</li>
                 <li>총 입금액</li>

                <li>실 지급액</li>
              </ul>
              </div>

               <div className={styles.won} >
              {data2.map((value, index) => (
                <ul key={index}>
                  <li>{value.upayment.toLocaleString()}원</li>
                  <li>{value.urate}%</li>
                   <li> {value.utotalPayment.toLocaleString()}원</li>
                  <li> {value.utotalReceipts.toLocaleString()}원</li>
                </ul>
              ))}
               </div>
               </div>
            </div>
          </div>
        </div>
       </div>
      </div>
    </>
  );
}

export default Agree;
