import './css/Header.module.css';
import {NavLink} from "react-router-dom";

import logo from './assert/images/logo0306.png';

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <NavLink to={'stage'}>스테이지</NavLink>
          <NavLink to={'question'}>1:1 문의사항</NavLink>
          <NavLink to={'faq'}>이용안내</NavLink>
        </div>
        <NavLink to={'/'}><img src={logo} alt="logo" width={'200'} height={'100'}/></NavLink>
        <div>
          <NavLink to={'login'}>로그인</NavLink>
          <NavLink to={'mypage/info'}>내 정보</NavLink>
          <NavLink to={'notice'}>공지사항</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;