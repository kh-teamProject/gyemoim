import React, { useState } from "react";

const Participants = (props) => {
     const depositHandler = (event) => {
        props.onClick(event.target.value);
        console.log(`Participants.js ${event.target.value}`);
      };
    return (
    <label>
      <input
        type="radio"
        value={props.value}
        name={props.name}
        onClick={depositHandler}
      />
      {props.children}
    </label>
    );
};

export default Participants;