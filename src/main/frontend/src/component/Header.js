import {NavLink} from "react-router-dom";
//import Cookies from 'js-cookie';

import './css/Header.module.css';
import logo from './assert/images/logo0306.png';

/*=======
import './css/Header.module.css';
import {NavLink} from "react-router-dom";

import logo from './assert/images/logo0301.png';
>>>>>>> feature/hyunji*/

const Header = () => {
  // console.log('cookie');
  // console.log(Cookies.get('Set-Cookie'));
  return (
    <header>
      <nav>
        <div>
          <NavLink to={'stage'}>스테이지</NavLink>
{/*<<<<<<< HEAD*/}
          <NavLink to={'/board/question'}>1:1 문의사항</NavLink>
          <NavLink to={'faq'}>이용안내</NavLink>
        </div>
        <NavLink to={'/'}><img src={logo} alt="logo" width={'200'} height={'100'}/></NavLink>
        <div>
          <NavLink to={'login'}>로그인</NavLink>
          <NavLink to={'mypage'}>내 정보</NavLink>
{/*=======
          <NavLink to={'community'}>커뮤니티</NavLink>
          <NavLink to={'faq'}>이용안내</NavLink>
        </div>
        <img src={logo} alt="logo" width={'200'} height={'100'}/>
        <div>
          <NavLink to={'login'}>로그인</NavLink>
          <NavLink to={'register'}>회원가입</NavLink>
>>>>>>> feature/hyunji*/}
          <NavLink to={'/board/notice'}>공지사항</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;