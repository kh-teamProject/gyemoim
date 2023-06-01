import React, {useState} from 'react';
import axios from 'axios';
import pwdSearch from "../css/MemberPwdSearch.module.css";
import gyemoim_character from "../../component/images/gyemoim_character.png";
import {useNavigate} from "react-router-dom";

const MemberPwdSearch = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'name') {
            setName(value);
        } else if (name === 'phone') {
            setPhone(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !name) {
            setError('이메일과 이름을 모두 입력해주세요.');
            return;
        }

        // Make API call to send forgot password request
        // Replace `API_ENDPOINT` with the actual API endpoint
        axios
            .post('/api/password/forgot', { email, name, phone })
            .then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                    setMessage('');
                    alert('입력하신 정보가 일치하지 않습니다.');
                } else {
                    setMessage(response.data.message);
                    setError('');
                    alert('임시 비밀번호가 입력하신 이메일로 전송되었습니다.');
                    navigate('/login')
                }
            })
            .catch((error) => {
                setError('서버 오류가 발생했습니다.');
                setMessage('');
                alert('서버 오류가 발생했습니다.');
            });
    };

    return (
        <div className={pwdSearch.main}>
            <form className={pwdSearch.form} onSubmit={handleSubmit}>
                <img src={gyemoim_character} style={{width: '150px', height: '150px'}} alt="Logo"/>
                <h2>비밀번호 찾기</h2>
                <p>계모임 가입으로 목돈 모으기 성공!</p>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
                <div className={pwdSearch.field}>
                    <input
                        type="email"
                        name="email"
                        placeholder='이메일을 입력해 주세요.'
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={pwdSearch.field}>
                    <input
                        type="text"
                        name="name"
                        placeholder='이름을 입력해 주세요.'
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={pwdSearch.field}>
                    <input
                        type="text"
                        name="phone"
                        placeholder='휴대폰 번호를 `-`없이 입력해 주세요.'
                        value={phone}
                        onChange={handleInputChange}
                    />
                </div>

                <button className={pwdSearch.btn} type="submit" >확인</button>
            </form>

            <div>
                <div className={pwdSearch.guide}>
                    <ul className={pwdSearch.ul}>
                        <li className={pwdSearch.li}>
                            <a className={pwdSearch.a} href="/MemberEmailSearch">이메일 찾기</a>
                        </li>
                        <li className={pwdSearch.li}>｜</li>
                        <li className={pwdSearch.li}>
                            <a className={pwdSearch.a} href="/Account">회원가입</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default MemberPwdSearch;