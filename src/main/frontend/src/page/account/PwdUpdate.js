import React, {useRef, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import PwdUpdateModule from "../../page/css/PwdUpdate.module.css";

import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyPage.module.css";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";


const PwdUpdate = () => {
    // const [uNo, setUNo] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const lastPath = pathParts[pathParts.length - 1];
    console.log(lastPath);

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;

    const passwordUpdateHandler = (e) => {
        e.preventDefault();
        console.log(newPassword);
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
                console.log(res.data.uNo)

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

            <div>
                <div>
                    <div>
                        <h2>비밀번호 변경</h2>
                    </div>

                    <div className={PwdUpdateModule.nav}>
                        <ul className={PwdUpdateModule.ul}>
                            <li className={PwdUpdateModule.li}>
                                <NavLink
                                    to={'/mypage/info'}
                                    className={`${location.pathname.includes('info') ? PwdUpdateModule.isActive : undefined}`}
                                >
                                    개인정보 수정
                                </NavLink>
                            </li>
                            <li className={PwdUpdateModule.li}>
                                <NavLink
                                    to={'/mypage/info/interest'}
                                    className={`${location.pathname.includes('interest') ? PwdUpdateModule.isActive : undefined}`}
                                >
                                    관심사 수정
                                </NavLink>
                            </li>
                            <li className={PwdUpdateModule.li}>
                                <NavLink
                                    to={'/mypage/info/delete/3'}
                                    className={`${location.pathname.includes('delete') ? PwdUpdateModule.isActive : undefined}`}
                                >
                                    회원 탈퇴
                                </NavLink>
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