import {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from '../css/MyPage.module.css';

const MyPage = () => {
  const location = useLocation();

  const [myInfo, setMyInfo] = useState({});
  const [enrollDate, setEnrollDate] = useState('');
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [monthlyLimit, setMonthlyLimit] = useState(0);

  const token = Cookies.get('Set-Cookie');
  const uNo = jwtDecode(token).uNo;

  useEffect(() => {
    axios.get('/mypage', {
      params: {
        uNo
      }
    })
      .then((res) => {
        setMyInfo(res.data);
        console.log(res.data);
        const date = new Date(res.data.enrollDate);
        const [year, month, day] = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')];
        setEnrollDate(`${year}-${month}-${day}`);
        setMonthlySalary(res.data.monthlySalary.toLocaleString());
        setMonthlyLimit(res.data.monthlyLimit.toLocaleString());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section>
      <div >
        <MyPageSidebar />
      </div>
      <div>
        <h2>개인정보</h2>
        <div className={classes.field}>
          <ul>
            <li>
              <NavLink to={'/mypage/info'} className={`${location.pathname.includes('info') ? classes.isActive : undefined}`}>개인정보 수정</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/info/interest'} className={`${location.pathname.includes('interest') ? classes.isActive : undefined}`}>관심사 수정</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/info/pwdUpdate/${uNo}'} className={`${location.pathname.includes('pwdUpdate') ? classes.isActive : undefined}`}>비밀번호 변경</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/info/delete/3'} className={`${location.pathname.includes('delete') ? classes.isActive : undefined}`}>회원 탈퇴</NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.field}>
          <label htmlFor="user-id">아이디</label>
          <input type="text" id="user-id" value={myInfo.email || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={myInfo.name || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="phone">휴대폰</label>
          <input type="text" id="phone" value={myInfo.phone || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="bank-name">은행</label>
          <input type="text" id="bank-name" value={myInfo.bankName || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">계좌번호</label>
          <input type="text" id="account-number" value={myInfo.bankAccountNumber || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">계좌명의</label>
          <input type="text" id="account-number" value={myInfo.accountHolder || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">월급여</label>
          <input type="text" id="account-number" value={monthlySalary || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">최대약정금</label>
          <input type="text" id="account-number" value={monthlyLimit || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="enroll-date">가입일</label>
          <input type="text" id="enroll-date" value={enrollDate || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="">회원구분</label>
          <input type="text" id="" value={myInfo.userRole || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <NavLink to={`/mypage/info/checkedPwd`} className={`${classes['link-btn']}`}>수정하기</NavLink>
        </div>
      </div>
    </section>
  );
}

export default MyPage;