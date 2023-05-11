import React from 'react';
import ReactDOM from 'react-dom';
import classes from '../../css/StageModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}/>;
};

const ExitModalOverlay = (props) => {
  return (
    <div className={[classes.modal, classes.exit].join(' ')}>
      <p>{props.title}</p>
      <div>
      <button onClick={props.onConfirm} className={classes.back}>돌아가기</button>
      <button className={classes.exit}>탈출하기</button>
      </div>
      <p className={classes.caution}>* 주의사항: 탈출 후 빈자리가 있으면 다시 돌아오실 수 있으나, 자리 없으면 돌아올 수 없다잉</p>
    </div>
  );
};

const ReceiptModalOverlay = (props) => {
    const lis = [];
    console.log("********************나오라고!!!!!"+props.schedule);
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

const StageModal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
    {props.id === 'exit' && ReactDOM.createPortal(<ExitModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}
    {props.id === 'receipt' && ReactDOM.createPortal(<ReceiptModalOverlay title={props.title} schedule={props.schedule} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}
    </>
  );
};

export default StageModal;