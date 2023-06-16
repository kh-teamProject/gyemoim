import React, { useState } from "react";

import styles from "../../../page/css/StageCreate.module.css";


const Rate = (props) => {
const [isClicked, setIsClicked] = useState(false);
  const rateHandler = (event) => {
    props.onClick(event.target.value);
      setIsClicked(!isClicked);
    console.log(`Rate.js ${event.target.value}`);

  };

const buttonClassName = isClicked ? `${styles.buttonSmall4} ${styles.clicked}` : styles.buttonSmall4;


  return (
    <label>

      <input
        type="button"
        value={props.value}
        name={props.name}
        onClick={rateHandler}
        className={styles.buttonSmall4}
      />
      {props.children}
    </label>
  );
};

export default Rate;
