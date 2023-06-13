import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

import MyPageSidebar from "../../component/MyPageSidebar";
import Paging from "../../component/Paging";
import classes from "../css/DetailsInquiry.module.css";

const DetailsInquiry = () => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};

  const [myAccountHistory, setMyAccountHistory] = useState([]);
  const [myAccountHistoryIsValid, setMyAccountHistoryIsValid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 아이템 수

  const token = Cookies.get('Set-Cookie');
  const uNo = jwtDecode(token).uNo;

  useEffect(() => {
    axios.get('/getMyAccountHistory', {
      params: {
        uNo
      }
    })
      .then((res) => {
        setMyAccountHistory(res.data);
        setMyAccountHistoryIsValid(res.data[0] === undefined);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const pageChangeHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 데이터 가져오기
  const getDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return myAccountHistory.slice(startIndex, endIndex);
  }

  return (
    <section>
      <div>
        <MyPageSidebar/>
      </div>
      <div className={classes.field}>
        <h3>나의 계좌관리</h3>
        <div>
          <ul className={classes.myAccount}>
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
        {myAccountHistoryIsValid ? (
          <p className={classes.explanation}>거래내역이 존재하지 않습니다.</p>
        ) : (
          <>
            <table className={`${classes['detailsInquiry-table']}`}>
              <colgroup>
                <col style={{width: '30%'}}/>
                <col style={{width: '30%'}}/>
                <col style={{width: '25%'}}/>
                <col style={{width: '15%'}}/>
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
              {getDataForCurrentPage().map((value, index) => (
                <tr key={index}>
                  <td>{new Date(value.tradingHours).toLocaleString('ko-KR', options)}</td>
                  <td>{value.bankName}</td>
                  <td>{value.bankHistory === '출금' ? -value.transactionAmount : value.transactionAmount}</td>
                  <td>{value.bankHistory}</td>
                </tr>
              ))}
              </tbody>
            </table>
            <Paging
              page={currentPage}
              itemsCountPerPage={itemsPerPage}
              count={myAccountHistory.length}
              onChange={pageChangeHandler}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default DetailsInquiry;