import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation} from 'react-router-dom';

import styles from "../css/StageAgree.module.css";
import StageCreateModal from "../../component/UI/stage/StageCreateModal";

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const StagePartIn = () => {
   const token = jwtDecode(Cookies.get('Set-Cookie'));
   const uNo = token.uNo;

    const location = useLocation();
    const locationArr = location.pathname.split('/');
    const parameter = decodeURIComponent(locationArr[locationArr.length - 1]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(null);
   const [checked, setChecked] = useState(false);


  const modalHandler = () => {
    setPage('Modal');
  };

  const pageHandler = () => {
    setPage(null);
  };

 const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleButtonClick = () => {
    // 버튼을 클릭할 때 실행되는 로직
  };

  return (
    <>

     <div className={styles.flex6}>
      <div className={styles.box}>
        <div className={styles.flexD}>
          <div>

            <div className={styles.flex1}>
              <h3 className={styles.sixth}>스테이지 생성 동의서</h3>
            </div>

            <div className={styles.flex1}>
              <div className={styles.font}>
                <h4>[{parameter}] 스테이지 생성 전, 필수 확인 사항</h4>

                <h4>1)입금</h4>

                <p>모든 순번이 참가하면 영업일 기준으로 스테이가 생성됩니다.</p>
                <p>스테이지 완료시까지 약정기간 동안 매월 지정된 날짜에 약정된 월입금액을 입금할 의무가 있으며 의무 불 이행시 연체이자가 부가됩니다.</p>


                <h4>2)연체</h4>

                <p>약정금을 지급받은 후 입금에 대한 의무를 불이행하여 연체가 발생하는 경우 연체금 상환을 위한 채권추심 절차가 진행됩니다.</p>
                <p>지속적인 연체시에는 법적조치가 이루어집니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.flex1}>
          <input type="radio" checked={checked} onChange={handleCheckboxChange} />
          위 내용을 확인하였으며, 동의하고 스테이지에 참여합니다.
       </div>


      <div className={styles.flex1}>
        <button className={styles.button} onClick={modalHandler} disabled={!checked}>스테이지 확인 </button>
         {page && <StageCreateModal onConfirm={pageHandler}/>}
        </div>
     </div>
          </>
                );
        }
export default StagePartIn;