import egg from "./images/egg002.png";
import classes from './css/Stage.module.css';

const Stage = () => {
  return (
    <div className={classes.stage}>
      <h4>따끈한 자본 만들기!!</h4>
      <ul>
        <li><img src={egg} alt="참여중인 순번" className={classes.stageImg} /></li>
        <li className={classes.stageEmpty}>2</li>
        <li className={classes.stageEmpty}>3</li>
        <li><img src={egg} alt="참여중인 순번" className={classes.stageImg} /></li>
        <li className={classes.stageEmpty}>5</li>
        <li><img src={egg} alt="참여중인 순번" className={classes.stageImg} /></li>
        <li><img src={egg} alt="참여중인 순번" className={classes.stageImg} /></li>
      </ul>
      <p>이율(세후)9.81% <span>|</span> 약정금 520만원</p>
    </div>
  );
};

export default Stage;