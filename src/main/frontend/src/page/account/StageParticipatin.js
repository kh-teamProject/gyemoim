import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyStage.module.css";
import {NavLink} from "react-router-dom";

const StageParticipatin = () => {
  return (
    <section>
      <div>
        <MyPageSidebar />
      </div>
      <div className={classes.field}>
        <div>
          <ul className={classes.myStage}>
            <li>
              <NavLink to={'/mypage/stage'}
                       className={({isActive}) => isActive ? classes.isActive : undefined}>나의 스테이지</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/stage/recommendedStage'}
                       className={({isActive}) => isActive ? classes.isActive : undefined}>추천 스테이지</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className={classes.myStageField}>
            <li>
              <NavLink to={'/mypage/stage/wait'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>대기중</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/stage/participagin'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>참여중</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/stage/complete'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>완료</NavLink>
            </li>
          </ul>
        </div>
        <h3>현재 참여중인 스테이지</h3>
      </div>
    </section>
  );
};

export default StageParticipatin;