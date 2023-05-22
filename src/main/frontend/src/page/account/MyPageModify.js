import {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import classes from '../css/MyPageModify.module.css';
import MyPageSidebar from "../../component/MyPageSidebar";

const MyPageModify = () => {
  const navigate = useNavigate();

  const [uNo, setUNo] = useState('');

  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const bankRef = useRef();
  const bankNumberRef = useRef();
  const accountHolderRef = useRef();
  const creditRatingRef = useRef();
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
        creditRatingRef.current.value = res.data.creditRating ? res.data.creditRating : '';
        enrollDateRef.current.value = `${year}-${month}-${day}`;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const myInfoChangeHandler = (e) => {
    e.preventDefault();

    if(
      phoneRef.current.value == '' ||
      bankNumberRef.current.value == '' ||
      bankRef.current.value == '' ||
      accountHolderRef.current.value == '' ||
      creditRatingRef.current.value == ''
    ) {
      alert('빈칸이 존재합니다. 모두 입력해주세요.');
      return;
    }

    axios.post('/myInfoModify', null, {
      params: {
        uno: 3,
        email: emailRef.current.value,
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        bankName: bankRef.current.value,
        bankAccountNumber: bankNumberRef.current.value,
        accountHolder: accountHolderRef.current.value,
        creditRating: creditRatingRef.current.value,
        enrollDate: enrollDateRef.current.value
      }
    })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <section>
      <div>
        <MyPageSidebar />
      </div>
      <div>
        <h2>개인정보 수정</h2>
        <form onSubmit={myInfoChangeHandler}>
          <div className={classes.field}>
            <label htmlFor="user-id">아이디</label>
            <input type="text" id="user-id" ref={emailRef} readOnly/>
          </div>
          <div className={classes.field}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" ref={nameRef} />
          </div>
          <div className={classes.field}>
            <label htmlFor="phone">휴대폰</label>
            <input type="text" id="phone" ref={phoneRef} />
          </div>
          <div className={classes.field}>
            <label htmlFor="bank-name">은행</label>
            <select name="bankName" id="bank-name" ref={bankRef}>
              <option value="KEB하나은행">KEB하나은행</option>
              <option value="SC제일은행">SC제일은행</option>
              <option value="국민은행">국민은행</option>
              <option value="신한은행">신한은행</option>
              <option value="우리은행">우리은행</option>
              <option value="기업은행">기업은행</option>
              <option value="농협">농협</option>
            </select>
          </div>
          <div className={classes.field}>
            <label htmlFor="account-number">계좌번호</label>
            <input type="text" id="account-number" ref={bankNumberRef} />
          </div>
          <div className={classes.field}>
            <label htmlFor="account-number">계좌명의</label>
            <input type="text" id="account-number" ref={accountHolderRef}/>
          </div>
          <div className={classes.field}>
            <label htmlFor="credit-rating">신용등급</label>
            <select name="creditRating" id="credit-rating" ref={creditRatingRef}>
              <option value="1">1 ~ 3</option>
              <option value="4">4 ~ 6</option>
              <option value="7">7 ~ 9</option>
            </select>
          </div>
          <div className={classes.field}>
            <label htmlFor="enroll-date">가입일</label>
            <input type="text" id="enroll-date" ref={enrollDateRef} readOnly/>
          </div>
          <div className={classes.field}>
            <label htmlFor="">회원구분</label>
            <input type="text" id="" value={"가회원"} readOnly/>
          </div>
          <div className={classes.field}>
            <button type={"submit"} className={`${classes['submit-btn']}`}>수정완료</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MyPageModify;