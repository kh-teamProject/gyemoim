import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from '../../../page/css/Stage.module.css';
import StageModal from "./StageModal";
import modalClasses from '../../css/StageModal.module.css';
import StageReport from "./StageReport";


function StageDeposit(props){
    let uPayment;
    let myBalance;
    let uTotalReceipts;

    if(props.startFlag === '대기중' || props.startFlag === '참여중'){
    myBalance = props.rollData.myBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    uPayment =  props.rollData.uPayment.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
    uTotalReceipts =  props.rollData.uTotalReceipts.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const [deposit, setDeposit] = useState(false);
    const depositHandler = () => {
    setDeposit('Modal');
    };
    const errorDepositHandler = () => {
    setDeposit(null);
    };

    const [showStageReport, setShowStageReport] = useState(false);
    const location = useLocation();
    const pfIDNum = location.pathname.split('/');
    const navigate = useNavigate();

    const pdfHandler = () => {
        navigate('/StageReport/' + pfIDNum[pfIDNum.length -1],'_blank');
        setShowStageReport(true);
    };




	return (
	<div classes={classes.depositArea}>
        <p className={classes.boxTitle}>{props.subTitle}</p>
        <div className={[classes.boxBtn, classes.depositBox].join(' ')}>
            <div className={classes.depositLogo}><img src={require('../../assert/images/gyemoim_character.png')} alt="logo" /></div>
            <div className={classes.depositDesc}>
            { props.startFlag === '대기중' || props.startFlag === '참여중'
                ? <>
                <p>My 계좌 잔액: {myBalance}원</p>
                <p>이번 달 입금 할 금액 : {uPayment}원</p>
                </>
                : <>
                <p>실 수령금액 : {uTotalReceipts}원 </p>
                <p>나의 결산보고서 출력하기</p>
                </>
            }
            </div>
            { props.startFlag === '대기중' &&
            <button className={[classes.depositBtn, classes.grayBtn].join(' ')}>{props.btn}</button>
            }
            { props.startFlag === '참여중' &&
            <>
            <button onClick={depositHandler} className={classes.depositBtn}>{props.btn}</button>
            {deposit && <StageModal roll={props.roll} rollData={props.rollData} id={'deposit'} title={props.title} onConfirm={errorDepositHandler} />}
            </>
            }
            { props.startFlag === '완료' &&
                <>
                    <button onClick={pdfHandler} className={classes.depositBtn}>{props.btn}</button>
                    {showStageReport && <StageReport rollData={props.rollData} />}
                </>
            }
        </div>

        <div className={classes.caution}>
            {props.startFlag==='대기중' &&
            <>
                <p>*스테이지가 시작되면 입금하기 버튼이 활성화됩니다.</p>
                <p>*계좌에 금액이 부족하실 경우 마이페이지에서 충전해주시기 바랍니다. <Link to={'/mypage/bankAccount/deposit'}>마이페이지 ></Link></p>
            </>}
            {props.startFlag==='참여중' &&
            <>
                <p>*매달 <span className={classes.red}>24일 전</span>에 입금해주세요.</p>
                <p>*곗돈은 <span className={classes.red}>매달 30일</span>에 My계좌로 입금됩니다.</p>
            </>}
            {props.startFlag==='완료' &&
            <>
                <p>*스테이지가 완료되었습니다.</p>
                <p>*결산보고서를 PDF 파일로 출력하실 수 있습니다.</p>
            </>
            }

        </div>

    </div>
    )
}

export default StageDeposit;