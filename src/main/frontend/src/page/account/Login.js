import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import login from "../css/Login.module.css";
import gyemoim_character from "../../component/images/gyemoim_character.png"


const Login = () => {


    const dispatch = useDispatch();
    const checkedLogin = useSelector((state) => state.checkedLogin);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/login', {
                email,
                password,

            })
                .then((res) => {

                    Cookies.set('Set-Cookie', res.data.data);

                    const decodedToken = jwtDecode(res.data.data);
                    const name = decodedToken.name;
                    const uNo = decodedToken.uNo;

                    const userRole = decodedToken.userRole;

                    dispatch({type: 'login'});
                    console.log(checkedLogin);
                    console.log('이름', name);
                    console.log('uNo', uNo);
                    console.log('userRole', userRole);


                    alert(`${name} 어서와ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ`);
                    navigate('/');

                })
                .catch((error) => {
                    console.log(error);
                    alert('이메일이나 비밀번호를 다시 확인해 주세요.')
                });
        } catch (error) {
            console.error(error);
            alert('이메일이나 비밀번호를 다시 확인해 주세요.')

        }
    };


    return (
        <div className={login.main}>
            <form className={login.form}>
            <img src={gyemoim_character} style={{width: '150px', height: '150px'}} alt="Logo"/>
            <h2>로그인</h2>
            <p>계모임 가입으로 목돈 모으기 성공!</p>
            <div className={login.field}>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                />
            </div>
            <div className={login.field}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />

            </div>
            <div>
                <button className={login.btn} onClick={handleLogin}>로그인</button>
            </div>

            <div className={login.guide}>
                <ul className={login.ul}>
                    <li className={login.li}>
                        <a className={login.a} href="/MemberEmailSearch">아이디 찾기</a>
                    </li>
                    <li className={login.li}>｜</li>
                    <li className={login.li}>
                        <a className={login.a} href="/MemberPwdSearch">비밀번호 찾기</a>
                    </li>
                    <li className={login.li}>｜</li>
                    <li className={login.li}>
                        <a className={login.a} href="/Account">회원가입</a>
                    </li>
                </ul>
            </div>
            </form>
        </div>
    );
};

export default Login;