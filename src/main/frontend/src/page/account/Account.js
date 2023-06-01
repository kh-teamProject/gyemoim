import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import account from '../css/Account.module.css';

const Account = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // 이메일 인증
    // const [isEmailSent, setIsEmailSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 이용약관
    const [ageConfirmation, setAgeConfirmation] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [marketingAccepted, setMarketingAccepted] = useState(false);

    const navigate = useNavigate();

    // 이메일 인증 번호 발송
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (email === '') {
            setErrorMessage('이메일을 입력해주세요.');
            alert('이메일을 입력해주세요.');
            return;
        }

        try {
            // Send email confirmation request to the server
            await axios.post('/api/account/mailConfirm', { email });
            // setIsEmailSent(true);
            alert('해당 이메일로 인증 번호가 전송되었습니다.');
        } catch (error) {
            setErrorMessage('서버 오류로 인해 이메일 전송에 실패했습니다.');
            alert('서버 오류로 인해 이메일 전송에 실패했습니다.');
        }
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        if (verificationCode === '') {
            setErrorMessage('인증 번호를 입력해주세요.');
            return;
        }

        try {
            // Verify email confirmation code
            await axios.post('/api/account/verifyEmailCode', { email, ePw: verificationCode });
            setIsCodeVerified(true);
            alert('인증 되었습니다.');
        } catch (error) {
            setErrorMessage('서버 오류로 인해 인증 번호 확인에 실패했습니다.');
            alert('서버 오류로 인해 인증 번호 확인에 실패했습니다.');
        }
    };

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        if (!isCodeVerified) {
            alert('이메일 인증이 완료되어야 회원가입이 가능합니다.');
            return;
        }

        if (password === '' || confirmPassword === '') {
            setErrorMessage('비밀번호를 입력해주세요.');
            alert('비밀번호를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
            alert('비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!ageConfirmation) {
            alert('만 18세 이상인지 확인해주세요.');
            return;
        }

        if (!termsAccepted) {
            alert('이용약관에 동의해야 합니다.');
            return;
        }

        if (!privacyAccepted) {
            alert('개인정보 수집 및 이용에 동의해야 합니다.');
            return;
        }

        // 회원가입
        const user = { email, password, name, phone };
        try {
            const res = await axios.post('api/account', user);
            console.log(user);
            console.log(res);
            alert(user.name + '님 회원가입을 축하합니다');
            navigate('/login');
        } catch (err) {
            console.log(err);
            alert('회원가입에 실패하였습니다.');
        }
    };

    return (
        <section>
            <div className={account.main}>
                <h2>회원가입</h2>
                <form>
                    <div className={account.field}>
                        <input
                            type="email"
                            id="email"
                            placeholder="이메일을 입력해 주세요."
                            className={account.email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className={account.emailConfirm} type="submit" onClick={handleEmailSubmit}>
                            이메일 인증
                        </button>
                    </div>


                        <div className={account.field}>
                            <input
                                type="text"
                                value={verificationCode}
                                className={account.email}
                                placeholder="인증번호를 입력해 주세요."
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button className={account.emailConfirmCheck}
                                    type="submit"
                                    onClick={handleVerificationSubmit}>
                                인증 번호 확인
                            </button>
                        </div>


                    <div className={account.field}>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해 주세요."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={account.field}>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={account.field}>
                        <input
                            type="text"
                            id="name"
                            placeholder="이름을 입력해 주세요."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={account.field}>
                        <input
                            type="text"
                            id="phone"
                            placeholder="휴대폰 번호를 입력해 주세요."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className={account.checkboxGroup}>
                        <div className={account.checkbox}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ageConfirmation}
                                    onChange={(e) => setAgeConfirmation(e.target.checked)}
                                />
                                [필수] 만 18세 이상입니다.
                            </label>
                        </div>

                        <div className={account.checkbox}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                [필수] 이용 약관에 동의합니다.
                            </label>
                        </div>

                        <div className={account.checkbox}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={privacyAccepted}
                                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                />
                                [필수] 개인정보 수집 및 이용에 동의합니다.
                            </label>
                        </div>

                        <div className={account.checkbox}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={marketingAccepted}
                                    onChange={(e) => setMarketingAccepted(e.target.checked)}
                                />
                                [선택] 마케팅 정보 수신에 동의합니다.
                            </label>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className={account.btn} onClick={handleRegistrationSubmit}>
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Account;