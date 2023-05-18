import {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import Post from "../../component/Post";
import classes from '../css/MyPageModify.module.css';

const MyPageModify = () => {
  const navigate = useNavigate();

  const [isPost, setIsPost] = useState(false);
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

  const addressHandler = () => {
    setIsPost(true);
  };
  const saveAddressHandler = (addressData) => {
    postcodeRef.current.value = addressData.postcode;
    addressRef.current.value = addressData.address;
    addressDetailRef.current.value = '';
    setIsPost(addressData.isPost);
  };

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
        bankRef.current.value = res.data.bank ? res.data.bank : '';
        bankNumberRef.current.value = res.data.bankNumber ? res.data.bankNumber : '';
        creditRatingRef.current.value = res.data.creditRationg ? res.data.creditRationg : '';
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

  const myInfoChangeHandler = (e) => {
    e.preventDefault();

    axios.post('/myInfoModify', null, {
      params: {
        uno: 3,
        email: emailRef.current.value,
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        bankName: bankRef.current.value,
        bankAccountNumber: bankNumberRef.current.value,
        creditRating: creditRatingRef.current.value,
        plusRate: plusRateRef.current.value,
        enrollDate: enrollDateRef.current.value,
        postcode: postcodeRef.current.value,
        address: addressRef.current.value,
        addressDetail: addressDetailRef.current.value
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
    <>
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
          <input type="text" id="bank-name" ref={bankRef} />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">계좌번호</label>
          <input type="text" id="account-number" ref={bankNumberRef} />
        </div>
        <div className={classes.field}>
          <label htmlFor="credit-rating">신용등급</label>
          <input type="text" id="credit-rating" ref={creditRatingRef}/>
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
            <button onClick={addressHandler}>검색</button>
          </div>
        </div>
        <div className={classes.field}>
          <label></label>
          <input type="text" id="address" name={"address"} ref={addressRef} readOnly/>
        </div>
        <div className={classes.field}>
          <label></label>
          <input type="text" id="addressDetail" ref={addressDetailRef}/>
        </div>
        {isPost && <Post onSaveAddress={saveAddressHandler}/>}
        <div className={classes.field}>
          <button type={"submit"} className={`${classes['submit-btn']}`}>수정완료</button>
        </div>
      </form>
    </>
  );
}

export default MyPageModify;