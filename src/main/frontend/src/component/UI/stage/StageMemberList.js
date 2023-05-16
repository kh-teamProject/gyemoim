import classes from '../../../page/css/Stage.module.css';

function StageMemberList(props){
   console.log(props.mem);

      return (
      <ul className={classes.memberOrder}>
        {Array.from({ length: props.pfEntry }, (_, index) => {
          const receiveTurnIndex = props.mem.findIndex((item) => item.receiveTurn === index + 1);
          const name =
            receiveTurnIndex !== -1 ? props.mem[receiveTurnIndex].name : '대기중';
          const nameClass = receiveTurnIndex !== -1 ? classes.black : '';
          const numClass = receiveTurnIndex !== -1 ? classes.blueNum : '';

          return (
            <li key={index} className={classes.memList}>
              <span className={[classes.memNum, numClass].join(' ')}>{index + 1}</span>
              <span className={[classes.memInfo, nameClass].join(' ')}>{name}</span>
            </li>
          );
        })}
      </ul>
      );
}

export default StageMemberList;