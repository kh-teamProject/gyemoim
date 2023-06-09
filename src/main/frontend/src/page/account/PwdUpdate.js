import React, {useRef, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

import PwdUpdateModule from "../../page/css/PwdUpdate.module.css";
import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyPage.module.css";

const PwdUpdate = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPath = pathParts[pathParts.length - 1];

  const token = jwtDecode(Cookies.get('Set-Cookie'));
  const uNo = token.uNo;

  const passwordUpdateHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    axios
      .put(`/api/myPage/info/pwdUpdate/${uNo}`, null, {
        params: {
          newPassword,
          uNo: uNo,
        }
      })
      .then((res) => {
        alert("비밀번호 변경이 완료되었습니다.");
        navigate("/myPage/info");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div>
        <MyPageSidebar/>
      </div>
      <div className={PwdUpdateModule.pwdUpdateWrap}>
        <div>
          <div>
            <h2>비밀번호 변경</h2>
          </div>
          <div className={classes.field}>
            <ul>
              <li>
                <NavLink to={'/mypage/info'}>개인정보 수정</NavLink>
              </li>
              <li>
                <NavLink to={'/mypage/info/interest'}
                         className={`${location.pathname.includes('interest') ? classes.isActive : undefined}`}>관심사
                  수정</NavLink>
              </li>
              <li>
                <NavLink to={`/mypage/info/pwdUpdate/${uNo}`}
                         className={`${location.pathname.includes('pwdUpdate') ? classes.isActive : undefined}`}>비밀번호
                  변경</NavLink>
              </li>
              <li>
                <NavLink to={`/mypage/info/delete/${uNo}`}
                         className={`${location.pathname.includes('delete') ? classes.isActive : undefined}`}>회원
                  탈퇴</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <form onSubmit={passwordUpdateHandler}>
          <div className={PwdUpdateModule.field}>
            <label htmlFor="new-password">새 비밀번호</label>
            <input
              type="password"
              id="new-password"
              ref={passwordRef}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className={PwdUpdateModule.field}>
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              ref={confirmPasswordRef}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={PwdUpdateModule.field}>
            <button type="submit" className={PwdUpdateModule["pwd-submit-btn"]}>
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PwdUpdate;