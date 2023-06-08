import {NavLink, useLocation, useNavigate} from "react-router-dom";
import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyPage.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

const MemberDelete = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
                console.log("ERROR: " + error);
            })
    });

    const checkedPwdHandler = (e) => {
        setPasswordIsValid(e.target.value == password);
    }

    const memberDeleteHandler = () => {
        if (enteredPassword.trim() === '') {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        const checkDelete = window.confirm("회원탈퇴를 진행하시겠습니까?");

        if (checkDelete) {
            axios.post(`/memberDelete/${3}`)
                .then((res) => {
                    alert('회원이 정상적으로 탈퇴되었습니다.');
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <section>
            <div>
                <MyPageSidebar/>
            </div>
            <div className={`${classes['memberDelete-wrap']}`}>
                <h2>회원 탈퇴</h2>
                <div className={classes.field}>
                    <ul>
                        <li>
                            <NavLink to={'/mypage/info'}>개인정보 수정</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/mypage/info/interest'}
                                className={`${location.pathname.includes('interest') ? classes.isActive : undefined}`}>
                                관심사 수정
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/mypage/info/pwdUpdate/${uNo}'}
                                     className={`${location.pathname.includes('pwdUpdate') ? classes.isActive : undefined}`}>비밀번호
                                변경</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/mypage/info/delete/3'}
                                className={`${location.pathname.includes('delete') ? classes.isActive : undefined}`}>회원
                                탈퇴
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2></h2>
                    <input
                        type="password"
                        name={"password"}
                        className={`${classes['password-input']} ${passwordIsValid ? '' : classes.isActive}`}
                        onChange={(e) => {
                            setEnteredPassword(e.target.value)
                        }}
                        onBlur={checkedPwdHandler}
                    />
                    <br/>
                    <button
                        type={"submit"}
                        className={`${classes['check-btn']}`}
                        onClick={memberDeleteHandler}
                        disabled={!passwordIsValid}
                    >
                        확인
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MemberDelete;