import {useEffect, useState} from "react";
import styles from "../../page/css/StageAgree.module.css";
import axios from "axios";
import {Link, useParams} from "react-router-dom";


const AdminStageDetail = () => {


  const {pfID} = useParams();
  console.log(pfID);
  // const intPFID = Number(pfID);

  //(유진)pfID를 변수로 받아와서 띄울수 있게 해주는것.

  const [stageDetail, setStageDetail] = useState([]);

  //(유진)숫자를 천단위마다 쉼표로 끊어서 표시
  const formatNum = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const complete = (event) => {
    const pfID = Number(event.target.value);
    const confirmed = window.confirm('완료처리하시겠습니까?');
    if (confirmed) {
      axios
        .post('/admin/stage/complete', null, {
          params: {
            pfID
          }
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  };
  useEffect(() => {
    axios
      .get('/admin/stage/detail', {
        params: {
          pfID: pfID,
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
      <h1>관리자 스테이지 상세</h1>
      <div>
        <h3>스테이지 정보</h3>
        <div>
          {/*stageDetail이 배열값이니까 배열중에 걍 첫번째 인덱스만 가져오면 된다.. 천재네,, gpt,,,모든건 자바로 통한다,,,*/}
          {stageDetail.length > 0 && (
            <div>
              <ul>
                스테이지 이름 : {stageDetail[0].pfName}
                스테이지 상태 : {stageDetail[0].startFlag}
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
            <div key={index}>
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
        <div>
          <button onClick={complete} value={pfID}>완료</button>

        </div>
      </div>
    </>


  );
};

export default AdminStageDetail;