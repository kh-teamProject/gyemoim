import React, { useState } from "react";

const Rate = (props) => {
  const rateHandler = (event) => {
    props.onClick(event.target.value);
    console.log(`Rate.js ${event.target.value}`);
  };
  return (
    <label>
      <input
        type="radio"
        value={props.value}
        name={props.name}
        onClick={rateHandler}
      />
      {props.children}
    </label>
  );
};

export default Rate;
