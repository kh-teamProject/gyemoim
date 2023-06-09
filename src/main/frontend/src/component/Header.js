import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect} from "react";
import logo from "./assert/images/logo0306.png";
import "./css/Header.module.css";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkedLogin = useSelector((state) => state.checkedLogin);

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout").then((res) => {
                Cookies.remove("Set-Cookie");
                dispatch({type: "logout"});
                navigate("/");
            });
        } catch (error) {
            console.log("로그아웃 에러: " + error);
        }
    };

    useEffect(() => {
        // Check login status on page load
        if (checkedLogin) {
            // Perform a request to validate the login status, if needed
        }
    }, [checkedLogin]);

    return (
        <header>
            <nav>
                <div>
                    <NavLink to={'stage'}>스테이지</NavLink>
                    <NavLink to={'/board/question'}>1:1 문의사항</NavLink>
                    <NavLink to={'faq'}>이용안내</NavLink>
                </div>
                <NavLink to={"/"}>
                    <img src={logo} alt="logo" width={"200"} height={"100"}/>
                </NavLink>
                <div>
                    {checkedLogin ? (
                        <>
                            <NavLink onClick={handleLogout}>로그아웃</NavLink>
                            <NavLink to={"mypage/info"}>내 정보</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to={"login"}>로그인</NavLink>
                            <NavLink to={"account"}>회원가입</NavLink>
                        </>
                    )}
                    <NavLink to={'/board/notice'}>공지사항</NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;