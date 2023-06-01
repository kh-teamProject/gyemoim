import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {doLogin} from "../../store/loginStore";


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
                    // console.log(res);
                    Cookies.set('Set-Cookie', res.data.data);
                    // console.log('Set-Cookie', res.data.data);
                    // console.log('Set-Cookie', res.data.data.uNo)
                    // console.log(jwtDecode(res.data.data));

                    const  decodedToken = jwtDecode(res.data.data);
                    const name = decodedToken.name;
                    const uNo = decodedToken.uNo;

                    dispatch({type: 'login'});
                    console.log(checkedLogin);
                    console.log('이름', name)
                    console.log('이름', uNo)

//                    alert(`${name}님 환영합니다.);
                    alert(`${name} 어서와ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ`);
                    navigate("/")
                    // window.location.reload("/");

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