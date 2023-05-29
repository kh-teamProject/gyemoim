import classes from './css/MyRank.module.css';

const MyRank = ({pRank}) => {

  return (
    <div className={`${classes['myRank-wrap']}`}>
      <span>{pRank}</span>
      <p>김찬희님의 등급</p>
    </div>
  );
};

export default MyRank;