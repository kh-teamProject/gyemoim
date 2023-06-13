import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import styles from "../css/StageCreate.module.css";

import Participants from "../../component/UI/stage/Participants";



import Rate from "../../component/UI/stage/Rate";

import Turn from "../../component/UI/stage/Turn";

import Agree from "../../component/UI/stage/Agree";

import Category from "../../component/UI/stage/Category";


const StageCreate = () => {
 const token = jwtDecode(Cookies.get('Set-Cookie'));
   const uNo = token.uNo;

  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  const [rate, setRate] = useState("");

   const [category, setCategory] = useState("");

  const [rateTable, setRateTable] = useState("이율표 보기");

  const [importTable, setImportTable] = useState([]);
  const [isImportTable, setIsImportTable] = useState(false);

const [createButton, setCreateButton] = useState(false);


 const [turn, setTurn] = useState("");

 const [deposit, setDeposit] = useState("");
 const [payment, setPayment] = useState("");




const [pfName, setPfName] = useState("");
const [isDuplicate, setIsDuplicate] = useState(false);
 const [message, setMessage] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const countHandler = (event) => {
    setCount(event.target.value);
    console.log(event.target.value);

  };

  const submitClick = () => {
    axios
      .post("/stageCreate", null, {
        params: {

           uNo : uNo,
          pfName: name,
          pfEntry: count,
          pfRate: rate,
          deposit: deposit,
          payment : payment,
          interest : category,
         receiveTurn : turn,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const depositHandler = (participantsData, payment) => {
    setDeposit(participantsData);
    setPayment(payment);
  };


  const depositInputHandler = (depositData) => {
    setDeposit(depositData);
  };


  const rateHandler = (rateData) => {
    setRate(rateData);
  };


  const importTableClick = () => {
    if (!isImportTable) {
      setIsImportTable(true);
      setRateTable("이율표 닫기");

      axios
        .get("/stageCreateImportTable",{
          params: {
            pfRate: rate,
            deposit: deposit,
          },
        })
        .then((res) => {
          setImportTable(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsImportTable(false);
      setRateTable("이율표 보기");
    }
  };

 const createButtonClick = () => {
    if (!createButton) {
      setCreateButton(true);

    } else {
      setCreateButton(false);
    }
  };
  const closeHandler = (e) => {
    setIsImportTable(false);
  };

  const turnHandler = (turnData) => {
    setTurn(turnData);
  };

  const categoryHandler = (categoryData) => {
    setCategory(categoryData);
  };


const movePage = useNavigate("");



  const handleCheckDuplicate = () => {
    axios
      .post("/checkPfName",null, {
        params: {
          pfName: name,

        },
      })
      .then((response) => {
        setIsDuplicate(response.data);
        console.log(response.data);
        if (response.data) {
          setMessage("중복된 스테이지 이름입니다.");
        } else {
          setMessage("사용 가능한 스테이지 이름입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

 const [selectedButton, setSelectedButton] = useState('');

const countClickHandler = (value) => {
    setSelectedButton(value);
  };



  return (
    <>
    <div className={styles.flexD}>
    <div className={styles.flex2}>
      <h1 className={styles.title}> Stage 등록</h1>
         <h3>
        Stage 등록을 시작합니다. 선택 또는 기입한 사항을 빠짐없이 확인하여
        진행해주세요.
        </h3>
     </div>
     </div>

 <div  className={styles.box} >

      <div  className={styles.flex2} >
       <h1 className={styles.sixth}>Stage 기본 정보 등록</h1>
      </div>



      <form action="/register" method="get">
      <div className={styles.flexD}>
       <div className={styles.flex2}>

        <div className={styles.flex2}>
          <h4>스테이지 이름</h4>
          <div className={styles.flexD}>

           <div className={styles.flex1}>
          <input className={styles.inputStage}
            style={{borderColor: isDuplicate ? 'red' : 'gray'}}
            type="text"
            onChange={nameHandler}
            name="pfName"
            value={name}
            placeholder="스테이지 이름을 입력해주세요"
          />
          <div className={styles.small}>
          <p  style={{color: isDuplicate ? 'red' : 'gray'}}>{message}</p>
         </div>

          </div>

            <div className={styles.flex1}>
             <button className={styles.buttonSmall} type="button" onClick={handleCheckDuplicate}>중복체크</button>
            </div>

            </div>

            </div>

        <div className={styles.flex2}>
        <h4>참여인원</h4>
        <div className={styles.textLeft}>
          <button type="button" name="count" value="5"  onClick={countHandler} className={styles.button1} >5명</button>
          <button type="button" name="count" value="7"  onClick={countHandler} className={styles.button1}>7명 </button>

        </div>
         </div>


        <div className={styles.flex2}>
        <h4>약정금액(총 금액)</h4>
        <div className={styles.textLeft}>
          {count === "5" && (
            <>

            <label  className={styles.selectLabel}><Participants name="deposit" value="500000"   onClick={depositHandler} >50만원(월10만원) </Participants> </label>
             <label  className={styles.selectLabel}> <Participants name="deposit" value="1000000"  onClick={depositHandler}>100만원(월20만원) </Participants></label>
             <label  className={styles.selectLabel}><Participants name="deposit" value="1500000" onClick={depositHandler}>150만원(월30만원) </Participants></label>

            <label  className={styles.selectLabel}><Participants name="deposit" value="2000000" onClick={depositHandler}>200만원(월40만원) </Participants></label>
            <label  className={styles.selectLabel}> <Participants name="deposit" value="2500000" onClick={depositHandler}>250만원(월50만원) </Participants></label>

            </>
          )}
          {count === "7" && (
            <>
              <label  className={styles.selectLabel}><Participants name="deposit" value="700000" onClick={depositHandler}>70만원(월10만원) </Participants></label>
              <label  className={styles.selectLabel}><Participants name="deposit" value="1400000" onClick={depositHandler}>140만원(월20만원) </Participants></label>

              <label  className={styles.selectLabel}><Participants name="deposit" value="2100000" onClick={depositHandler}>210만원(월30만원) </Participants></label>
             <label  className={styles.selectLabel}> <Participants name="deposit" value="2800000" onClick={depositHandler}>280만원(월40만원) </Participants></label>
            <label  className={styles.selectLabel}>  <Participants name="deposit" value="3500000" onClick={depositHandler}>350만원(월50만원) </Participants></label>
            </>
          )}
        </div>
         </div>


        <div className={styles.flex2}>
        <h4>이율</h4>

          <div className={styles.textLeft}>
          {count === "5" && (
            <>
               <Rate name="rate" value="1.86" onClick={rateHandler}>
              </Rate>
              <Rate name="rate" value="3.97" onClick={rateHandler}>
              </Rate>
            </>
          )}
          {count === "7" && (
            <>
              <Rate name="rate" value="2.65" onClick={rateHandler}>
              </Rate>
              <Rate name="rate" value="7.6" onClick={rateHandler}>
              </Rate>
            </>
          )}

        </div>
     </div>
     </div>

        <div className={styles.flex2}>
        <div className={styles.flex2}>
          <input
            type="button"
            className={styles.button}
            onClick={importTableClick}
            value={rateTable}
          />
          {isImportTable && (
            <>
            <div className={styles.flex1}>
              <table  className={styles.table}>
                <thead>
                  <tr>
                    <td>이율</td>
                    <td>수령순서</td>
                    <td>약정금</td>
                    <td>개인별 월입금액</td>
                    <td>개인별 총입금액</td>
                    <td>개인별 적용이율</td>
                    <td>개인별 실지급금</td>
                  </tr>
                </thead>
                <tbody>
                  {importTable.map((value, index) => (
                    <tr key={index}>
                      <td>{value.pfRate}%</td>
                      <td>{value.receiveTurn}</td>
                      <td>{value.deposit.toLocaleString()}</td>
                      <td>{value.upayment.toLocaleString()}</td>
                      <td>{value.utotalPayment.toLocaleString()}</td>
                      <td>{value.urate}%</td>
                     <td>{value.utotalReceipts.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </>
          )}
         </div>





         <div className={styles.flex2}>
        <h4>나의 순번</h4>
         <div className={styles.textLeft}>
          {count === "5" && (
            <>
         <Turn name="turn" value="1" onClick={turnHandler}> </Turn>
          <Turn name="turn" value="2" onClick={turnHandler}> </Turn>
          <Turn name="turn" value="3" onClick={turnHandler}></Turn>
          <div>
         <Turn name="turn" value="4" onClick={turnHandler}></Turn>
          <Turn name="turn" value="5" onClick={turnHandler}> </Turn>
          </div>
            </>
          )}
          {count === "7" && (
            <>
          <Turn name="turn" value="1" onClick={turnHandler}></Turn>
          <Turn name="turn" value="2" onClick={turnHandler}> </Turn>
          <Turn name="turn" value="3" onClick={turnHandler}> </Turn>
          <div>
         <Turn name="turn" value="4" onClick={turnHandler}> </Turn>
          <Turn name="turn" value="5" onClick={turnHandler}> </Turn>
         <Turn name="turn" value="6" onClick={turnHandler}> </Turn>
        <Turn name="turn" value="7" onClick={turnHandler}> </Turn>
        </div>
            </>
          )}
        </div>
       </div>


         <div className={styles.flex2}>
          <h4>관심사</h4>
        <div className={styles.textLeft}>
         <Category  name="category" value="목돈" onClick={categoryHandler}> </Category>
        <Category  name="category" value="여행" onClick={categoryHandler}> </Category>
        <Category  name="category" value="전자제품" onClick={categoryHandler}> </Category>
        <div>
        <Category  name="category" value="패션잡화" onClick={categoryHandler}> </Category>
        <Category  name="category" value="취미" onClick={categoryHandler}> </Category>
        <Category  name="category" value="웨딩" onClick={categoryHandler}> </Category>
        <Category  name="category" value="자동차" onClick={categoryHandler}> </Category>
        </div>
         </div>

        </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.js"></script>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>

           <div className={styles.flex1}>
             <Link to={`/stageAgree/${name}`}>
             <button className={styles.button}  onClick={()=>{
             submitClick()
             }}>생성하기</button>
            </Link>
            </div>

    </div>

    </div>
      </form>

    </div>


    </>

  );
};

export default StageCreate;