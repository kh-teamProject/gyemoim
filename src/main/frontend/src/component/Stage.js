import {Link} from "react-router-dom";

import classes from '../page/css/Home.module.css';

const Stage = (props) => {
  const stageItems = props.stageList.map((stage, index) => {
    const formattedDeposit = (stage.deposit / 10000).toFixed(0) + '만';
    const filteredStageUserList = props.stageUserList.filter(item => item.pfID === stage.pfID);

    return (
      <Link to={`/stage/${stage.pfID}`} key={index}>
        <div className={classes.stageBox}>
          <div className={classes.stageTitle}>{stage.pfName}</div>
          {/* <div className={classes.stageInterest}><FaMoneyBillAlt /><span>목돈</span></div> */}
          <div className={classes.stageImage}>
            <img src={require('./assert/images/gyemoim_speech.png')} alt="stageImage"/>
            <span>{stage.interest}</span>
          </div>
          <ul>
            {Array.from({length: stage.pfEntry}, (_, index) => {
              const receiveTurnIndex = filteredStageUserList.findIndex((item) => item.receiveTurn === index + 1);
              const uNo =
                receiveTurnIndex !== -1 && filteredStageUserList[receiveTurnIndex] ? filteredStageUserList[receiveTurnIndex].uno : null;

              return (
                <li key={index} className={classes.memList}>
                  {
                    uNo === null
                      ? <span>{index + 1}</span>
                      : <span><img src={require('./images/egg002.png')} alt="stageImage"
                                   className={classes.egg}/></span>
                  }
                </li>
              );
            })}
          </ul>
          <div className={classes.stageInfo}>
            <div>이율(세후) <b>{stage.pfRate}%</b></div>
            <div>약정금 <b>{formattedDeposit}원</b></div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className={classes.homeStageList}>
      {
        stageItems.length === 0 ?
          <p>{props.Progress}인 스테이지가 없습니다.</p>
          :
          stageItems
      }
    </div>
  );
};

export default Stage;