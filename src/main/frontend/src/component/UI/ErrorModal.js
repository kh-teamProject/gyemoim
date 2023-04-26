import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <h1>{props.title}</h1>
      <button onClick={props.onConfirm}>Close</button>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}
    </>
  );
};

export default ErrorModal;