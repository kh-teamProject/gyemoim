import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 로그아웃 요청
            await axios.post('/api/v1/logout');

            // 토큰 제거
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // 로그아웃 완료 후 리다이렉트 또는 다른 동작 수행
            navigate("/login")

        } catch (error) {
            // 에러 처리
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;