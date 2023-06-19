import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";

import classes from './css/MyPageSidebar.module.css';
import SidebarLogo from './assert/images/hiyoko0305.png';

const MyPageSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    Cookies.remove("Set-Cookie");
    dispatch({type: "logout"});
    navigate("/");
  }

  return (
    <>
      <div className={`${classes['sidebar-wrap']}`}>
        <div className={`${classes['myinfo-wrap']}`}>
          <img src={SidebarLogo} alt="Sidebar Logo" />
          <br/>
          <span>민재홍님</span>
          <h2>마이페이지</h2>
        </div>
        <div className={`${classes['myinfo-sidebar-wrap']}`}>
          <ul>
            <li><NavLink to={'/mypage/info'} className={`${location.pathname.includes('info') ? classes.isActive : undefined}`}>개인정보 관리</NavLink></li>
            <li><NavLink to={'/mypage/bankAccount/deposit'} className={`${location.pathname.includes('bank') ? classes.isActive : undefined}`}>나의 계좌관리</NavLink></li>
            <li><NavLink to={'/mypage/stage/wait'} className={`${location.pathname.includes('stage') ? classes.isActive : undefined}`}>나의 스테이지</NavLink></li>
            <li><p className={classes.logout} onClick={logoutHandler}>로그아웃</p></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyPageSidebar;