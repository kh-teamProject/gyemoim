import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/Withdraw.module.css";


const Deposit = () => {
  const [enteredMoney, setEnteredMoney] = useState(0);
  const [myAccount, setMyAccount] = useState({});
  const [myInfo, setMyInfo] = useState({
    uno: 0
  });

  useEffect(() => {
    axios.get('/getMyAccount', {
      params: {
        uNo: 3
      }
    })
      .then((res) => {
        console.log(res);
        setMyAccount(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/mypage', {
      params: {
        uNo: 3
      }
    })
      .then((res) => {
        setMyInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const moneyChangeHandler = (e) => {
    setEnteredMoney(e.target.value);
  };

  const depositHandler = () => {
    console.log(enteredMoney)
    if (enteredMoney === 0) {
      alert('충전할 금액을 입력해주세요.');
    } else {
      // 계모임 계좌 이력 저장
      axios.post('/deposit', null, {
        params: {
          uNo: myAccount.uno,
          bankName: myInfo.bankName,
          bankAccountNumber: myInfo.bankAccountNumber,
          transactionAmount: enteredMoney,
        }
      })
        .then((res) => {
          console.log(res);
          setMyInfo(res.data);
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
        }
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

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
              <NavLink to={'/mypage/bankAccount/deposit'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>충전하기</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/bankAccount/withdraw'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>출금하기</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/bankAccount/detailsInquiry'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>내역조회</NavLink>
            </li>
          </ul>
        </div>
        <div className={`${classes['account-money']}`}>
          <span>잔액</span>
          <span>{myAccount.myBalance}원</span>
        </div>
        <div className={`${classes['my-account']}`}>
          <div>
            <span>내 지급 계좌로</span>
            <button>계좌변경</button>
          </div>
          <div>
            <span>{myInfo.bankName}</span>
            <span>{myInfo.bankAccountNumber}</span>
          </div>
        </div>
        <div className={`${classes['my-account']}`}>
          <div>
            <span>얼마나 보낼까요?</span>
            <button onClick={depositHandler}>충전하기</button>
          </div>
          <div>
            <input
              type="number"
              onChange={moneyChangeHandler}
              placeholder={"충전할 금액을 적어주세요."}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deposit;