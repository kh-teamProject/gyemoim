import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

import Stage from "../../component/Stage";
import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyStage.module.css";

const RecommendedStage = () => {
  const token = Cookies.get('Set-Cookie');
  const uNo = jwtDecode(token).uNo;

  const [stageList, setStageList] = useState([]);
  const [stageUserList, setStageUserList] = useState([]);

  useEffect(() => {
    axios.get(`/getRecommendStage/${uNo}`)
      .then((res) => {
        console.log(res);
        setStageList(res.data.recommendStage);
        setStageUserList(res.data.stageUserList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section>
      <div>
        <MyPageSidebar />
      </div>
      <div className={classes.field}>
        <div>
          <ul className={classes.myStage}>
            <li>
              <NavLink to={'/mypage/stage/wait'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>나의 스테이지</NavLink>
            </li>
            <li>
              <NavLink to={'/mypage/stage/recommendedStage'}
                       className={({isActive}) => isActive ? classes.isActive : undefined} end>추천 스테이지</NavLink>
            </li>
          </ul>
        </div>
        <Stage stageList={stageList} stageUserList={stageUserList} recommend={true}/>
      </div>
    </section>
  );
}

export default RecommendedStage;