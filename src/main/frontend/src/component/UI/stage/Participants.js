import React, { useState } from "react";

import styles from "../../../page/css/StageCreate.module.css";

const Participants = (props) => {
     const depositHandler = (event) => {
     if (props.value === "500000" || props.value === "700000") {
          props.onClick(props.value, 100000);
          console.log(`Participants.js ${props.value},name=payment, value=100000`);
        } else if (props.value === "1000000"  || props.value === "1400000" ) {
          props.onClick(props.value, 200000);
          console.log(`Participants.js ${props.value},name=payment, value=200000`);
      } else if (props.value === "1500000" || props.value === "2100000"  ) {
          props.onClick(props.value, 300000);
          console.log(`Participants.js ${props.value},name=payment, value=300000`);
       } else if (props.value === "2000000" || props.value === "2800000" ) {
          props.onClick(props.value, 400000);
          console.log(`Participants.js ${props.value},name=payment, value=400000`);
       } else if (props.value === "2500000" || props.value === "3500000" ) {
          props.onClick(props.value, 500000);
          console.log(`Participants.js ${props.value},name=payment, value=500000`);

       } else {
          props.onClick(props.value);
        }
        console.log(`Participants.js ${props.value}`);
      };

    return (
    <>

      <input
        type="radio"
        value={props.value}
        name={props.name}
        onClick={depositHandler}
        className={styles.selectInput}
      />
       {props.children}
</>
    );
};

export default Participants;