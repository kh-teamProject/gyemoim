
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';


import styles from "../css/StageCreate.module.css";

import Participants from "../../component/UI/stage/Participants";
import Rate from "../../component/UI/stage/Rate";
import Turn from "../../component/UI/stage/Turn";

import Agree from "../../component/UI/stage/Agree";

const StageCreate = () => {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  const [rate, setRate] = useState("");
  const [rateTable, setRateTable] = useState("이율표 보기");

  const [importTable, setImportTable] = useState([]);
  const [isImportTable, setIsImportTable] = useState(false);


const [createButton, setCreateButton] = useState(false);


 const [turn, setTurn] = useState("");

 const [deposit, setDeposit] = useState("");

 const [category, setCategory] = useState("");

const [rank, setRank] = useState("");

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
          pfName: name,
          pfEntry: count,
          pfRate: rate,
          Deposit: deposit,
          interest: category,
          pRank:rank,
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

  const depositHandler = (participantsData) => {
    setDeposit(participantsData);
  };

  const rateHandler = (rateData) => {
    setRate(rateData);
  };

  const importTableClick = () => {
    if (!isImportTable) {
      setIsImportTable(true);
      setRateTable("이율표 닫기");

      axios
        .get("/stageCreate", {
          params: {
            pfRate: rate,
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

  const rankHandler = (event) => {
    setRank(event.target.value);
    console.log(event.target.value);
  };

  const categoryHandler = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
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



  return (
    <>
    <div className={styles.flexD}>

    <div className={styles.flex6}>
      <h1 className={styles.title}> Stage 등록</h1>

      <h4>
        Stage 등록을 시작합니다. 선택 또는 기입한 사항을 빠짐없이 확인하여
        진행해주세요.
      </h4>
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
          <div className={styles.flexD}>
           <div className={styles.flex1}>
          <input className={styles.inputStage}
            style={{borderColor: isDuplicate ? 'red' : 'gray'}}
            type="text"
            onChange={nameHandler}
            name="pfName"
            value={name}
            placeholder="스테이지 이름 기재해주세요"
          />
          <div className={styles.small}>
              <p  style={{color: isDuplicate ? 'red' : 'gray'}}>{message}</p>

           </div>
           </div>

            <div className={styles.flex1}>
                  <button className={styles.buttonSmall} type="button" onClick={handleCheckDuplicate}>중복체크</button>
            </div>

            </div>
            <div>

                </div>
            </div>
        <div className={styles.flex1}>
        <h4>참여인원</h4>
          <input type="radio" name="count" value="5" onClick={countHandler} />
          5명
          <input type="radio" name="count" value="7" onClick={countHandler} />
          7명
        </div>

        <div className={styles.flex1}>
        <h4>약정금액(총 금액)</h4>

          {count === "5" && (
            <>

              <Participants name="deposit" value="2500000" onClick={depositHandler}>
                250만원(월50만원)
              </Participants>
              <Participants name="deposit" value="5000000" onClick={depositHandler}>
                500만원(월100만원)
              </Participants>
            </>
          )}
          {count === "7" && (
            <>
              <Participants name="deposit" value="3500000" onClick={depositHandler}>
                350만원(월50만원)
              </Participants>
              <Participants name="deposit" value="7000000" onClick={depositHandler}>
                700만원(월100만원)
              </Participants>
            </>
          )}
        </div>

        <div className={styles.flex1}>
        <h4>이율</h4>

          {count === "5" && (
            <>
              <Rate name="rate" value="1.86" onClick={rateHandler}>
                1.86%
              </Rate>
              <Rate name="rate" value="3.97" onClick={rateHandler}>
                3.97%
              </Rate>
            </>
          )}
          {count === "7" && (
            <>
              <Rate name="rate" value="2.65" onClick={rateHandler}>
                2.65%
              </Rate>
              <Rate name="rate" value="7.6" onClick={rateHandler}>
                7.6%
              </Rate>
            </>
          )}
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
                  </tr>
                </thead>
                <tbody>
                  {importTable.map((value, index) => (
                    <tr key={index}>
                      <td>{value.pfRate}</td>
                      <td>{value.receiveTurn}</td>
                      <td>{value.deposit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </>
          )}
         </div>





        <div className={styles.flex1}>
        <h4>나의 순번</h4>
          {count === "5" && (
            <>
          <Turn name="turn" value="1" onClick={turnHandler}>1번 </Turn>
          <Turn name="turn" value="2" onClick={turnHandler}>2번 </Turn>
          <Turn name="turn" value="3" onClick={turnHandler}>3번 </Turn>
         <Turn name="turn" value="4" onClick={turnHandler}>4번 </Turn>
          <Turn name="turn" value="5" onClick={turnHandler}>5번 </Turn>
            </>
          )}
          {count === "7" && (
            <>
          <Turn name="turn" value="1" onClick={turnHandler}>1번 </Turn>
          <Turn name="turn" value="2" onClick={turnHandler}>2번 </Turn>
          <Turn name="turn" value="3" onClick={turnHandler}>3번 </Turn>
         <Turn name="turn" value="4" onClick={turnHandler}>4번 </Turn>
          <Turn name="turn" value="5" onClick={turnHandler}>5번 </Turn>
         <Turn name="turn" value="6" onClick={turnHandler}>6번 </Turn>
        <Turn name="turn" value="7" onClick={turnHandler}>7번 </Turn>
            </>
          )}
        </div>
        <div className={styles.flex1}>
         <h4>신용등급</h4>
          <input type="radio" name="rank"  value="A" onChange={rankHandler} />A등급(1~2)
          <input type="radio" name="rank"  value="B" onChange={rankHandler} />B등급(3~5)
          <input type="radio" name="rank"  value="C" onChange={rankHandler} />C 등급(6~9)
        </div>

         <div className={styles.flex1}>
          <h4>관심사</h4>
          <input
            type="radio"
            name="category"
            value="목돈"
            onChange={categoryHandler}
          />
          목돈
          <input
            type="radio"
            name="category"
            value="여행"
            onChange={categoryHandler}
          />
          여행
          <input
            type="radio"
            name="category"
            value="전자제품"
            onChange={categoryHandler}
          />
          전자제품
          <input
            type="radio"
            name="category"
            value="패션잡화"
            onChange={categoryHandler}
          />
          패션잡화
          <input
            type="radio"
            name="category"
            value="취미"
            onChange={categoryHandler}
          />
          취미
          <input
            type="radio"
            name="category"
            value="웨딩"
            onChange={categoryHandler}
          />
          웨딩
          <input
            type="radio"
            name="category"
            value="자동차"
            onChange={categoryHandler}
          />
          자동차
        </div>

    </div>
        </div>

 <div className={styles.flex2}>

            <div className={styles.flex1}>
             <Link to={`/stageAgree/${name}`}>
             <button className={styles.button}  onClick={()=>{
             submitClick()
             }}>생성하기</button>
            </Link>
            </div>


         </div>
      </form>

    </div>


    </>

  );
};

export default StageCreate;
