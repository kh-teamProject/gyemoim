import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

import classes from "../css/CheckedPwd.module.css";
import MyPageSidebar from "../../component/MyPageSidebar";

const CheckedPwd = () => {
  const navigate = useNavigate();

  const [enteredPassword, setEnteredPassword] = useState('');

  const token = Cookies.get('Set-Cookie');
  const uNo = jwtDecode(token).uNo;
  const locationHandler = () => {
    if(enteredPassword.trim() === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    axios.post(`/checkedPwd/${uNo}`, null, {
      params: {
        password: enteredPassword
      }
    })
      .then((res) => {
        if(res.data) {
          navigate(`/mypage/info/modify/${uNo}`);
        } else {
          alert('비밀번호가 일치하지않습니다.');
        }
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
      <div className={`${classes['checkPwd-wrap']}`}>
        <h2>비밀번호 확인</h2>
        <input
          type="password"
          name={"password"}
          className={`${classes['password-input']}`}
          onChange={(e) => {setEnteredPassword(e.target.value)}}
        />
        <br/>
        <button
          type={"submit"}
          className={`${classes['check-btn']}`}
          onClick={locationHandler}
        >
          확인
        </button>
      </div>
    </section>
  );
};

export default CheckedPwd;