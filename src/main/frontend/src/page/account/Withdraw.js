import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/Withdraw.module.css";

const Withdraw = () => {
  const [isWithdrawValid, setIswithdrawValid] = useState(false);
  const [enteredMoney, setEnteredMoney] = useState(0);
  const [myAccount, setMyAccount] = useState({});
  const [myInfo, setMyInfo] = useState({
    uno: 0
  });

  const token = Cookies.get('Set-Cookie');
  const uNo = jwtDecode(token).uNo;

  useEffect(() => {
    axios.get('/getMyAccount', {
      params: {
        uNo
      }
    })
      .then((res) => {
        setMyAccount(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/mypage', {
      params: {
        uNo
      }
    })
      .then((res) => {
        setMyInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myAccount]);

  const moneyChangeHandler = (e) => {
    setEnteredMoney(e.target.value);
  };

  const isWithdrawHandler = () => {
    if(enteredMoney > myAccount.myBalance) setIswithdrawValid(true);
    else setIswithdrawValid(false);
  }

  const withdrawHandler = () => {
    if(enteredMoney > myAccount.myBalance) {
      alert('출금가능 금액이 부족합니다.')
      setIswithdrawValid(true);
    }
    else {
      setIswithdrawValid(false);
      axios.post('/bankHistory', null, {
        params: {
          uNo: myAccount.uno,
          bankName: myInfo.bankName,
          bankAccountNumber: myInfo.bankAccountNumber,
          transactionAmount: enteredMoney,
          bankHistory: '출금'
        }
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // 계모임 계좌 정보 수정
      axios.post('/myAccountUpdate', null, {
        params: {
          uNo: myAccount.uno,
          bankName: myInfo.bankName,
          bankAccountNumber: myInfo.bankAccountNumber,
          transactionAmount: enteredMoney,
          bankHistory: '출금'
        }
      })
        .then((res) => {
          alert('출금이 완료되었습니다.');
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setEnteredMoney(0);
  }

  return (
    <section>
      <div>
        <MyPageSidebar />
      </div>
      <div className={classes.field}>
        <h3>나의 계좌관리</h3>
        <div>
          <ul className={classes.myAccount}>
            <li>
              <NavLink to={'/mypage/bankAccount/deposit'} className={({isActive}) => isActive ? classes.isActive : undefined} end>충전하기</NavLink>
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
          <span>{myAccount.myBalance}원</span>
        </div>
        <div className={`${classes['my-account']}`}>
          <div>
            <span>내 지급 계좌로</span>
            <button><Link to={'/mypage/info/checkedPwd'}>계좌변경</Link></button>
          </div>
          <div>
            <span>{myInfo.bankName}</span>
            <span>{myInfo.bankAccountNumber}</span>
          </div>
        </div>
        <div className={`${classes['my-account']}`}>
          <div>
            <span>얼마나 보낼까요?</span>
            <button onClick={withdrawHandler}>잔액출금</button>
          </div>
          <div>
            <input
              type="number"
              value={enteredMoney}
              onChange={moneyChangeHandler}
              onBlur={isWithdrawHandler}
              style={{borderColor: isWithdrawValid ? 'red' : 'gray'}}
              placeholder={"출금할 금액을 입력해주세요."}
            />
          </div>
          {isWithdrawValid && <span className={`${classes['warning-msg']}`}>!출금가능 금액이 부족합니다.</span>}
        </div>
      </div>
    </section>
  );
};

export default Withdraw;