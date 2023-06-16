import {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {FaMoneyBillAlt, FaAvianex, FaApple, FaTshirt, FaCarAlt, FaBirthdayCake, FaHiking} from 'react-icons/fa';
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from '../css/Interest.module.css';

const Interest = () => {
  const location = useLocation();
  const token = jwtDecode(Cookies.get('Set-Cookie'));
  const uNo = token.uNo;

  const [checkedInterest, setCheckedInterest] = useState('');

  const radioInput = document.getElementsByName('interest');

  useEffect(() => {
    axios.get('/mypage', {
      params: {
        uNo
      }
    })
      .then((res) => {
        radioInput.forEach((element) => {
          if(res.data.interest === element.value) {
            setCheckedInterest(res.data.interest);
            element.checked = true;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const checkedInterestHandler = (e) => {
    setCheckedInterest(e.target.value)
  };

  const changedInterestHandler = (e) => {
    e.preventDefault();

    axios.post('/interestUpdate', null, {
      params: {
        uNo,
        interest: checkedInterest,
      }
    })
      .then((res) => {
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div >
        <MyPageSidebar />
      </div>
      <div className={classes.field}>
        <h3>관심사</h3>
        <div>
          <ul>
            <li>
              <NavLink to={'/mypage/info'}>개인정보 수정</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/info/interest'} className={`${location.pathname.includes('interest') ? classes.isActive : undefined}`}>관심사 수정</NavLink>
            </li>
            <li>
              <NavLink to={`/mypage/info/pwdUpdate/${uNo}`} className={`${location.pathname.includes('pwdUpdate') ? classes.isActive : undefined}`}>비밀번호 변경</NavLink>
            </li>
            <li>
              <NavLink to={`/mypage/info/delete/${uNo}`} className={`${location.pathname.includes('delete') ? classes.isActive : undefined}`}>회원 탈퇴</NavLink>
            </li>
          </ul>
        </div>
        <div className={` ${classes['interest-wrap']}`}>
          <span className={classes.explanation}>관심사에 맞는 정보와 혜택을 제공해드려요.</span>
          <p className={`${classes['explanation-p']}`}>관심사나 취미를 선택해 주세요.</p>
          <form onSubmit={changedInterestHandler}>
            <div className={`${classes['checklist-wrap']}`}>
              <div className={`${classes.checklist}`}>
                <input type="radio" id={"money"} name={"interest"} value={"목돈"} onChange={checkedInterestHandler}/>
                <label htmlFor="money"><FaMoneyBillAlt />목돈</label>
              </div>
              <div className={`${classes.checklist}`}>
                <input type="radio" id={"travel"} name={"interest"} value={"여행"} onChange={checkedInterestHandler}/>
                <label htmlFor="travel"><FaAvianex />여행</label>
              </div>
              <div className={`${classes.checklist}`}>
                <input type="radio" id={"electronicProduct"} name={"interest"} value={"전자제품"} onChange={checkedInterestHandler}/>
                <label htmlFor="electronicProduct"><FaApple />전자제품</label>
              </div>
              <div className={`${classes.checklist}`}>
                <input type="radio" id={"fashion"} name={"interest"} value={"패션잡화"} onChange={checkedInterestHandler}/>
                <label htmlFor="fashion"><FaTshirt />패션잡화</label>
              </div>
              <div className={`${classes.checklist}`}>
                <input type="radio" id={"hobby"} name={"interest"} value={"취미"} onChange={checkedInterestHandler}/>
                <label htmlFor="hobby"><FaHiking />취미</label>
              </div>
              <div className={`${classes.checklist}`}>
                <input type="radio" id={"wedding"} name={"interest"} value={"웨딩"} onChange={checkedInterestHandler}/>
                <label htmlFor="wedding"><FaBirthdayCake />웨딩</label>
              </div>
              <div className={`${classes.checklist}`}>
                <input type="radio" id={"car"} name={"interest"} value={"자동차"} onChange={checkedInterestHandler}/>
                <label htmlFor="car"><FaCarAlt />자동차</label>
              </div>
            </div>
            <button type={"submit"} className={`${classes['interest-btn']}`}>수정하기</button>
          </form>
        </div>
      </div>
    </section>
  );

};

export default Interest;