import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import account from "../css/Account.module.css"

const Account = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
    const [name, setName] = useState("");
    const [ageConfirmation, setAgeConfirmation] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [marketingAccepted, setMarketingAccepted] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!ageConfirmation) {
            alert("만 18세 이상인지 확인해주세요.");
            return;
        }

        if (!termsAccepted) {
            alert("이용약관에 동의해야 합니다.");
            return;
        }

        if (!privacyAccepted) {
            alert("개인정보 수집 및 이용에 동의해야 합니다.");
            return;
        }


        const user = {email, password, name};
        try {
            const res = await axios.post("api/v1/account", user);
            console.log(user);
            console.log(res);
            alert(user.name + "님 회원가입을 축하합니다")
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("회원가입에 실패하였습니다.")

        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className={account.field}>
                    <label htmlFor="email">이메일</label>
                    <input type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                    />
                </div>
                <div className={account.field}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        // placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={account.field}>
                    <label htmlFor="Confirm Password">비밀번호 확인</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={account.field}>
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={ageConfirmation}
                            onChange={(e) => setAgeConfirmation(e.target.checked)}
                        />
                        [필수] 만 18세 이상입니다.
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        [필수] 이용 약관에 동의합니다.
                    </label>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={privacyAccepted}
                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        />
                        [필수] 개인정보 수집 및 이용에 동의합니다.
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={marketingAccepted}
                            onChange={(e) => setMarketingAccepted(e.target.checked)}
                        />
                        [선택] 마케팅 정보 수신에 동의합니다.
                    </label>
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Account;