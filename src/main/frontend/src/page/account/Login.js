import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await axios.post('/api/v1/login', {
                email,
                password
            })
                .then((res) => {
                    Cookies.set('Set-Cookie', res.data.responseEntity.body.data);
                    const refreshToken = res.data.refreshToken.split('.');
                    const accessToken = res.data.accessToken.split('.');
                    localStorage.setItem("accessToken", accessToken[accessToken.length - 1]);
                    localStorage.setItem("refreshToken", refreshToken[refreshToken.length - 1]);
                    navigate("/")
                    alert(`${res.data.name}님 환영합니다.`);
                })
                .catch((error) => {
                    console.log(error);
                });



            // TODO: 토큰을 저장하거나 사용해야 할 작업 수행
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;