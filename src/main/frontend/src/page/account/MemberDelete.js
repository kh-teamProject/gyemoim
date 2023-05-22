import {NavLink, useLocation} from "react-router-dom";
import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyPage.module.css";

const MemberDelete = () => {
  const location = useLocation();
  return (
    <section>
      <div >
        <MyPageSidebar />
      </div>
      <div>
        <h2>회원 탈퇴</h2>
        <div className={classes.field}>
          <ul>
            <li>
              <NavLink to={'/mypage/info'}>개인정보 수정</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/info/interest'} className={`${location.pathname.includes('interest') ? classes.isActive : undefined}`}>관심사 수정</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/info/delete'} className={`${location.pathname.includes('delete') ? classes.isActive : undefined}`}>회원 탈퇴</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MemberDelete;