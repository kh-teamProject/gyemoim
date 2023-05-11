import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import classes from './css/Stage.module.css';
import BoxButton from "../component/UI/stage/BoxButton";
import StageSequence from "../component/UI/stage/StageSequence";
import MemberList from "../component/UI/stage/StageMemberList";
import StageDeposit from "../component/UI/stage/StageDeposit";
import StageModal from "../component/UI/stage/StageModal";


const Stage = () => {

    const [pf, setPf] = useState([]);
    const [part, setPart] = useState([]);
    const [roll, setRoll] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [mem, setMem] = useState([]);
    console.log(schedule);
    const [startFlag, setStartFlag] = useState('');
    const [pfData, setPfData] = useState([]);
    const [rollData, setRollData] = useState([]);
    const [partData, setPartData] = useState([]);
    console.log(startFlag)

  useEffect(() => {
    axios.get('/stage', {
      params: {
        uNo: 2,
        pfID: 1
      }
    })
      .then((res) => {
        setPf(res.data.pf);
        setPart(res.data.participation);
        setRoll(res.data.roll);
        setMem(res.data.memList);
        setSchedule(res.data.import);

        const startFlagList = res.data.pf.map((item) => item.startFlag);
        const startFlag = startFlagList.join('');
        setStartFlag(startFlag);

        const depositList = res.data.pf.map((item) => item.deposit);
        const pfNameList = res.data.pf.map((item) => item.pfName);
        //const depositWithComma = depositList.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        const depositWithComma = depositList
          .map((value) => (value / 10000).toFixed(0) + '만')
          .toString()
          .replace(/\B(?=(\d{4})+(?!\d))/g, ',');
        const pfRateList = res.data.pf.map((item) => item.pfRate);
        const pfData = {
        deposit: depositWithComma,
        pfRate: pfRateList.join(''),
        pfName: pfNameList.join('')
        };
        setPfData(pfData);

        const RollDepositCnt = res.data.roll.map((item) => item.depositCnt);
        const RollUno = res.data.roll.map((item) => item.uno);
        const rollData = {
        depositCnt: RollDepositCnt.join(''),
        uNo: RollUno.join('')
        };
        setRollData(rollData);

        const StageBalanceList = res.data.participation.map((item) => item.stageBalance);
        const partData = {
        stageBalance: StageBalanceList.join('')
        };
        setPartData(partData);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    const [receipt, setReceipt] = useState();

    const receiptHandler = () => {
    setReceipt('Modal');
    };
    const receiptExitHandler = () => {
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
        {pf.map((pf, index) => (
	        <p key={index}><span className={classes.stageTitle}>{pf.pfName}</span></p>

         ))}
             <p>스테이지 상태 : {startFlag}</p>
             {
                  startFlag === '대기중'
                  ? <p>기간 : -</p>
                  : <p>기간 : 2023.04.01~2023.12.1</p>
              }

            <div id="contents" className={classes.areaLayout}>
                <div>
                   <div id="stageArea">
                        <div className={classes.blueArea}>
                            <ul className={classes.pfInfo}>
                                <li><span>나의 순번</span><br /><span className={classes.seqNum}>{rollData.uNo}</span></li>
                                <li><span>총 입금</span><br />{rollData.depositCnt}회</li>
                                <li><span>약정금</span><br />{pfData.deposit}원</li>
                                <li><span>이율(세후)</span><br />{pfData.pfRate}%</li>
                                <li><span>S잔액</span><br />{partData.stageBalance}원</li>
                            </ul>

                        </div>
                        <div className={classes.boxButton}>
                            <BoxButton title="이율표 확인하기 >" desc="순번에 따른 얼마를 받게되는지 궁금할 땐," handler={receiptHandler}></BoxButton>
                            {receipt && <StageModal id={'receipt'}  title={pfData.pfName} schedule={schedule} onConfirm={receiptExitHandler} />}
                            <Link to={'/login'}><BoxButton title="고객문의 바로가기 >" desc="무엇을 도와드릴까요?"></BoxButton></Link>
                        </div>

                        <div className={classes.stageZone}>
                            {startFlag==='완료' && <p className={classes.red} >축하합니다!</p>}
                            <p className={classes.subTitle}>스테이지 {startFlag}</p>
                            {startFlag==='대기중' && <p>모두 입장하면 계모임이 시작됩니다.</p>}
                            {startFlag==='참여중' && <p>매 달 <span className={classes.red}>1일 전</span>에 입금하세요</p>}

                            <StageSequence schedule={schedule} roll={roll} ></StageSequence>
                        </div>

                        <div>
                        {startFlag==='대기중' && <StageDeposit roll={roll} startFlag={startFlag} title="입금하기" btn="입금하기"></StageDeposit>}
                        {startFlag==='참여중' && <StageDeposit roll={roll} startFlag={startFlag} title="입금하기" btn="입금하기"></StageDeposit>}
                        {startFlag==='완료' && <StageDeposit roll={roll} startFlag={startFlag} title="출력하기" btn="출력하기"></StageDeposit>}
                        </div>



                   </div>
                   <div id="memberArea" className>
                        <div className={classes.memberList}>
                             <p className={classes.boxTitle}>우리 멤버들</p>
                            <MemberList mem={mem} ></MemberList>
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