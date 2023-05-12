import classes from '../../../page/css/Stage.module.css';

function StageMemberList(props){
	return 	<ul className={classes.memberOrder}>
                {props.mem.map((value, index) => (
                    <li key={index} className={classes.memList}>
                        {value.uno === null ? <span className={classes.memNum}>{value.receiveTurn}</span> :  <span className={[classes.memNum, classes.blueNum].join(' ')}>{value.receiveTurn}</span>}
                        {value.uno === null ? <span className={[classes.memInfo, classes.gray].join(' ')}>대기중</span> : <span className={classes.memInfo}>{value.name}</span>}
                        {value.pfMaster === 'M' ? <span>(계모임 장)</span> : null}

                    </li>
                ))}
          </ul>
}

export default StageMemberList;