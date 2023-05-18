import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/v1/login', {
                email,
                password
            });

            const {accessToken, refreshToken} = response.data;

            localStorage.setItem("accessToken", response.data);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/stage")
            alert(response.data)

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