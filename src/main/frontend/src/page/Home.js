import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

import classes from './css/Home.module.css';
import HomeStageList from "../component/UI/home/HomeStageList";
import HomeChart from "../component/UI/home/HomeChart";
import HomeNotice from "../component/UI/home/HomeNotice";

const Home = () => {
    const [stageList, setStageList] = useState([]);
    const [stageUserList, setStageUserList] = useState([]);

    const [allPf, setAllPf] = useState();
    const [allRoll, setAllRoll] = useState();
    const [waitingPf, setWaitingPf] = useState();
    const [partPf, setPartPf] = useState();
    const [completePf, setCompletePf] = useState();

    const [noticeList, setNoticeList] = useState([]);


useEffect(() => {
    axios.get('/getStageList', {
      params: {

      }
    })
      .then((res) => {
        setStageList(res.data.stageList);
        setStageUserList(res.data.stageUserList);

        setAllPf(res.data.allPf);
        setAllRoll(res.data.allRoll);
        setWaitingPf(res.data.waitingPf);
        setPartPf(res.data.partPf);
        setCompletePf(res.data.completePf);

        setNoticeList(res.data.noticeList);

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

                <h2>곗돈을 투명하게 관리하는<br />계이득</h2>

                <Link to={'/stageList'}><button className={classes.createButton}>계모임 구경하기</button></Link>
            </div> {/* main_banner end */}

            {/*main_chart start*/}
            <div className={classes.mainChartArea}>
                <div className={classes.allText}>
                    <div className={classes.stageCount}>
                        <div><p>대기중 스테이지 수 : </p><span>{waitingPf}</span>개</div>
                        <div><p>참여중 스테이지 수 : </p><span>{partPf}</span>개</div>
                        <div><p>완료 스테이지 수 : </p><span>{completePf}</span>개</div>
                    </div>
                    <div className={classes.allCount}>
                        <div><p>총 스테이지 참여자 수 : </p><span>{allPf}</span>명</div>
                        <div><p>총 스테이지 수 : </p><span>{allRoll}</span>개</div>
                    </div>
                </div>
                <HomeChart allPf={allPf} waitingPf={waitingPf} partPf={partPf} completePf={completePf}/>
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
            <HomeNotice noticeList={noticeList} />
        </div> {/* NoticeArea end */}
    </>
  );
};

export default Home;