import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import classes from "../css/CheckedPwd.module.css";
import MyPageSidebar from "../../component/MyPageSidebar";

const CheckedPwd = () => {
  const navigate = useNavigate();

  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios.get('/getPassword', {
      params: {
        uNo: 3
      }
    }).then(res => {
      setPassword(res.data);
    })
      .catch(error => {
        console.log(error);
      })
  });

  const checkedPwdHandler = (e) => {
    setPasswordIsValid(e.target.value === password);
  }

  const locationHandler = () => {
    if(enteredPassword.trim() === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    navigate('/mypage/info/modify/3')
  }

  return (
    <section>
      <div>
        <MyPageSidebar />
      </div>
      <div>
        <h2>비밀번호 확인</h2>
        <input
          type="password"
          name={"password"}
          className={`${classes['password-input']} ${passwordIsValid ? '' : classes.isActive}`}
          onChange={(e) => {setEnteredPassword(e.target.value)}}
          onBlur={checkedPwdHandler}
        />
        <br/>
        <button
          type={"submit"}
          className={`${classes['check-btn']}`}
          onClick={locationHandler}
          disabled={!passwordIsValid}
        >
          확인
        </button>
      </div>
    </section>
  );
};

export default CheckedPwd;