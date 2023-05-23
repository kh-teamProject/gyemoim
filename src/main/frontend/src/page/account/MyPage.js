import {useEffect, useRef, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import axios from "axios";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from '../css/MyPage.module.css';

const MyPage = () => {
  const location = useLocation();

  const [uNo, setUNo] = useState('');

  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const bankRef = useRef();
  const bankNumberRef = useRef();
  const pRankRef = useRef();
  const accountHolderRef = useRef();
  const userRoleRef = useRef();
  const enrollDateRef = useRef();

  useEffect(() => {
    axios.get('/mypage', {
      params: {
        uNo: 3
      }
    })
      .then((res) => {
        const date = new Date(res.data.enrollDate);
        const [year, month, day] = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')];
        setUNo(res.data.uNo);
        emailRef.current.value = res.data.email;
        nameRef.current.value = res.data.name;
        phoneRef.current.value = res.data.phone ? res.data.phone : '';
        bankRef.current.value = res.data.bankName ? res.data.bankName : '';
        bankNumberRef.current.value = res.data.bankAccountNumber ? res.data.bankAccountNumber : '';
        accountHolderRef.current.value = res.data.accountHolder ? res.data.accountHolder : '';
        pRankRef.current.value = res.data.PRANK ? res.data.PRANK : '';
        userRoleRef.current.value = res.data.USERROLE;
        enrollDateRef.current.value = `${year}-${month}-${day}`;
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
              <NavLink to={'/mypage/info/delete/3'} className={`${location.pathname.includes('delete') ? classes.isActive : undefined}`}>회원 탈퇴</NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.field}>
          <label htmlFor="user-id">아이디</label>
          <input type="text" id="user-id" ref={emailRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" ref={nameRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="phone">휴대폰</label>
          <input type="text" id="phone" ref={phoneRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="bank-name">은행</label>
          <input type="text" id="bank-name" ref={bankRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">계좌번호</label>
          <input type="text" id="account-number" ref={bankNumberRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">계좌명의</label>
          <input type="text" id="account-number" ref={accountHolderRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="credit-rating">계모임 등급</label>
          <input type="text" id="credit-rating" ref={pRankRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="enroll-date">가입일</label>
          <input type="text" id="enroll-date" ref={enrollDateRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="">회원구분</label>
          <input type="text" id="" ref={userRoleRef} readOnly/>
        </div>
        <div className={classes.field}>
          <NavLink to={`/mypage/info/checkedPwd`} className={`${classes['link-btn']}`}>수정하기</NavLink>
        </div>
      </div>
    </section>
  );
}

export default MyPage;