import MyPageSidebar from "../../component/MyPageSidebar";
import classes from "../css/MyStage.module.css";
import {NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";
import axios from "axios";
import Stage from "../../component/Stage";

const StageComplete = () => {
  const token = Cookies.get('Set-Cookie');
  const uNo = jwtDecode(token).uNo;
  const startFlag = '완료';

  const [stageList, setStageList] = useState([]);
  const [stageUserList, setStageUserList] = useState([]);

  useEffect(() => {
    axios.get(`/getMyPfList/${uNo}`, {
      params: {
        startFlag
      }
    })
      .then((res) => {
        setStageList(res.data.stageList)
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
        <Stage stageList={stageList} stageUserList={stageUserList} Progress={startFlag}/>
      </div>
    </section>
  );
};

export default StageComplete;