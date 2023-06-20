import {useEffect, useState} from "react";
import styles from "../css/admin/AdminStageDetail.modlue.css";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import SalesPieChart from "../../component/UI/stage/SalesPieChart";


const AdminStageDetail = () => {
  const {pfID} = useParams();
  console.log(pfID);
  const navigate = useNavigate();

  // 스테이지 상세 정보 뿌리는 스테이트
  const [stageDetail, setStageDetail] = useState([]);
  // 완료처리 버튼 누르면 렌더링 다시하게 도와주는 스테이트
  const [status, setStatus]= useState(false);

  //(유진)숫자를 천단위마다 쉼표로 끊어서 표시
  const formatNum = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const handleStatus = (pfID) => {
    // const pfID = Number(event.target.value);
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
          setStatus(true);
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
  }, [pfID,status])

  const handleButton = (uno) => {
    navigate(`/admin/account/modify/${uno}`);

  };


  return (
    <>
      <h1>관리자 스테이지 상세</h1>
      <div className="container">
        <div className="section">
          <h3 className="section-title">스테이지 정보</h3>
          {/*stageDetail이 배열값이니까 배열중에 걍 첫번째 인덱스만 가져오면 된다.. 천재네,, gpt,,,모든건 자바로 통한다,,,*/}
          {stageDetail.length > 0 && (
            <div className="section-content">
              <table style={{width :'1080px'}}>
                <colgroup>
                  <col width="15%"/>
                  <col width="15%"/>
                  <col width="15%"/>
                  <col width="15%"/>
                  <col width="15%"/>
                </colgroup>
                <thead className="thead">
                <tr className="tr">
                  <th>이름</th>
                  <th>상태</th>
                  <th>이율</th>
                  <th>시작일</th>
                  <th>종료일</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{stageDetail[0].pfName}</td>
                  <td>{stageDetail[0].startFlag}</td>
                  <td>{stageDetail[0].pfRate}</td>
                  {stageDetail[0].startDate !== null ? <td>{stageDetail[0].startDate}</td> : <td>-</td>}
                  {stageDetail[0].endDate !== null ? <td>{stageDetail[0].endDate}</td> : <td>-</td>}

                </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/*유진 회원정보 띄우기*/}
        <div className="section">
          <h3 className="section-title">회원정보</h3>
          <table>
            <colgroup>
              <col width="15%"/>
              <col width="15%"/>
              <col width="15%"/>
              <col width="15%"/>
              <col width="15%"/>
              <col width="15%"/>
              <col width="15%"/>
            </colgroup>
            <thead className="thead">
            <tr>
              <th>방장여부</th>
              <th>회원번호</th>
              <th>이름</th>
              <th>월 입금액</th>
              <th>실 수령액</th>
              <th>실 이득</th>
              <th>회원상세</th>
            </tr>
            </thead>
            {stageDetail.map((value, index) => (
              <tbody>
              <tr>
                {value.pfMaster === 'M' ?
                  <td>방장</td>
                  : <td>-</td>
                }
                <td>{value.uno}</td>
                <td>{value.name}</td>
                <td>{formatNum(Number(value.upayment))}</td>
                <td>{formatNum(Number(value.utotalReceipts))}</td>
                <td>{formatNum(Number(value.ureceipt))}</td>
                <td>
                  <button onClick={() => handleButton(value.uno)} className="member-btn">회원상세</button>
                </td>

              </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div>
          <button onClick={()=>handleStatus(pfID)} className='complete-btn' value={pfID}>스테이지 완료</button>
        </div>
      </div>
    </>


  );
};

export default AdminStageDetail;