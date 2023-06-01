import React, {useState} from 'react';
import axios from 'axios';
import emailSearch from "../css/MemberEmailSearch.module.css";
import gyemoim_character from "../../component/images/gyemoim_character.png";
import {useNavigate} from "react-router-dom";

const MemberEmailSearch = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // 백엔드로 API 요청 보내기
        axios
            .get('/api/account/member-email-search', {
                params: {
                    name: name,
                    phone: phone,
                },
            })
            .then((response) => {
                setEmail(response.data);
                setModalOpen(true);
            })
            .catch((error) => {
                console.error('에러:', error);
                alert('일치하는 회원이 없습니다.');
            });
    };

    const closeModal = () => {
        setModalOpen(false);
        navigate('/login')
    };

    return (
        <div className={emailSearch.main}>
            <form className={emailSearch.form}>
                <img src={gyemoim_character} style={{width: '150px', height: '150px'}} alt="Logo"/>
                <h2>이메일 찾기</h2>
                <p>계모임 가입으로 목돈 모으기 성공!</p>

                <div className={emailSearch.field}>
                    <input
                        type="text"
                        id="name"
                        placeholder='이름을 입력해 주세요.'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className={emailSearch.field}>
                    <input
                        type="text"
                        id="phone"
                        placeholder='휴대폰 번호를 `-` 없이 입력해 주세요.'
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>

                <button className={emailSearch.btn} onClick={handleSearch}>확인</button>

                <div className={emailSearch.guide}>
                    <ul className={emailSearch.ul}>
                        <li className={emailSearch.li}>
                            <a className={emailSearch.a} href="/MemberPwdSearch">비밀번호 찾기</a>
                        </li>
                        <li className={emailSearch.li}>｜</li>
                        <li className={emailSearch.li}>
                            <a className={emailSearch.a} href="/Account">회원가입</a>
                        </li>
                    </ul>
                </div>
            </form>
            <div>
                {modalOpen && (
                    <div className={emailSearch.modal}>
                        <div className={emailSearch.modalContent}>
                            <p>{email}</p>
                            <span className={emailSearch.close} onClick={closeModal}>확인</span>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberEmailSearch;