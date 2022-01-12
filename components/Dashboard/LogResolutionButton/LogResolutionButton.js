import React from "react";
import classes from "./LogResolutionButton.module.css";

const LogResolutionButton = (props) => {
  return (
    <div>
      <button className={classes.button} onClick={props.clicked}>
        I exercised!
      </button>
    </div>
  );
};

export default LogResolutionButton;
