import React, { useState } from "react";

import styles from "../../../page/css/StageCreate.module.css";


const Category = (props) => {
const [isClicked, setIsClicked] = useState(false);
  const categoryHandler = (event) => {
    props.onClick(event.target.value);
      setIsClicked(!isClicked);
        console.log(`Category.js ${event.target.value}`);

  };


  return (
  <>
      <input
        type="radio"
        id={props.id}
        value={props.value}
        name={props.name}
        onClick={categoryHandler}
        className={styles.button4}
      />
      {props.children}
  </>
  );
};

export default Category;
