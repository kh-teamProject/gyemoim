import classes from '../../../page/css/Stage.module.css';

function StageSequence(props){
	const lis = []

	for(let i=0; i<props.schedule.length; i++){
           		let s = props.schedule[i];
                let uTotalReceipts = s.utotalReceipts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
           		let uPayment =  s.upayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

           		lis.push(<li key={s.receiveTurn} className={classes.seqList}>
           		{
           		    props.roll[0].receiveTurn === s.receiveTurn
           		    ? <div>
                        <span className={classes.myTurn}>내 차례!</span>
                        <span className={[classes.backRed, classes.seqNum].join(' ')}>{s.receiveTurn}</span>
           		    </div>
           		    : <span className={classes.seqNum}>{s.receiveTurn}</span>
           		}
                <span className={classes.seqBal}>실 지급액 : {uTotalReceipts}원</span>
           		            <br />
           		            <span className={classes.seqPay}>{uPayment}원</span>
                        </li>)
           	}
	return 	<ul className={classes.seqArea}>
                {lis}
          </ul>
}

export default StageSequence;