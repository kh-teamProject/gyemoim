import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyStage.module.css";
import {NavLink} from "react-router-dom";

const RecommendedStage = () => {

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
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>나의 스테이지</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/stage/recommendedStage'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>추천 스테이지</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RecommendedStage;