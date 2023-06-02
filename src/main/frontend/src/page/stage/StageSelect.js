//import React from 'react';
import Receipt from "../../component/UI/stage/Receipt"
import ReceiptTurn from "../../component/UI/stage/ReceiptTurn"
import classes from "../css/StageSelect.module.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = (props) => {

  const [stageData, setStageData] = useState(null);
  const [error, setError] = useState(null);

  const { pfID } = props;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/stageSelect?pfID=1');
        setStageData(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [pfID]);

  console.log(stageData);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!stageData) {
    return <div>Loading...</div>;
  } else {
  }

  const handleJoin = () => {
    // Handle the logic for joining here
  };

  const handleUse = () => {
    // Handle the logic for using here
  };

  return (
    <>
      <div className="Sidebar">
        <div className={classes.sidebar}>
          <h1>{stageData.pfName}</h1>
          <div className="eachId">
            <div className={classes.eachId}>
              <span className="categoryName"></span>
              <span id="stageCode">{stageData.PFID}</span>
              <span id="openYn">공개</span>
            </div>
          </div>
          <div className="user">
            <div className={classes.stageInfoCardTop}>
              <span id="createUser" style={{ color: '#FFFFFF' }}>{stageData.PFMASTER}</span>
              <h4 id="stageTitle">{stageData.PFNAME}</h4>
            </div>
          </div>
          <div className="stageInfoCont">
            <div className={classes.stageInfoCardCont}>
              <div className="price">
                <div className={classes.price}>
                  약정금:
                  <span id="totalMonet">{stageData.DEPOSIT}</span>
                  원
                </div>
              </div>
            </div>
          </div>
          <div className="priceDetail">
            <div className={classes.priceDetail}>
              월
              <span id="stageMoney">{stageData.PAYMENT}</span>
              원
            </div>
            <div className={classes.priceDetail}>
              <span id="stageRateTitle1">이율(세후)</span>
              Up to
              <span id="stageRate">{stageData.PFRATE}%</span>
            </div>
          </div>
          <div className="stageInfoCardBtn">
            <div className={classes.stageInfoCardBtn}>
              <div>
                <button onClick={handleJoin} className="button">참여하기</button>
              </div>
              <div>
                <button onClick={handleUse} className="button">이용하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


const Select = () => {

  return (
    <>
      <div className="Select">
        <div className={classes.select}>
          <div className="container">
            <div className={classes.container}>
              <div className={classes.sidebar}>
                <nav className="sidebar">
                  <Sidebar/>
                </nav>
              </div>
              <main className="main">
                <div className="receiptParti">
                  <ReceiptTurn/>
                </div>
                <div className = "receiptArea">
                  <Receipt/>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}


export default Select;