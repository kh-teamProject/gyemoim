import './css/Header.module.css';
import {NavLink} from "react-router-dom";

import logo from './assert/images/logo0301.png';

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <NavLink to={'stage'}>스테이지</NavLink>
          <NavLink to={'community'}>커뮤니티</NavLink>
          <NavLink to={'faq'}>이용안내</NavLink>
        </div>
        <img src={logo} alt="logo" width={'200'} height={'100'}/>
        <div>
          <NavLink to={'login'}>로그인</NavLink>
          <NavLink to={'register'}>회원가입</NavLink>
          <NavLink to={'notice'}>공지사항</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;