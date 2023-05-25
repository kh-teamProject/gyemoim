import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import classes from '../../css/StageModal.module.css';
import axios from "axios";
import { useNavigate, Link, useLocation } from 'react-router-dom';


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}/>;
};

const ExitModalOverlay = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pfIDNum = location.pathname.split('/');

    const exitButtonClick = () => {
      axios.delete('/stageOut', {
            params: {
              uNo: 5,
              pfID: pfIDNum[pfIDNum.length -1]
            }
          })
        .then(response => {
          navigate('/');
          console.log('DELETE 요청이 성공했습니다.');
        })
        .catch(error => {
          // 요청 실패 시 처리
          console.error('DELETE 요청이 실패했습니다.', error);
        });
    };
  return (
    <div className={[classes.modal, classes.exit].join(' ')}>
      <p>{props.title}</p>
      <div>
      <button onClick={props.onConfirm} className={classes.back}>돌아가기</button>
      <button onClick={exitButtonClick} className={classes.exit}>탈출하기</button>
      </div>
      <p className={classes.caution}>* 주의사항: 탈출 후 빈자리가 있으면 다시 돌아오실 수 있으나, 자리 없으면 돌아올 수 없다잉</p>
    </div>
  );
};

const ReceiptModalOverlay = (props) => {
    const lis = [];
    for (let i = 0; i < props.schedule.length; i++) {
      const scheduleData = props.schedule[i];
      const schedule = (
        <tr key={i}>
          <td>{scheduleData.receiveTurn}</td>
          <td>{scheduleData.deposit}</td>
          <td>{scheduleData.upayment}</td>
          <td>{scheduleData.deposit}</td>
          <td>{scheduleData.utotalPayment}</td>
          <td>{scheduleData.utotalReceipts}</td>
        </tr>
      );

      lis.push(schedule);
    }
  return (
    <div className={[classes.modal, classes.receipt].join(' ')}>
      <p>"{props.title}" 수령예정표</p>
      <div>
         <table>
                <thead>
                  <tr>
                    <th>순번</th>
                    <th>월 입금액</th>
                    <th>총 입금액</th>
                    <th>실 지급금</th>
                    <th>적용이율(세후)</th>
                    <th>실 이자(세후)</th>
                  </tr>
                </thead>
                <tbody>{lis}</tbody>
              </table>
      <button onClick={props.onConfirm} className={classes.back}>X</button>
      </div>
    </div>
  );
};

const DepositModalOverlay = (props) => {
    let uPayment =  props.rollData.uPayment.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let myBalance = props.rollData.myBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const [moneyCheck, setMoneyCheck] = useState(true);

    useEffect(() => {
        setMoneyCheck(props.rollData.uPayment > props.rollData.myBalance);
    }, []);

    const location = useLocation();
    const pfIDNum = location.pathname.split('/');

    const depositButtonClick = () => {
      axios.post('/deposit',null, {
            params: {
              uNo: 5,
              pfID: pfIDNum[pfIDNum.length -1],
              uPayment: props.rollData.uPayment
            }
          })
        .then(response => {
          console.log('입금 요청이 성공했습니다.');
        })
        .catch(error => {
          // 요청 실패 시 처리
          console.error('입금 요청이 실패했습니다.', error);
        });
    };

return (
    <div className={[classes.modal, classes.deposit].join(' ')}>
      <p className={classes.title}>"{props.title}" 입금하기</p>
      {props.roll.map((value, index) => (
      <>
          <div className={classes.stageInfo}>
                <div className={classes.whiteBox}>
                    <p>나의 순번</p>
                    <div key={index} className={classes.seqNum}>{value.uno}</div>
                </div>

                <div className={classes.whiteBox}>
                    <p>총 입금횟수</p>
                    <p key={index} >{value.depositCnt}회</p>
                </div>
                <div className={classes.whiteBox}>
                    <p>나의 누적 입금액</p>
                    <p key={index} >{value.stageAmount.toLocaleString()}원</p>
                </div>
          </div>
         </>
        ))}
          <div className={classes.depositUpdate}>
            <div className={classes.depositAmount}>이번 달 입금 금액 : {uPayment}원</div>
            {props.rollData.paymentCheck === 'N'
            ? <button onClick={depositButtonClick} >입금하기</button>
            : <button　className={classes.grayBtn}>입금완료</button>
            }
          </div>

      <div className={classes.myAccount}>
        <div>
        <p>my계좌잔액</p>
        <p>{myBalance}원</p>
        </div>
        {moneyCheck && <p>계좌잔액이 부족합니다.</p>}
        <p className={classes.caution}>*계좌에 금액이 부족하실 경우 마이페이지에서 충전해주시기 바랍니다. <Link to={'/mypage'}>마이페이지 ></Link></p>
      </div>

      <button onClick={props.onConfirm} className={classes.back}>X</button>
    </div>
  );
};

const StageModal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
    {props.id === 'exit' && ReactDOM.createPortal(<ExitModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}
    {props.id === 'receipt' && ReactDOM.createPortal(<ReceiptModalOverlay title={props.title} schedule={props.schedule} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}
    {props.id === 'deposit' && ReactDOM.createPortal(<DepositModalOverlay title={props.title} roll={props.roll} rollData={props.rollData} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}

    </>
  );
};

export default StageModal;