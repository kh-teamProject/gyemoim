import React, { useState } from "react";

import styles from "../../../page/css/StageCreate.module.css";


const Category = (props) => {
const [isClicked, setIsClicked] = useState(false);
  const categoryHandler = (event) => {
    props.onClick(event.target.value);
      setIsClicked(!isClicked);
        console.log(`Category.js ${event.target.value}`);

  };

const buttonClassName = isClicked ? `${styles.buttonSmall4} ${styles.clicked}` : styles.buttonSmall4;


  return (
    <label>

      <input
        type="button"
        value={props.value}
        name={props.name}
        onClick={categoryHandler}
        className={styles.buttonSmall4}
      />
      {props.children}
    </label>
  );
};

export default Category;
