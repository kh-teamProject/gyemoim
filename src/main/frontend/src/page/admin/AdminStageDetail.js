import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import styles from "../../page/css/StageAgree.module.css";


const AdminStageDetail = () => {


const { pfID } = useParams();
console.log(pfID);

//스테이지 기존정보 조회
const [stageDetail1, setStageDetail1] = useState([]);


//스테이지 상세정보 조회
const [stageDetail2, setStageDetail2] = useState([]);


//스테이지 기본정보 조회 기능
useEffect(() => {
  try {
    axios
      .get("/admin/stage/detail", {
       params: {
         pfID: pfID,
       },

      })
      .then((res) => {
        console.log(res.data.StageDetail1);
        setStageDetail1(res.data.StageDetail1);
        console.log(res.data.StageDetail2);
        setStageDetail2(res.data.StageDetail2);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}, []);


  return (
    <>
      <h1>스테이지 디테일 페이지</h1>
        <div className={styles.flex1}>
         {stageDetail1
                          .map((value, index) => (
        <h3>[{value.pfName}] 스테이지 정보입니다.</h3>
             ))}
        </div>

       <div><h3>스테이지 기본 정보(pf테이블)</h3></div>

    <div className={styles.flexD}>

                  <div className={styles.flex1}>
                    <ul >
                      <li>번호</li>
                      <li>이름</li>
                      <li>약정금</li>
                      <li>등급</li>
                      <li>이율</li>
                      <li>관심사</li>
                      <li>상태</li>
                      <li>시작일</li>
                      <li>잔액</li>
                     </ul>
                    </div>


                  {stageDetail1
                  .map((value, index) => (
                  <div className={styles.flex1}>
                    <ul key={index}>
                    <li>{value.pfID}</li>
                    <li>{value.pfName}</li>
                    <li>{value.deposit.toLocaleString()}원</li>
                     <li>{value.prank}</li>
                     <li>{value.pfRate}%</li>
                     <li>{value.interest}</li>
                      <li>{value.startFlag}</li>
                     <li>{value.startDate}</li>
                     <li>{value.endDate}</li>
                     <li>{value.stageBalance}</li>
                    </ul>
                    </div>

              ))}
     </div>



       <div><h3>스테이지 상세 정보(roll테이블)</h3></div>
        <div className={styles.flexD}>
              <div className={styles.flex1}>
                <ul >
                  <li>입금횟수</li>
                  <li>입금누적</li>

                 </ul>
                </div>



              {stageDetail2
                  .map((value, index) => (
                  <div className={styles.flex1}>
                    <ul key={index}>
                    <li>{value.depositCnt}</li>
                    <li>{value.stageAmount}</li>
                    </ul>

                    </div>
                    ))}
        </div>

    </>
  );
};

export default AdminStageDetail;