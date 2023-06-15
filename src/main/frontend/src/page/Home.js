import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

import classes from './css/Home.module.css';
import HomeStageList from "../component/UI/home/HomeStageList";

const Home = () => {
    const [stageList, setStageList] = useState([]);
    const [stageUserList, setStageUserList] = useState([]);

    console.log(stageList);
useEffect(() => {
    axios.get('/getStageList', {
      params: {

      }
    })
      .then((res) => {
        setStageList(res.data.stageList);
        setStageUserList(res.data.stageUserList);

      })
      .catch((error) => {
        console.log(error);

      });
  }, []);
  return (
    <>
        {/* Visual start */}
        <div className={[classes.VisualArea, classes.section].join(' ')}>
            <div className={classes.mainBanner} > {/* main_banner start */}
                <p>목돈이 필요할 땐,</p>
                <h2>곗돈을 투명하게 관리하는<br / >계이득</h2>
                <Link to={'/stageList'}><button className={classes.createButton}>계모임 구경하기</button></Link>
            </div> {/* main_banner end */}

            <div className={classes.mainChartArea}> {/*main_chart start*/}
                시각화
            </div> {/* main_chart end */}
        </div>{/* Visual start */}

        {/* stageListArea start */}
        <div className={[classes.StageListArea, classes.section].join(' ')}>
            <h2>스테이지</h2>
            {/* stageList start */}
            <div>
                <HomeStageList stageList={stageList} stageUserList={stageUserList} />
            </div>

            {/* stageCreate start */}
            <div className={classes.stageCreateBanner}>
                <p className={classes.createTitle} >나만의 계모임 스테이지, 지금 바로 만들어보세요!</p>
                <p className={classes.createSub}>계모임 만들기, 계이득과 함께 하면 어렵지 않아요.</p>
                <Link to={'/stageCreate'}><button className={classes.createButton}>계모임 만들기</button></Link>
            </div>{/* stageCreate end */}
        </div> {/* stageListArea end */}

        {/* NoticeArea start */}
        <div className={[classes.NoticeArea, classes.section].join(' ')}>
            <h2>계이득의 소식</h2>
            <div>컴포넌트</div>
        </div> {/* NoticeArea end */}
    </>
  );
};

export default Home;