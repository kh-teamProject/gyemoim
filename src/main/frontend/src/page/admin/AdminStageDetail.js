import { useEffect, useState } from "react";
import styles from "../../page/css/StageAgree.module.css";
import axios from "axios";
import {Link, useParams} from "react-router-dom";


const AdminStageDetail = () => {


  const {pfID} = useParams();
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

    //(유진)pfID를 변수로 받아와서 띄울수 있게 해주는것.

    const [stageDetail, setStageDetail] = useState([]);

    //(유진)숫자를 천단위마다 쉼표로 끊어서 표시
    const formatNum = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    useEffect(() => {
      axios
        .get('/admin/stage/detail1', {
          params: {
            pfID: 29,
          }
        })
        .then((res) => {
          console.log(res.data);
          setStageDetail(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])


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
            <ul>
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
            <ul>
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


        <h1>관리자 스테이지 상세</h1>
        <div>
          <h3>스테이지 정보</h3>
          <div>
            {/*stageDetail이 배열값이니까 배열중에 걍 첫번째 인덱스만 가져오면 된다.. 천재네,, gpt,,,모든건 자바로 통한다,,,*/}
            {stageDetail.length > 0 && (
              <div>
                <ul key={pfID}>
                  스테이지 이름 : {stageDetail[0].pfName}
                  스테이지 상태 : {stageDetail[0].startFlag}
                  스테이지 등급 : {stageDetail[0].prank}
                  스테이지 이율 : {stageDetail[0].pfRate}
                  스테이지 시작일 : {stageDetail[0].startDate}
                </ul>
              </div>
            )}
          </div>
          {/*유진 회원정보 띄우기*/}
          <div>
            <h3>회원정보</h3>
            {stageDetail.map((value, index) => (
              <div>
                <Link to={`/admin/account/detail/${value.uno}`}>
                  <ul>
                    <li>
                      방장여부 : {value.pfMaster} |
                      회원번호 : {value.uno} |
                      이름 : {value.name} |
                      월 입금액 : {formatNum(Number(value.upayment))} |
                      실 수령액 : {formatNum(Number(value.utotalReceipts))} |
                      실 이득 : {formatNum(Number(value.ureceipt))}
                    </li>
                  </ul>
                </Link>
              </div>
            ))}
          </div>
          <button>
            완료처리
          </button>
        </div>
      </>


    );
  };

export default AdminStageDetail;