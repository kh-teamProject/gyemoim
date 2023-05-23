import classes from './css/AdminSidebar.module.css';
import logo from './assert/images/logo0306.png'
import {NavLink} from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className={`${classes['adminSidebar-wrap']}`}>
        <img src={logo} alt="logo" width={200}/>
        <ul>
          <li><NavLink to={'/admin'}>홈</NavLink></li>
          <li><NavLink to={'/admin/account'}>회원 관리</NavLink></li>
          <li><NavLink to={'/admin/stage'}>스테이지 관리</NavLink></li>
          <li><NavLink to={'/admin/board'}>게시판 관리</NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;