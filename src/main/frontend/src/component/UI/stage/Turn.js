import React, { useState } from "react";

import styles from "../../../page/css/StageCreate.module.css";

const Turn = (props) => {
const [isClicked, setIsClicked] = useState(false);

  const turnHandler = (event) => {
    props.onClick(event.target.value);
      setIsClicked(!isClicked);
    console.log(`Turn.js ${event.target.value}`);
  };



  return (
    <>
      <input
        type="radio"
         id={props.id}
        value={props.value}
        name={props.name}
        onClick={turnHandler}
        className={styles.button4}
      />
      {props.children}
 </>
  );
};

export default Turn;
