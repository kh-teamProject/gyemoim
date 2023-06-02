import MyPageSidebar from "./MyPageSidebar";
import classes from "../page/css/MyPageModify.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

const MemberInfo = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const lastPath = pathParts[pathParts.length - 1];

  const [myInfo, setMyInfo] = useState({});
  const [expenditure, setExpenditure] = useState({});
  const [enrollDate, setEnrollDate] = useState('');

  useEffect(() => {
    axios.get('/mypage', {
      params: {
        uNo: lastPath
      }
    })
      .then((res) => {
        const date = new Date(res.data.enrollDate);
        const [year, month, day] = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')];
        setMyInfo(res.data);
        setEnrollDate(`${year}-${month}-${day}`);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/getExpenditure', {
      params: {
        uNo: lastPath
      }
    })
      .then((res) => {
        setExpenditure(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const myInfoChangeHandler = (e) => {
    e.preventDefault();
    console.log(expenditure);
    if(
      myInfo.bankName === '' ||
      myInfo.bankAccountNumber === '' ||
      myInfo.accountHolder === '' ||
      myInfo.monthlySalary === '' ||
      myInfo.monthlyLimit === '' ||
      expenditure.medicalCost === '' ||
      expenditure.housingCost === '' ||
      expenditure.foodCost === '' ||
      expenditure.culturalCost === '' ||
      expenditure.etc === ''
    ) {
      alert('빈칸이 존재합니다. 모두 입력해주세요.');
      return;
    }

    axios.post('/myInfoModify', {
      ...myInfo,
      ...expenditure,
    })
      .then((res) => {
        alert('회원정보 수정이 완료되었습니다.');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <h2>회원정보 수정</h2>
      <form onSubmit={myInfoChangeHandler}>
        <div className={classes.field}>
          <label htmlFor="user-id">아이디</label>
          <input type="text" id="user-id" value={myInfo.email || ''} readOnly/>
        </div>
        <div className={classes.field}>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={myInfo.name || ''} onChange={(e) => {setMyInfo({...myInfo, name: e.target.value})}} />
        </div>
        <div className={classes.field}>
          <label htmlFor="phone">휴대폰</label>
          <input type="text" id="phone" value={myInfo.phone || ''} onChange={(e) => {setMyInfo({...myInfo, phone: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="bank-name">은행</label>
          <input type="text" id="bank-name" value={myInfo.bankName || ''} onChange={(e) => {setMyInfo({...myInfo, bankName: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">계좌번호</label>
          <input type="text" id="account-number" value={myInfo.bankAccountNumber || ''} onChange={(e) => {setMyInfo({...myInfo, bankAccountNumber: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">계좌명의</label>
          <input type="text" id="account-number" value={myInfo.accountHolder || ''} onChange={(e) => {setMyInfo({...myInfo, accountHolder: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">월급여</label>
          <input type="text" id="account-number" value={myInfo.monthlySalary || ''} onChange={(e) => {setMyInfo({...myInfo, monthlySalary: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">의료비</label>
          <input type="text" id="account-number" value={expenditure.medicalCost || ''} onChange={(e) => {setExpenditure({...expenditure, medicalCost: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">주거비</label>
          <input type="text" id="account-number" value={expenditure.housingCost || ''} onChange={(e) => {setExpenditure({...expenditure, housingCost: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">식비</label>
          <input type="text" id="account-number" value={expenditure.foodCost || ''} onChange={(e) => {setExpenditure({...expenditure, foodCost: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">문화비</label>
          <input type="text" id="account-number" value={expenditure.culturalCost || ''} onChange={(e) => {setExpenditure({...expenditure, culturalCost: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="account-number">기타</label>
          <input type="text" id="account-number" value={expenditure.etc || ''} onChange={(e) => {setExpenditure({...expenditure, etc: e.target.value})}}  />
        </div>
        <div className={classes.field}>
          <label htmlFor="enroll-date">가입일</label>
          <input type="text" id="enroll-date" value={enrollDate || ''} readOnly />
        </div>
        <div className={classes.field}>
          <label htmlFor="">회원구분</label>
          <input type="text" id="" value={myInfo.userRole || ''} readOnly />
        </div>
        <div className={classes.field}>
          <button type={"submit"} className={`${classes['submit-btn']}`}>수정완료</button>
        </div>
      </form>
    </div>
  );
};

export default MemberInfo;