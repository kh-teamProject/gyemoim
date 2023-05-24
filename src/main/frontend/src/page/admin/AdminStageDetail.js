import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const AdminStageDetail = () => {
  //(유진)pfID를 변수로 받아와서 띄울수 있게 해주는것.
  const {pfID} = useParams();
  const [stageDetail,setStageDetail] = useState([]);

  //(유진)숫자를 천단위마다 쉼표로 끊어서 표시
  const formatNum = (number) =>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() =>{
    axios
      .get('/admin/stage/detail',{
        params:{
          pfID :29,
        }
      })
      .then((res)=>{
        console.log(res.data);
        setStageDetail(res.data);
      })
      .catch((error) =>{
        console.log(error);
      });
  },[])
  return (
    <>
    <h1>관리자 스테이지 상세</h1>
    {/*유진 회원정보 띄우기*/}
      <div>
        <h3>회원정보</h3>
        {stageDetail.map((value,index) =>(
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

        ))}



      </div>
    </>

  );
};

export default AdminStageDetail;