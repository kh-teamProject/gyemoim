import {useState} from "react";
import {NavLink} from "react-router-dom";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/Withdraw.module.css";


const BankAccount = () => {
  const [accountMoney, setAccountMoney] = useState(222222);
  const [enteredMoney, setEnteredMoney] = useState(0);

  const moneyChangeHandler = (e) => {
    setEnteredMoney(e.target.value);
  };


  return (
    <section>
      <div>
        <MyPageSidebar/>
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
          <span>잔액</span>
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
            <button>충전하기</button>
          </div>
          <div>
            <input
              type="text"
              onChange={moneyChangeHandler}
              placeholder={"입금할 금액을 적어주세요."}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankAccount;