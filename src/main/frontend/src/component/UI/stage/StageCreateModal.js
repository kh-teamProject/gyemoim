import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import Agree from './Agree';
import classes from '../../css/StageCreateModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <Agree />
      <Link to={`/stageList`}>
      <button onClick={props.onConfirm} className={[classes.button001, classes.btnPush, classes.btnBlueGreen, classes.widthBig].join(' ')} >다음</button>
    </Link>
    </div>
  );
};

const StageCreateModal= (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}
    </>
  );
};



export default StageCreateModal;