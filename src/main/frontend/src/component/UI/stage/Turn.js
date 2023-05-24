import React, { useState } from "react";

const Turn = (props) => {
  const turnHandler = (event) => {
    props.onClick(event.target.value);
    console.log(`Turn.js ${event.target.value}`);
  };
  return (
    <label>
      <input
        type="radio"
        value={props.value}
        name={props.name}
        onClick={turnHandler}
      />
      {props.children}
    </label>
  );
};

export default Turn;
