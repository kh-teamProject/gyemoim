import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import {FaMoneyBillAlt, FaAvianex, FaApple, FaTshirt, FaCarAlt, FaBirthdayCake, FaHiking} from 'react-icons/fa';

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


const [selectedValue, setSelectedValue] = useState("");

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
    <div className={[styles.flex2, styles.position_relative].join(' ')}>
        <img src={require('../../component/assert/images/stageCreate_hiyoko.png')} alt="logo" className={styles.hiyokoImg} />
        <h1 className={styles.title}> Stage 등록</h1>
        <div className={styles.steps}>
            <div className={[styles.active, styles.step_item].join(' ')}>
                <div className={styles.content}>
                    <div className={styles.title}>스테이지 정보 입력</div>
                    <div className={styles.description}> Stage 등록을 시작합니다. 선택 또는 기입한 사항을 빠짐없이 확인하여 진행해주세요.</div>
                </div>
            </div>
            <div className={styles.step_item} style={{ counterIncrement: 'ordered' }}>
                <div className={styles.content}>
                    <div className={[styles.title, styles.gray].join(' ')}>약관동의</div>
                    <div className={styles.gray}>스테이지 생성 시 약관동의는 필수입니다.</div>
                </div>
            </div>
        </div>
     </div>
     </div>

 <div  className={styles.box} >

      <div  className={styles.flex2} >
       <h1 className={styles.sixth}>Stage 기본 정보 등록</h1>
      </div>



      <form action="/register" method="get">
      <div className={styles.flexD}>
       <div className={styles.flex1}>
        <div className={styles.flex2}>
          <h4>스테이지 이름</h4>
          <div  className={[styles.stageName, styles.flexD].join(' ')}>
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

            <div className={[styles.flex1, styles.textLeft].join(' ')}>
             <button className={[styles.button001, styles.btnPush, styles.btnBlueGreen, styles.textLeft].join(' ')} type="button" onClick={handleCheckDuplicate}>중복체크</button>
            </div>

            </div>

            </div>

        <div className={styles.flex2}>
        <h4>참여인원</h4>
        <div className={styles.textLeft}>

        <input className={styles.button3} type="radio" name="count" value="5"  onClick={countHandler}  id="C5"  />
        <label htmlFor ="C5" className={styles.button3} >5명 </label>
         <input className={styles.button3}  type="radio" name="count" value="7"  onClick={countHandler}  id="C7"  />
        <label htmlFor ="C7" className={styles.button3} >7명 </label>
        </div>
         </div>

        <div className={styles.flex2}>
        <h4>약정금액(총 금액)</h4>
        <div className={styles.textLeft}>
          {count === "5" && (
            <>

           <Participants name="deposit" value="500000"   onClick={depositHandler} id="P51" />
           <label htmlFor="P51" className={styles.button1} >50만원(월10만원) </label>
          <Participants name="deposit" value="1000000"   onClick={depositHandler} id="P52" />
          <label htmlFor="P52" className={styles.button1} >100만원(월20만원)</label>
          <Participants name="deposit" value="1500000"   onClick={depositHandler} id="P53" />
           <label htmlFor="P53" className={styles.button1} >150만원(월30만원)</label>
           <Participants name="deposit" value="1500000"   onClick={depositHandler} id="P54" />
          <label htmlFor="P54" className={styles.button1} >200만원(월40만원)</label>
          <Participants name="deposit" value="1500000"   onClick={depositHandler} id="P55" />
            <label htmlFor="P55" className={styles.button1} >250만원(월50만원)</label>

            </>
          )}
          {count === "7" && (
            <>
               <Participants name="deposit" value="700000"   onClick={depositHandler} id="P71" />
               <label htmlFor="P71" className={styles.button1} >70만원(월10만원) </label>
              <Participants name="deposit" value="1400000"   onClick={depositHandler} id="P72" />
              <label htmlFor="P72" className={styles.button1} >140만원(월20만원)</label>
              <Participants name="deposit" value="2100000"   onClick={depositHandler} id="P73" />
               <label htmlFor="P73" className={styles.button1} >210만원(월30만원)</label>
               <Participants name="deposit" value="2800000"   onClick={depositHandler} id="P74" />
              <label htmlFor="P74" className={styles.button1} >280만원(월40만원)</label>
              <Participants name="deposit" value="3500000"   onClick={depositHandler} id="P75" />
                <label htmlFor="P75" className={styles.button1} >350만원(월50만원)</label>
            </>
          )}
        </div>
         </div>


        <div className={styles.flex2}>
        <h4>이율</h4>
         <div className={[styles.textLeft, styles.rate].join(' ')}>
          {count === "5" && (
            <>
             <Rate name="rate" value="1.86" onClick={rateHandler} id="R1"/>
             <label htmlFor="R1" className={styles.button0} >1.86</label>
              <Rate name="rate" value="3.97" onClick={rateHandler} id="R2" />
             <label htmlFor="R2" className={styles.button0} >3.97</label>
            </>
          )}
          {count === "7" && (
            <>
             <Rate name="rate" value="2.65" onClick={rateHandler} id="R3" />
             <label htmlFor="R3" className={styles.button0} >2.65</label>
              <Rate name="rate" value="7.6" onClick={rateHandler} id="R4" />
              <label htmlFor="R4" className={styles.button0} >7.6</label>

            </>
          )}

        </div>
     </div>
     </div>

        <div className={[styles.flex1, styles.borderLeft].join(' ')}>
        <div className={styles.flex2}>
          <input
            type="button"
            className={[styles.button001, styles.btnPush, styles.btnBlueGreen, styles.widthBig].join(' ')}
            onClick={importTableClick}
            value={rateTable}
          />
          {isImportTable && (
            <>
            <div className={[styles.flex1, styles.marginTop01].join(' ')}>
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
         <div className={[styles.textLeft, styles.receiveTurn].join(' ')}>
          {count === "5" && (
            <>
          <Turn name="turn" value="1" onClick={turnHandler} id="T51"/>
           <label htmlFor="T51" className={styles.button4} >1번</label>
            <Turn name="turn" value="2" onClick={turnHandler} id="T52"/>
           <label htmlFor="T52" className={styles.button4} >2번</label>
           <Turn name="turn" value="3" onClick={turnHandler} id="T53"/>
           <label htmlFor="T53" className={styles.button4} >3번</label>
           <Turn name="turn" value="4" onClick={turnHandler} id="T54"/>
           <label htmlFor="T54" className={styles.button4} >4번</label>
           <Turn name="turn" value="5" onClick={turnHandler} id="T55"/>
           <label htmlFor="T55" className={styles.button4} >5번</label>

            </>
          )}
          {count === "7" && (
            <>
          <Turn name="turn" value="1" onClick={turnHandler} id="T71"/>
           <label htmlFor="T71" className={styles.button4} >1번</label>
            <Turn name="turn" value="2" onClick={turnHandler} id="T72"/>
           <label htmlFor="T72" className={styles.button4} >2번</label>
           <Turn name="turn" value="3" onClick={turnHandler} id="T73"/>
           <label htmlFor="T73" className={styles.button4} >3번</label>
           <Turn name="turn" value="4" onClick={turnHandler} id="T74"/>
           <label htmlFor="T74" className={styles.button4} >4번</label>
           <Turn name="turn" value="5" onClick={turnHandler} id="T75"/>
           <label htmlFor="T75" className={styles.button4} >5번</label>
          <Turn name="turn" value="6" onClick={turnHandler} id="T76"/>
          <label htmlFor="T76" className={styles.button4} >6번</label>
          <Turn name="turn" value="7" onClick={turnHandler} id="T77"/>
          <label htmlFor="T77" className={styles.button4} >7번</label>
            </>
          )}
        </div>
       </div>


         <div className={styles.flex2}>
          <h4>관심사</h4>
        <div className={styles.textLeft}>

        <div>
         <Category  name="category" value="목돈" onClick={categoryHandler}  id="CA1"> </Category>
          <label htmlFor="CA1" className={styles.button5} ><FaMoneyBillAlt /> 목돈</label>
          <Category  name="category" value="여행" onClick={categoryHandler}  id="CA2"> </Category>
           <label htmlFor="CA2" className={styles.button5} ><FaAvianex /> 여행</label>
           <Category  name="category" value="전자제품" onClick={categoryHandler}  id="CA3"> </Category>
            <label htmlFor="CA3" className={styles.button5} ><FaApple /> 전자제품</label>
            <Category  name="category" value="패션잡화" onClick={categoryHandler}  id="CA4"> </Category>
            <label htmlFor="CA4" className={styles.button5} ><FaTshirt /> 패션잡화</label>

            <Category  name="category" value="취미" onClick={categoryHandler}  id="CA5"> </Category>
            <label htmlFor="CA5" className={styles.button5} ><FaHiking /> 취미</label>
            <Category  name="category" value="웨딩" onClick={categoryHandler}  id="CA6"> </Category>
            <label htmlFor="CA6" className={styles.button5} ><FaBirthdayCake /> 웨딩</label>
             <Category  name="category" value="자동차" onClick={categoryHandler}  id="CA7"> </Category>
              <label htmlFor="CA7" className={styles.button5} ><FaCarAlt /> 자동차</label>
              </div>
         </div>

        </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.js"></script>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>

           <div className={styles.flex1}>
             <Link to={`/stageAgree/${name}`}>
             <button className={[styles.button001, styles.btnPush, styles.btnBlueGreen, styles.widthBig].join(' ')}  onClick={()=>{
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