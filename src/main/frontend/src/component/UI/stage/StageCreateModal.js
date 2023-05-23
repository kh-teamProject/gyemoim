import React from 'react';
import ReactDOM from 'react-dom';


import Agree from './Agree';
import classes from '../../css/StageCreateModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <Agree />
      <button onClick={props.onConfirm}>다음</button>

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