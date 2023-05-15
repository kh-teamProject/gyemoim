import {NavLink} from "react-router-dom";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/DetailsInquiry.module.css";

const DetailsInquiry = () => {

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
            <tr>
              <td>2023년 5월 9일</td>
              <td>신한은행</td>
              <td>-2,000원</td>
              <td>출금</td>
            </tr>
            <tr>
              <td>2023년 5월 8일</td>
              <td>NH 농협은행</td>
              <td>12,000원</td>
              <td>충전</td>
            </tr>
            <tr>
              <td>2023년 5월 8일</td>
              <td>신한은행</td>
              <td>-1,000원</td>
              <td>출금</td>
            </tr>
            <tr>
              <td>2023년 5월 8일</td>
              <td>신한은행</td>
              <td>-1,000원</td>
              <td>출금</td>
            </tr>
            <tr>
              <td>2023년 5월 8일</td>
              <td>신한은행</td>
              <td>-1,000원</td>
              <td>출금</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DetailsInquiry;