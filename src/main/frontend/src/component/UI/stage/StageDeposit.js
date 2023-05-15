import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import classes from '../../../page/css/Stage.module.css';
import StageModal from "./StageModal";
import modalClasses from '../../css/StageModal.module.css';


function StageDeposit(props){
    let uPayment =  props.roll[0].upayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

     const [deposit, setDeposit] = useState(false);
     const depositHandler = () => {
     setDeposit('Modal');
     };
     const errorDepositHandler = () => {
     setDeposit(null);
     };



	return (
	<div classes={classes.depositArea}>
        <p className={classes.boxTitle}>{props.subTitle}</p>
        <div className={[classes.boxBtn, classes.depositBox].join(' ')}>
            <div className={classes.depositLogo}><img src={require('../../assert/images/gyemoim_character.png')} alt="logo" /></div>
            <div className={classes.depositDesc}>
                <p>계좌 잔액: ???</p>
                <p>이번 달 입금 할 금액 : {uPayment}원</p>
            </div>
            { props.startFlag === '대기중' &&
            <button className={[classes.depositBtn, classes.grayBtn].join(' ')}>{props.btn}</button>
            }
            { props.startFlag === '참여중' &&
            <>
            <button onClick={depositHandler} className={classes.depositBtn}>{props.btn}</button>
            {deposit && <StageModal roll={props.roll} uPayment={uPayment} id={'deposit'} title={props.title} onConfirm={errorDepositHandler} />}
            </>
            }
        </div>

        <div className={classes.caution}>
            {props.startFlag==='대기중' &&
            <>
                <p>*스테이지가 시작되면 입금하기 버튼이 활성화됩니다.</p>
                <p>*계좌에 금액이 부족하실 경우 마이페이지에서 충전해주시기 바랍니다. <Link to={'/mypage'}>마이페이지 ></Link></p>
            </>}
            {props.startFlag==='참여중' &&
            <>
                <p> *계좌에 금액이 부족하실 경우 마이페이지에서 충전해주시기 바랍니다. <Link to={'/mypage'}>마이페이지 ></Link></p>
                <p>*입금 할 금액을 정확하게 입력해주세요.</p>
            </>}
            {props.startFlag==='완료' && <p>*스테이지의 이율표를 PDF 파일로 출력하실 수 있습니다.</p>}

        </div>

    </div>
    )
}

export default StageDeposit;