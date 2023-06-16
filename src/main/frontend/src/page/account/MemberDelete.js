import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyPage.module.css";

const MemberDelete = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const token = Cookies.get('Set-Cookie');
  const uNo = jwtDecode(token).uNo;

  const [enteredPassword, setEnteredPassword] = useState('');


  const memberDeleteHandler = (e) => {
    e.preventDefault();

    if (enteredPassword.trim() === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const checkDelete = window.confirm("회원탈퇴를 진행하시겠습니까?");

    if (checkDelete) {
      axios.post(`/memberDelete/${uNo}`, null, {
        params: {
          password: enteredPassword
        }
      })
        .then((res) => {
          if (res.data) {
            alert('계이득 사이트를 이용해 주셔서 감사합니다.\n회원이 정상적으로 탈퇴되었습니다.');
            Cookies.remove("Set-Cookie");
            dispatch({type: "logout"});
            navigate('/')
          } else {
            alert('비밀번호가 일치하지 않습니다.');
          }
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
      <div className={`${classes['memberDelete-wrap']}`}>
        <h2>회원 탈퇴</h2>
        <div className={classes.field}>
          <ul>
            <li>
              <NavLink to={'/mypage/info'}>개인정보 수정</NavLink>
            </li>
            <li>
              <NavLink
                to={'/mypage/info/interest'}
                className={`${location.pathname.includes('interest') ? classes.isActive : undefined}`}>
                관심사 수정
              </NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/info/pwdUpdate/${uNo}'}
                       className={`${location.pathname.includes('pwdUpdate') ? classes.isActive : undefined}`}>비밀번호
                변경</NavLink>
            </li>
            <li>
              <NavLink
                to={'/mypage/info/delete/3'}
                className={`${location.pathname.includes('delete') ? classes.isActive : undefined}`}>회원
                탈퇴
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.field}>
          <input
            type="password"
            name={"password"}
            className={`${classes['password-input']}`}
            onChange={(e) => {
              setEnteredPassword(e.target.value)
            }}
          />
          <br/>
          <button
            className={`${classes['check-btn']}`}
            onClick={memberDeleteHandler}
          >
            확인
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemberDelete;