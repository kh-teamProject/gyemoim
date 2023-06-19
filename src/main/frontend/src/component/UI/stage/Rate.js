import React, { useState, Component } from "react";

import styles from "../../../page/css/StageCreate.module.css";

const Rate = (props) => {

const [isClicked, setIsClicked] = useState(false);
  const rateHandler = (event) => {

props.onClick(event.target.value);
     setIsClicked(!isClicked);

    console.log(`Rate.js ${event.target.value}`);

  };

  return (
  <>
      <input
        type="radio"
        id={props.id}
        value={props.value}
        name={props.name}
        onClick={rateHandler}
        className={styles.button0}
      />
      {props.children}
</>
  );
};

export default Rate;
