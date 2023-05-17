import {NavLink} from "react-router-dom";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/DetailsInquiry.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

const DetailsInquiry = () => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};

  const [myAccountHistory, setMyAccountHistory] = useState([]);

  useEffect(() => {
    axios.get('/getMyAccountHistory', {
      params: {
        uNo: 3
      }
    })
      .then((res) => {
        console.log(res.data);
        setMyAccountHistory(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  console.log(myAccountHistory);

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
        <table className={`${classes['detailsInquiry-table']}`}>
          <colgroup>
            <col style={{width: '30%'}}/>
            <col style={{width: '30%'}}/>
            <col style={{width: '30%'}}/>
            <col style={{width: '10%'}}/>
          </colgroup>
          <thead>
          <tr>
            <th>날짜</th>
            <th>은행</th>
            <th>금액</th>
            <th>상태</th>
          </tr>
          </thead>
          <tbody>
          {myAccountHistory.map((value, index) => (
            <tr key={index}>
              <td>{new Date(value.tradingHours).toLocaleString('ko-KR', options)}</td>
              <td>{value.bankName}</td>
              <td>{value.transactionAmount}</td>
              <td>{value.bankHistory}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DetailsInquiry;