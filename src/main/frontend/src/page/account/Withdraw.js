import {useState} from "react";
import {NavLink} from "react-router-dom";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/Withdraw.module.css";

const Withdraw = () => {
  const [accountMoney, setAccountMoney] = useState(222222);
  const [enteredMoney, setEnteredMoney] = useState(0);
  const [isWithdrawValid, setIswithdrawValid] = useState(false);

  const moneyChangeHandler = (e) => {
    setEnteredMoney(e.target.value);
  };

  const isWithdrawHandler = () => {
    if(enteredMoney > accountMoney) setIswithdrawValid(true);
    else setIswithdrawValid(false);
  }

  return (
    <section>
      <div>
        <MyPageSidebar />
      </div>
      <div className={classes.field}>
        <h3>나의 계좌관리</h3>
        <div>
          <ul>
            <li>
              <NavLink to={'/mypage/bankAccount/deposit'} className={({isActive}) => isActive ? classes.isActive : undefined} end>입급하기</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/bankAccount/withdraw'} className={({isActive}) => isActive ? classes.isActive : undefined} end>출금하기</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/bankAccount/detailsInquiry'} className={({isActive}) => isActive ? classes.isActive : undefined} end>내역조회</NavLink>
            </li>
          </ul>
        </div>
        <div className={`${classes['account-money']}`}>
          <span>출금가능 금액</span>
          <span>{accountMoney}원</span>
        </div>
        <div className={`${classes['my-account']}`}>
          <div>
            <span>내 지급 계좌로</span>
            <button>계좌변경</button>
          </div>
          <div>
            <span>신한은행</span>
            <span>123-456-7890</span>
          </div>
        </div>
        <div className={`${classes['my-account']}`}>
          <div>
            <span>얼마나 보낼까요?</span>
            <button>잔액출금</button>
          </div>
          <div>
            <input
              type="text"
              onChange={moneyChangeHandler}
              onBlur={isWithdrawHandler}
              style={{borderColor: isWithdrawValid ? 'red' : 'gray'}}
              placeholder={"출금할 금액을 입력해주세요."}
            />
          </div>
          {isWithdrawValid && <span className={`${classes['warning-msg']}`}>!출금가능금액이 부족합니다.</span>}
        </div>
      </div>
    </section>
  );
};

export default Withdraw;