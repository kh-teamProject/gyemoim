import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useLocation} from "react-router-dom";
import Receipt from "../../component/UI/stage/Receipt"
import ReceiptTurn from "../../component/UI/stage/ReceiptTurn"
import classes from "../css/StageSelect.module.css";


const Sidebar = () => {

  const [pf, setPf] = useState([]);
  const [pfData, setPfData] = useState([]);
  const [roll, setRoll] = useState([]);
  const [rollData, setRollData] = useState([]);

  const location = useLocation();
  const pfIDNum = location.pathname.split('/');

  useEffect(() => {
    const pfID = pfIDNum[pfIDNum.length - 1];

    axios.get('/stageSelect', {
      params: {
        pfID: pfID
      }
    })
      .then((res) => {
        setPf(res.data.pf);
        setRoll(res.data.roll);

        const pfNameList = res.data.pf.map((item) => item.pfName);
        const paymentList = res.data.pf.map((item) => item.payment);
        const depositList = res.data.pf.map((item) => item.deposit);
        const pfRateList = res.data.pf.map((item) => item.pfRate);

        const pfData = {
          pfID: pfID,
          pfName: pfNameList.join(''),
          payment: paymentList.join(''),
          deposit: depositList.join(''),
          pfRate: pfRateList.join('')
        };
        setPfData(pfData);


        const unoList = res.data.roll.map((item) => item.uno);
        const nameList = res.data.roll.map((item) => item.name);

        const rollData = {
          uno: unoList.join(''),
          name: nameList.join('')
        };
        setRollData(rollData);

        })
        .catch((error)=>{
          console.log(error);
        });

  }, []);

  const handleJoin = () => {
    // Handle the logic for joining here
  };


  return (
    <>
      <div className="Sidebar">
        <div className={classes.sidebar}>
         <div style={{ marginTop: '20px' }}></div>
          <div className="eachId">
            <div className={`${classes.eachId}`}>
              <span className="categoryName"></span>
              <span id="stageCode">{pfData.pfID}</span>
              <span id="openYn">공개</span>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}></div>
          <div className="user">
            <div className={classes.stageInfoCardTop}>
              <span id="createUser" style={{ color: '#FFFFFF' }}>
              <img src={require('../../component/images/gyemoim_bbiyak.png')} alt="egg" style={{ width: '45px', height: '45px', margin: '-7px -10px', marginRight: '5px', marginBottom: '-15px' }} />
              {rollData.name}</span>
              <div style={{ marginTop: '30px' }}></div>
              <div className={`${classes.pfInfo}`}>
              <span id="stageTitle">{pfData.pfName}</span>
            </div>
            </div>
          </div>
          <div className="stageInfoCont">
            <div className={classes.stageInfoCardCont}>
              <div className="price">
                <div className={classes.price}>
                  약정금:
                  <span id="totalMonet"> {`${Math.floor(pfData.deposit / 10000)}만원`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="priceDetail">
            <div className={classes.priceDetail}>
              월
              <span id="stageMoney"> {`${Math.floor(pfData.payment / 10000)}만원`}</span>
            </div>
            <div className={classes.priceDetailed}>
              <span id="stageRateTitle1">이율(세후) </span>
              Up to
              <span id="stageRate">{pfData.pfRate}%</span>
            </div>
          </div>
          <div className="stageInfoCardBtn">
            <div className={classes.stageInfoCardBtn}>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


const Select = () => {
  const [path, setPath] = useState('/stageList');

    const handleUse = () => {
      // 경로 변경
      setPath('/newPath');
    };

  return (
    <>
      <div className="Select">
        <div className={classes.select}>
          <div className="container">
            <div className={classes.container}>
              <div className={classes.sidebar}>
                <nav className="sidebar">
                  <Sidebar/>
                  <Link to={path}>
                        <button
                          onClick={handleUse}
                          className="button-use"
                          style={{
                            backgroundColor: '#4169E1',
                            color: '#FFFFFF',
                            border: '1px solid #FFFFFF',
                            height: '46px',
                            fontSize: '16px',
                            width: '70%',
                            fontWeight: 'bold',
                            margin: '1px 0',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#FFFFFF';
                            e.target.style.color = '#4169E1';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#4169E1';
                            e.target.style.color = '#FFFFFF';
                          }}
                        >
                          돌아가기
                        </button>
                      </Link>
                </nav>
              </div>
              <main className="main">
                <div className="receiptParti">
                  <ReceiptTurn/>
                </div>
                <div style={{ marginTop: '30px' }}></div>
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

