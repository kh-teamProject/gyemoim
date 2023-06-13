import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import moment from 'moment';

import classes from '../css/Stage.module.css';
import BoxButton from "../../component/UI/stage/BoxButton";
import StageSequence from "../../component/UI/stage/StageSequence";
import MemberList from "../../component/UI/stage/StageMemberList";
import StageDeposit from "../../component/UI/stage/StageDeposit";
import StageModal from "../../component/UI/stage/StageModal";




const Stage = () => {

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;

    const [pf, setPf] = useState([]);
    const [roll, setRoll] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [mem, setMem] = useState([]);
    const [startFlag, setStartFlag] = useState('');
    const [pfData, setPfData] = useState([]);
    const [rollData, setRollData] = useState([]);

    const location = useLocation();
    const pfIDNum = location.pathname.split('/');


  useEffect(() => {
    axios.get('/stage', {
      params: {
        uNo: uNo,
        pfID: pfIDNum[pfIDNum.length -1]
      }
    })
      .then((res) => {
        setPf(res.data.pf);
        setRoll(res.data.roll);
        setMem(res.data.memList);
        setSchedule(res.data.import);

        const startFlagList = res.data.pf.map((item) => item.startFlag);
        const startFlag = startFlagList.join('');
        setStartFlag(startFlag);

        const depositList = res.data.pf.map((item) => item.deposit);
        const pfNameList = res.data.pf.map((item) => item.pfName);
        const startDateList = res.data.pf.map((item) => {
          const startDateData = moment(item.startDate).format('YYYY.MM.DD');
          return startDateData;
        });
        const endDateList = res.data.pf.map((item) => {
          const endDateData = moment(item.endDate).format('YYYY.MM.DD');
          return endDateData;
        });

        //const depositWithComma = depositList.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        const depositWithComma = depositList
          .map((value) => (value / 10000).toFixed(0) + '만')
          .toString()
          .replace(/\B(?=(\d{4})+(?!\d))/g, ',');
        const pfRateList = res.data.pf.map((item) => item.pfRate);
        const pfEntryList = res.data.pf.map((item) => item.pfEntry);
        const stageBalanceList = res.data.pf.map((item) => item.stageBalance);

        const pfData = {
        deposit: depositWithComma,
        pfRate: pfRateList.join(''),
        pfName: pfNameList.join(''),
        startDate: startDateList.join(''),
        endDate: endDateList.join(''),
        pfEntry: pfEntryList.join(''),
        stageBalance: stageBalanceList.join('')
        };
        setPfData(pfData);

        const RollDepositCnt = res.data.roll.map((item) => item.depositCnt);
        const RollUno = res.data.roll.map((item) => item.uno);
        const RollReceiveTurn = res.data.roll.map((item) => item.receiveTurn);
        const RollUPayment = res.data.roll.map((item) => item.upayment);
        const RollMyBalance = res.data.roll.map((item) => item.myBalance);
        const RollPaymentCheck = res.data.roll.map((item) => item.paymentCheck);
        const RollUTotalReceipts = res.data.roll.map((item) => item.utotalReceipts);

        const rollData = {
        depositCnt: RollDepositCnt.join(''),
        uNo: RollUno.join(''),
        receiveTurn: RollReceiveTurn.join(''),
        uPayment: RollUPayment.join(''),
        myBalance: RollMyBalance.join(''),
        paymentCheck: RollPaymentCheck.join(''),
        uTotalReceipts: RollUTotalReceipts.join('')
        };
        setRollData(rollData);



      })
      .catch((error) => {
        console.log(error);

      });
  }, []);


    const [receipt, setReceipt] = useState();
    const receiptHandler = () => {
    setReceipt('Modal');
    };
    const errorReceiptHandler = () => {
    setReceipt(null);
    };

    const [exit, setExit] = useState();
    const exitHandler = () => {
    setExit('Modal');
    };
    const errorExitHandler = () => {
    setExit(null);
    };


    return (
        <>

	        <p><span className={classes.stageTitle}>{pfData.pfName}</span></p>
             <p>스테이지 상태 : {startFlag}</p>
             {
                  startFlag === '대기중'
                  ? <p>기간 : -</p>
                  : <p>기간 : {pfData.startDate} ~ {pfData.endDate}</p>
              }

             <p>스테이지 잔액 : {pfData.stageBalance}원</p>
            <div id="contents" className={classes.areaLayout}>
                <div>
                   <div id="stageArea">
                        <div className={classes.blueArea}>
                            <ul className={classes.pfInfo}>
                                <li><span>나의 순번</span><br /><span className={classes.seqNum}>{rollData.receiveTurn}</span></li>
                                <li><span>총 입금</span><br />{rollData.depositCnt}회</li>
                                <li><span>약정금</span><br />{pfData.deposit}원</li>
                                <li><span>이율(세후)</span><br />{pfData.pfRate}%</li>
                                <li><span>상태</span><br />
                                {
                                    rollData.paymentCheck === 'N'
                                    ? <div>입금 전</div>
                                    : <div>입금 완</div>
                                }
                                </li>
                            </ul>

                        </div>
                        <div className={classes.boxButton}>
                            <BoxButton title="이율표 확인하기 >" desc="순번에 따른 얼마를 받게되는지 궁금할 땐," handler={receiptHandler}></BoxButton>
                            {receipt && <StageModal id={'receipt'}  title={pfData.pfName} schedule={schedule} onConfirm={errorReceiptHandler} />}
                            <Link to={'/login'}><BoxButton title="고객문의 바로가기 >" desc="무엇을 도와드릴까요?"></BoxButton></Link>
                        </div>

                        <div className={classes.stageZone}>
                            {startFlag==='완료' && <p className={classes.red} >축하합니다!</p>}
                            <p className={classes.subTitle}>스테이지 {startFlag}</p>
                            {startFlag==='대기중' && <p>모두 입장하면 계모임이 시작됩니다.</p>}
                            {startFlag==='참여중' && <p>매달 <span className={classes.red}>24일 전</span>에 입금하세요</p>}

                            <StageSequence schedule={schedule} roll={roll} uNo={uNo}></StageSequence>
                        </div>

                        <div>
                        {startFlag==='대기중' && <StageDeposit roll={roll} rollData={rollData} startFlag={startFlag} title={pfData.pfName} subTitle="입금하기" btn="입금하기" />}
                        {startFlag==='참여중' && <StageDeposit  roll={roll} rollData={rollData} startFlag={startFlag} title={pfData.pfName}subTitle="입금하기" btn="입금하기" />}
                        {startFlag==='완료' && <StageDeposit rollData={rollData} startFlag={startFlag} title={pfData.pfName} subTitle="출력하기" btn="출력하기" />}
                        </div>



                   </div>
                   <div id="memberArea" className>
                        <div className={classes.memberList}>
                             <p className={classes.boxTitle}>우리 멤버들</p>
                            <MemberList mem={mem} pfEntry={pfData.pfEntry}></MemberList>
                        </div>

                        <div className={classes.community}>
                            {startFlag==='대기중' &&
                            <div>
                            <button onClick={exitHandler} className={classes.exit}>탈출하기</button>
                            {exit && <StageModal id={'exit'} title={'정말로 탈출하시겠습니까?'} onConfirm={errorExitHandler} />}
                            <p className={classes.caution}>*스테이지가 대기중일땐 탈출할 수 있습니다.<br />
                               *스테이지가 시작하면 나가실 수 없습니다.</p>
                            </div>
                            }
                        </div>
                   </div>
               </div>
            </div>


        </>
    );
};

export default Stage;