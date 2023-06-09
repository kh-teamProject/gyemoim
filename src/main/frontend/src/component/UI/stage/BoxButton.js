import classes from '../../../page/css/Stage.module.css';

const BoxButton = (props) => {
  return (
        <div className={classes.boxBtn}  onClick={props.handler}>
        <p>{props.desc}</p>
        <p className={classes.boxTitle}>{props.title}</p>
        </div>
  );
};


export default BoxButton;