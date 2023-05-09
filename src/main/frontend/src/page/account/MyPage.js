import {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

import classes from '../css/MyPage.module.css';

const MyPage = () => {
  const [uNo, setUNo] = useState('');
  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const bankRef = useRef();
  const bankNumberRef = useRef();
  const creditRatingRef = useRef();
  const plusRateRef = useRef();
  const enrollDateRef = useRef();
  const postcodeRef = useRef();
  const addressRef = useRef();
  const addressDetailRef = useRef();

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
        phoneRef.current.value = res.data.phone;
        bankRef.current.value = res.data.bankName ? res.data.bankName : '';
        bankNumberRef.current.value = res.data.bankAccountNumber ? res.data.bankAccountNumber : '';
        creditRatingRef.current.value = res.data.creditRating ? res.data.creditRating : '';
        plusRateRef.current.value = res.data.plusRate;
        enrollDateRef.current.value = `${year}-${month}-${day}`;
        postcodeRef.current.value = res.data.postcode;
        addressRef.current.value = res.data.address;
        addressDetailRef.current.value = res.data.addressDetail;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2>개인정보</h2>
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
        <label htmlFor="credit-rating">신용등급</label>
        <input type="text" id="credit-rating" ref={creditRatingRef} readOnly/>
      </div>
      <div className={classes.field}>
        <label htmlFor="plus-rate">추가이율</label>
        <input type="text" id="plus-rate" ref={plusRateRef} readOnly/>
      </div>
      <div className={classes.field}>
        <label htmlFor="enroll-date">가입일</label>
        <input type="text" id="enroll-date" ref={enrollDateRef} readOnly/>
      </div>
      <div className={classes.field}>
        <label htmlFor="postcode">주소</label>
        <div>
          <input type="text" id="postcode" name={"postcode"} ref={postcodeRef} readOnly/>
        </div>
      </div>
      <div className={classes.field}>
        <label></label>
        <input type="text" id="address" name={"address"} ref={addressRef} readOnly/>
      </div>
      <div className={classes.field}>
        <label></label>
        <input type="text" id="addressDetail" ref={addressDetailRef} readOnly/>
      </div>
      <div className={classes.field}>
        <NavLink to={`${uNo}`} className={`${classes['link-btn']}`}>수정하기</NavLink>
      </div>
    </>
  );
}

export default MyPage;