import classes from './css/AdminSidebar.module.css';
import logo from './assert/images/logo0306.png'

const AdminSidebar = () => {
  return (
    <>
      <div className={`${classes['adminSidebar-wrap']}`}>
        <img src={logo} alt="logo" width={200}/>
        <ul>
          <li>홈</li>
          <li>회원관리</li>
          <li>스테이지 관리</li>
          <li>게시판 관리</li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;